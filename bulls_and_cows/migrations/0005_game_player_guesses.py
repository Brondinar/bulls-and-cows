# Generated by Django 2.1.2 on 2018-10-17 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bulls_and_cows', '0004_computergame'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='player_guesses',
            field=models.BooleanField(default=True),
        ),
    ]
