from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.models import Game, PlayerGame
from backend.serializers import GameSerializer
from random import random, choice
from hashlib import sha512
from itertools import permutations
from backend.utils import cows_filter, bulls_filter, set_cache, get_cache
from django.shortcuts import get_object_or_404
from re import match
from django.core.cache import cache

ERROR_MESSAGE = lambda field: "'{}' is invalid".format(field)

'''
Создать новую игру, передав по POST запросу JSON:

{
    'player_guesses': (true|false),
    'digits': (0...10)
}
'''
@api_view(['POST'])
def create_game(request):
    if 'player_guesses' not in request.data or not isinstance(request.data['player_guesses'], bool):
        return Response({'error': ERROR_MESSAGE('player_guesses')}, status=status.HTTP_400_BAD_REQUEST)
    elif 'digits' not in request.data or not isinstance(request.data['digits'], int) or \
            request.data['digits'] < 0 or request.data['digits'] > 10:
        return Response({'error': ERROR_MESSAGE('digits')}, status=status.HTTP_400_BAD_REQUEST)

    key = sha512(str(random()).encode('utf-8')).hexdigest()
    game = Game(key=key, player_guesses=request.data['player_guesses'])
    game.save()

    if request.data['player_guesses']:
        digits = int(request.data['digits'])
        secret_number = ''.join(choice(list(permutations('0123456789', digits))))
        player_game = PlayerGame(game=game, secret_number=secret_number)
        player_game.save()

    elif not request.data['player_guesses']:
        digits = int(request.data['digits'])
        available_numbers = list(permutations("0123456789", digits))
        set_cache(key, 'available_numbers', available_numbers)
    serializer = GameSerializer(game)

    return Response(serializer.data)


# Получить данные игры по GET запросу с идентификатором игры
@api_view(['POST'])
def game(request):
    if 'key' not in request.data or not isinstance(request.data['key'], str):
        return Response({'error': ERROR_MESSAGE('key')}, status=status.HTTP_400_BAD_REQUEST)

    key = request.data['key']
    game = get_object_or_404(Game, key=key)
    serializer = GameSerializer(game)

    return Response(serializer.data)


''' 
Отправить попытку угадать номер, передав по POST запросу JSON:

{
    'key': (\w+)
    'number': '([0-9]{1, 10})'
}
'''
@api_view(['POST'])
def try_to_guess(request):
    if 'key' not in request.data or not isinstance(request.data['key'], str):
        return Response({'error': ERROR_MESSAGE('key')}, status=status.HTTP_400_BAD_REQUEST)
    elif 'number' not in request.data or not isinstance(request.data['number'], str) or \
            not match(r'^[0-9]+$', request.data['number']):
        return Response({'error': ERROR_MESSAGE('number')}, status=status.HTTP_400_BAD_REQUEST)

    key = request.data['key']
    player_number = request.data['number']
    player_game = get_object_or_404(PlayerGame, game__key=key)

    if player_game.game.history is not None and player_game.game.history[-1]['winner']:
        serializer = GameSerializer(player_game.game)
        return Response(serializer.data)

    secret_number = player_game.secret_number
    bulls = len([True for i in range(len(secret_number)) if secret_number[i] == player_number[i]])
    cows = len([True for i in player_number if i in secret_number]) - bulls
    history_data = {'number': player_number, 'bulls': bulls, 'cows': cows, 'winner': False}

    if bulls == len(secret_number):
        history_data['winner'] = True

    if player_game.game.history is None:
        player_game.game.history = [history_data]
    else:
        player_game.game.history.append(history_data)

    player_game.game.save()
    serializer = GameSerializer(player_game.game)

    return Response(serializer.data)


@api_view(['POST'])
def get_computer_try(request):
    if 'key' not in request.data or not isinstance(request.data['key'], str):
        return Response({'error': ERROR_MESSAGE('key')}, status=status.HTTP_400_BAD_REQUEST)

    key = request.data['key']
    game = get_object_or_404(Game, key=key)

    if game.history is not None and game.history[-1]['winner']:
        serializer = GameSerializer(game)
        return Response(serializer.data)

    try:
        # number = ''.join(choice(list(cache.get('available_numbers'))))
        number = ''.join(choice(list(get_cache(key, 'available_numbers'))))
    except IndexError as error:
        return Response({'error': str(error)}, status=400)
    else:
        return Response({'number': number})


@api_view(['POST'])
def send_answer(request):
    if 'key' not in request.data or not isinstance(request.data['key'], str):
        return Response({'error': ERROR_MESSAGE('key')}, status=status.HTTP_400_BAD_REQUEST)
    elif 'number' not in request.data or not isinstance(request.data['number'], str) or \
            not match(r'^[0-9]+$', request.data['number']):
        return Response({'error': ERROR_MESSAGE('number')}, status=status.HTTP_400_BAD_REQUEST)
    elif 'bulls' not in request.data or not isinstance(request.data['bulls'], int) or \
            request.data['bulls'] < 0 or request.data['bulls'] > len(request.data['number']):
        return Response({'error': ERROR_MESSAGE('bulls')}, status=status.HTTP_400_BAD_REQUEST)
    elif 'cows' not in request.data or not isinstance(request.data['cows'], int) or \
            request.data['cows'] < 0 or request.data['cows'] > len(request.data['number']):
        return Response({'error': ERROR_MESSAGE('cows')}, status=status.HTTP_400_BAD_REQUEST)

    key = request.data['key']
    number = request.data['number']
    bulls = int(request.data['bulls'])
    cows = int(request.data['cows'])
    history_data = {'number': number, 'bulls': bulls, 'cows': cows, 'winner': False}
    game = get_object_or_404(Game, key=key)

    if game.history is not None and game.history[-1]['winner']:
        serializer = GameSerializer(game)
        return Response(serializer.data)

    if bulls == len(number):
        history_data['winner'] = True

    if game.history is None:
        game.history = [history_data]
    else:
        game.history.append(history_data)

    game.save()
    serializer = GameSerializer(game)

    # если текущий ход - победный, вернуть без фильтрации и очистить кэш
    if history_data['winner']:
        cache.delete('available_numbers')
        return Response(serializer.data)

    available_numbers = get_cache(key, 'available_numbers')
    available_numbers = cows_filter(bulls + cows, number, available_numbers)
    available_numbers = bulls_filter(bulls, number, available_numbers)
    set_cache(key, 'available_numbers', available_numbers)

    return Response(serializer.data)


