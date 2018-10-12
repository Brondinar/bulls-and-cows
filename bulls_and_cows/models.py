from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField


class Game(models.Model):
	key = models.CharField(max_length=255)
	history = ArrayField(JSONField(blank=True, null=True), blank=True, null=True)
	start = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ('start',)


class PlayerGame(models.Model):
	game = models.OneToOneField(Game, on_delete=models.CASCADE, primary_key=True)
	secret_number = models.CharField(max_length=10)


class ComputerGame(models.Model):
	game = models.OneToOneField(Game, on_delete=models.CASCADE, primary_key=True)
	available_numbers = ArrayField(models.CharField(max_length=10))
