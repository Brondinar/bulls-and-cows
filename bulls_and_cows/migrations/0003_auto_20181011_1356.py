# Generated by Django 2.1.2 on 2018-10-11 13:56

import django.contrib.postgres.fields
import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bulls_and_cows', '0002_auto_20181011_1219'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='history',
            field=django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True), blank=True, null=True, size=None),
        ),
    ]