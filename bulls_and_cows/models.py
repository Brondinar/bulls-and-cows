from django.db import models
from django.contrib.postgres.fields import ArrayField


class Game(models.Model):
	key = models.CharField(max_length=255)
	history = ArrayField(ArrayField(models.CharField(max_length=10)))
	date_create = models.DateTimeField(auto_now_add=True)


class PlayerGame(models.Model):
	game = models.OneToOneField(Game, on_delete=models.CASCADE, primary_key=True)
	secret_number = models.CharField(max_length=10)