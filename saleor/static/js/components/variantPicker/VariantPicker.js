import _ from 'lodash';
import $ from 'jquery';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import React, { Component, PropTypes } from 'react';

import AttributeSelectionWidget from './AttributeSelectionWidget';
import QuantityInput from './QuantityInput';
import * as queryString from 'query-string';

@observer
export default class VariantPicker extends Component {

  static propTypes = {
    onAddToCartError: PropTypes.func.isRequired,
    onAddToCartSuccess: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    customAttributes: PropTypes.array.isRequired,
    variantAttributes: PropTypes.array.isRequired,
    variants: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    const { variants } = this.props;
    const { customAttributes } = this.props;
    const defaultVariant = variants.filter(v => !!Object.keys(v.attributes).length)[0];
    const params = queryString.parse(location.search);
    // Set default custom attributes
    let customizations = {};
    customAttributes.forEach(attribute => {
      customizations[attribute.pk] = attribute.default.toString();
    });
    // Parse attributes from url params
    let selection = {};
    if (Object.keys(params).length) {
      Object.keys(params).map(name => {
        const valueName = params[name];
        const variantAttribute = this.matchVariantAttributeBySlug(name);
        const customAttribute = this.matchCustomAttributeBySlug(name);
        if (customAttribute) {
          const value = this.matchAttributeValueByName(customAttribute, valueName);
          if (value) {
            customizations[customAttribute.pk] = value.pk.toString();
          }
        } else if (variantAttribute) {
          const value = this.matchAttributeValueByName(variantAttribute, valueName);
          if (value) {
            selection[variantAttribute.pk] = value.pk.toString();
          }
        }
      });
    }
    // Use default variant attributes if no variant attributes found in url params
    if (!Object.keys(selection).length) {
      selection = defaultVariant.attributes;
    }
    this.state = {
      errors: {},
      quantity: 1,
      selection: selection,
      customizations: customizations
    };
    this.matchVariantFromSelection();
    this.updateParams();
    this.updateDynamicRender();
  }

  handleAddToCart = () => {
    const { onAddToCartSuccess, onAddToCartError, store } = this.props;
    const { quantity, customizations } = this.state;
    if (quantity > 0 && !store.isEmpty) {
      $.ajax({
        url: this.props.url,
        method: 'post',
        data: {
          quantity: quantity,
          variant: store.variant.id,
          data: JSON.stringify({
            customizations: customizations
          })
        },
        success: () => {
          onAddToCartSuccess();
        },
        error: (response) => {
          onAddToCartError(response);
        }
      });
    }
  }

  handleAttributeChange = (attrId, valueId) => {
    this.setState({
      selection: Object.assign({}, this.state.selection, { [attrId]: valueId })
    }, () => {
      this.matchVariantFromSelection();
      this.updateParams();
      this.updateDynamicRender();
    });
  }

  handleCustomAttributeChange = (attrId, valueId) => {
    this.setState({
      customizations: Object.assign({}, this.state.customizations, { [attrId]: valueId })
    }, () => {
      this.updateParams();
      this.updateDynamicRender();
    });
  }

  updateDynamicRender() {
    // Update the dynamically-rendered product image if it exists.
    // TODO: We do this with jQuery because the product image carousel isn't
    // part of a React component. 
    if (!$('#dynamic-render').length) {
      return;
    }
    let hieronymusBaseUrl = "https://hieronymus.enstaved.com/render_staff?";
    const allAttributes = {};
    Object.keys(this.state.selection).forEach(attrId => {
      const attribute = this.matchAttribute(attrId);
      const value = this.matchAttributeValue(attribute, this.state.selection[attrId]);
      if (attribute && value) {
        allAttributes[attribute.slug] = value.slug;
      }
    });
    Object.keys(this.state.customizations).forEach(attrId => {
      const attribute = this.matchAttribute(attrId);
      const value = this.matchAttributeValue(attribute, this.state.customizations[attrId]);
      if (attribute && value) {
        allAttributes[attribute.slug] = value.slug;
      }
    });
    const params = this.getDynamicRenderParams(allAttributes)
    const url = hieronymusBaseUrl + queryString.stringify(params)
    $.get(url, function(src) {
      $("#dynamic-render").attr('src', src);
    }, 'text');
  }

  getDynamicRenderParams(attributes) {
    // Convert attributes into url params for hieronymus dynamic rendering.
    let params = {}
    let topColor = []
    let bodyColor = []
    // Top and bottom colors - We currently support up to 4 of each.
    for (let i = 1; i < 5; i++) {  
      if (attributes.hasOwnProperty('top-color-' + i)) {
        topColor.push(attributes['top-color-' + i]);
      }
      if (attributes.hasOwnProperty('body-color-' + i)) {
        bodyColor.push(attributes['body-color-' + i]);
      }
    }
    params['top-color'] = topColor;
    params['body-color'] = bodyColor;
    // Sections
    if (attributes.hasOwnProperty('sections')) {
      params['body-sections'] = attributes['sections'].split('-')[0]
    }
    // Top
    const topUnfiltered = window.location.pathname.split('/').slice(-2)[0];
    const cIndex = topUnfiltered.lastIndexOf('-')
    params['top-id'] = topUnfiltered.substring(0, cIndex)
    // Body
    if (attributes.hasOwnProperty('body')) {
      params['body-id'] = attributes['body']
    }
    // Base
    if (attributes.hasOwnProperty('base')) {
      params['base-id'] = attributes['base']
    }
    return params;
  }

  updateParams() {
    // Update url params based on selected variant and custom attributes.
    let params = {};
    Object.keys(this.state.selection).forEach(attrId => {
      const attribute = this.matchAttribute(attrId);
      const value = this.matchAttributeValue(attribute, this.state.selection[attrId]);
      if (attribute && value) {
        params[attribute.slug] = value.slug;
      }
    });
    Object.keys(this.state.customizations).forEach(attrId => {
      const attribute = this.matchAttribute(attrId);
      const value = this.matchAttributeValue(attribute, this.state.customizations[attrId]);
      if (attribute && value) {
        params[attribute.slug] = value.slug;
      }
    });
    history.pushState(null, null, '?' + queryString.stringify(params));
  }

  handleQuantityChange = (event) => {
    this.setState({quantity: parseInt(event.target.value)});
  }

  matchAttribute = (id) => {
    const { variantAttributes, customAttributes } = this.props;
    let allAttributes = variantAttributes.concat(customAttributes);
    const match = allAttributes.filter(attribute => attribute.pk.toString() === id);
    return match.length > 0 ? match[0] : null;
  }

  matchVariantAttributeBySlug = (slug) => {
    const { variantAttributes } = this.props;
    const match = variantAttributes.filter(attribute => attribute.slug === slug);
    return match.length > 0 ? match[0] : null;
  }

  matchCustomAttributeBySlug = (slug) => {
    const { customAttributes } = this.props;
    const match = customAttributes.filter(attribute => attribute.slug === slug);
    return match.length > 0 ? match[0] : null;
  }

  matchAttributeValue = (attribute, id) => {
    const match = attribute.values.filter(attribute => attribute.pk.toString() === id);
    return match.length > 0 ? match[0] : null;
  }

  matchAttributeValueByName = (attribute, name) => {
    const match = attribute ? attribute.values.filter(value => value.slug === name) : [];
    return match.length > 0 ? match[0] : null;
  }

  matchVariantFromSelection() {
    const { store, variants } = this.props;
    let matchedVariant = null;
    variants.forEach(variant => {
      if (_.isEqual(this.state.selection, variant.attributes)) {
        matchedVariant = variant;
      }
    });
    store.setVariant(matchedVariant);
  }

  render() {
    const { store, variantAttributes, customAttributes } = this.props;
    const { errors, selection, customizations, quantity } = this.state;
    const disableAddToCart = store.isEmpty;

    const addToCartBtnClasses = classNames({
      'btn primary': true,
      'disabled': disableAddToCart
    });

    return (
      <div>
        {variantAttributes.map((attribute, i) =>
          <AttributeSelectionWidget
            attribute={attribute}
            handleChange={this.handleAttributeChange}
            key={i}
            selected={selection[attribute.pk]}
          />
        )}
        {customAttributes.map(attribute =>
          <AttributeSelectionWidget
            attribute={attribute}
            handleChange={this.handleCustomAttributeChange}
            selected={customizations[attribute.pk]}
          />
        )}
        <div className="clearfix">
          <QuantityInput
            errors={errors.quantity}
            handleChange={this.handleQuantityChange}
            quantity={quantity}
          />
          <div className="form-group product__info__button">
            <button
              className={addToCartBtnClasses}
              onClick={this.handleAddToCart}
              disabled={disableAddToCart}>
              {pgettext('Product details primary action', 'Add to cart')}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
