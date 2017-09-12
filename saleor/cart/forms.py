from __future__ import unicode_literals
import json

from django import forms
from django.core.exceptions import ObjectDoesNotExist, NON_FIELD_ERRORS
from django.conf import settings
from django.utils.translation import npgettext_lazy, pgettext_lazy
from django_countries.fields import LazyTypedChoiceField, countries
from satchless.item import InsufficientStock
from ..shipping.utils import get_shipment_options


class QuantityField(forms.IntegerField):

    def __init__(self, **kwargs):
        super(QuantityField, self).__init__(
            min_value=0, max_value=settings.MAX_CART_LINE_QUANTITY,
            initial=1, **kwargs)


class AddToCartForm(forms.Form):
    """Add-to-cart form

    Allows selection of a product variant, quantity and additional data.
    The save method adds it to the cart.
    """
    quantity = QuantityField(label=pgettext_lazy('Add to cart form field label', 'Quantity'))
    data = forms.CharField(label=pgettext_lazy('Add to cart form field label',
                                                         'Data'))
    error_messages = {
        'not-available': pgettext_lazy(
            'Add to cart form error',
            'Sorry. This product is currently not available.'
        ),
        'empty-stock': pgettext_lazy(
            'Add to cart form error',
            'Sorry. This product is currently out of stock.'
        ),
        'variant-does-not-exists': pgettext_lazy(
            'Add to cart form error',
            'Oops. We could not find that product.'
        ),
        'insufficient-stock': npgettext_lazy(
            'Add to cart form error',
            'Only %d remaining in stock.',
            'Only %d remaining in stock.'
        ),
        'invalid-data': pgettext_lazy(
            'Add to cart form error',
            'Oops. The additional data provied is invalid.'
        ),
    }

    def __init__(self, *args, **kwargs):
        self.cart = kwargs.pop('cart')
        self.product = kwargs.pop('product')
        self.discounts = kwargs.pop('discounts', ())
        super(AddToCartForm, self).__init__(*args, **kwargs)

    def clean(self):
        cleaned_data = super(AddToCartForm, self).clean()
        quantity = cleaned_data.get('quantity')
        if quantity is None:
            return cleaned_data
        try:
            data_json = cleaned_data.get('data', '{}')
            data = json.loads(data_json)
        except:
            msg = self.error_messages['invalid-data']
            self.add_error('data', msg)
        try:
            product_variant = self.get_variant(cleaned_data)
        except ObjectDoesNotExist:
            msg = self.error_messages['variant-does-not-exists']
            self.add_error(NON_FIELD_ERRORS, msg)
        else:
            cart_lines = self.cart.get_variant_lines(product_variant)
            used_quantity = sum(line.quantity for line in cart_lines)
            new_quantity = quantity + used_quantity
            try:
                product_variant.check_quantity(new_quantity)
            except InsufficientStock as e:
                remaining = e.item.get_stock_quantity() - used_quantity
                if remaining:
                    msg = self.error_messages['insufficient-stock']
                    self.add_error('quantity', msg % remaining)
                else:
                    msg = self.error_messages['empty-stock']
                    self.add_error('quantity', msg)
        return cleaned_data

    def save(self):
        """Adds the selected product variant and quantity to the cart"""
        product_variant = self.get_variant(self.cleaned_data)
        data = self.get_data(self.cleaned_data)
        return self.cart.add(variant=product_variant,
                             quantity=self.cleaned_data['quantity'],
                             data=data)

    def get_variant(self, cleaned_data):
        raise NotImplementedError()

    def get_data(self, cleaned_data):
        raise NotImplementedError()


class ReplaceCartLineForm(AddToCartForm):
    """Replace quantity form

    Similar to AddToCartForm but its save method replaces the quantity.
    """
    def __init__(self, *args, **kwargs):
        self.variant = kwargs.pop('variant')
        kwargs['product'] = self.variant.product
        super(ReplaceCartLineForm, self).__init__(*args, **kwargs)
        data = json.loads(self.get_initial_for_field(self.fields['data'],
                                                     'data'))
        self.cart_line = self.cart.get_line(self.variant, data)
        self.fields['quantity'].widget.attrs = {
            'min': 1, 'max': settings.MAX_CART_LINE_QUANTITY}

    def clean_quantity(self):
        quantity = self.cleaned_data['quantity']
        variant_lines = self.cart.get_variant_lines(self.variant)
        quantity_total = sum([line.get_quantity() for line in variant_lines])
        try:
            self.variant.check_quantity(quantity_total)
        except InsufficientStock as e:
            msg = self.error_messages['insufficient-stock']
            raise forms.ValidationError(msg % e.item.get_stock_quantity())
        return quantity

    def clean(self):
        # explicitly skip parent's implementation
        # pylint: disable=E1003
        return super(AddToCartForm, self).clean()

    def get_variant(self, cleaned_data):
        return self.variant

    def get_data(self, cleaned_data):
        return json.loads(cleaned_data.get('data', '{}'))

    def save(self):
        """Replaces the selected product's quantity in cart"""
        product_variant = self.get_variant(self.cleaned_data)
        data = self.get_data(self.cleaned_data)
        return self.cart.add(product_variant, self.cleaned_data['quantity'],
                             data=data, replace=True)


class CountryForm(forms.Form):

    country = LazyTypedChoiceField(
        label=pgettext_lazy('Country form field label', 'Country'),
        choices=countries)

    def get_shipment_options(self):
        code = self.cleaned_data['country']
        return get_shipment_options(code)
