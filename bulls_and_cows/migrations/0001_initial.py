# Generated by Django 2.1.2 on 2018-10-11 12:17

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
                ('history', django.contrib.postgres.fields.jsonb.JSONField()),
                ('start', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ('start',),
            },
        ),
        migrations.CreateModel(
            name='PlayerGame',
            fields=[
                ('game', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='bulls_and_cows.Game')),
                ('secret_number', models.CharField(max_length=10)),
            ],
        ),
    ]
