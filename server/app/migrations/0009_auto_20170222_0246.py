# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-22 00:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_auto_20170222_0002'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='drive',
            name='id',
        ),
        migrations.AddField(
            model_name='drive',
            name='drive_id',
            field=models.AutoField(default=1, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]
