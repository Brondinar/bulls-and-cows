# Generated by Django 2.1.2 on 2018-10-11 12:19

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bulls_and_cows', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='history',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True),
        ),
    ]
