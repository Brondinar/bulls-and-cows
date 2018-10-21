from rest_framework import serializers
from bulls_and_cows.models import Game, PlayerGame


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id', 'key', 'history', 'player_guesses')


class PlayerGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerGame
        fields = ('secret_number',)
