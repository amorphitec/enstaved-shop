# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-20 11:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0017_auto_20170816_0908'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ordereditem',
            name='product_name',
            field=models.CharField(max_length=512, verbose_name='product name'),
        ),
    ]