# Generated by Django 2.1.2 on 2018-10-21 10:38

import django.contrib.postgres.fields
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=255)),
                ('player_guesses', models.BooleanField(default=True)),
                ('history', django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True), blank=True, null=True, size=None)),
                ('start', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ('start',),
            },
        ),
        migrations.CreateModel(
            name='PlayerGame',
            fields=[
                ('game', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='backend.Game')),
                ('secret_number', models.CharField(max_length=10)),
            ],
        ),
    ]
