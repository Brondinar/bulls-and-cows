from rest_framework import serializers
from bulls_and_cows.models import Game, PlayerGame, ComputerGame


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id', 'key', 'history')


class PlayerGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerGame
        fields = ('secret_number',)


class ComputerGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComputerGame
        fields = ('available_numbers',)

