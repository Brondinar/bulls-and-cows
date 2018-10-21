from itertools import combinations
from django.core.cache import cache
from re import match


''' Принимает словарь с полями и список со словарями в формате:
{
    name: 'имя поля',
    pattern: паттерн поля
}
Валидирует поля.
'''
# TODO: не тестировалось
def fields_match(data, *fields):
    errors = []
    for field in fields:
        fname = field['name']
        fpattern = field['pattern']
        if fname not in data:
            errors.append('Field "{}" is undefined'.format(fname))
        elif not match(fpattern, data[fname]):
            errors.append('Field "{}" is invalid'.format(fname))

    return errors


def set_cache(game_key, prefix, array):
    cache.set('{0}:{1}'.format(game_key, prefix), array)


def get_cache(game_key, prefix):
    return cache.get('{0}:{1}'.format(game_key, prefix))


# Фильтрует варианты по "коровам". cows_and_bulls - сумма быков и коров, number - число, по которому нужно
# отсортировать, variants - доступные варианты
def cows_filter(cows_and_bulls, number, variants):
    possible_variants = []
    pos_comb = list(combinations(number, cows_and_bulls))
    for comb in pos_comb:
        for num in variants:
            if set(comb).issubset(set(num)) and set(set(number) ^ set(comb)).isdisjoint(num):
                possible_variants.append(num)

    return possible_variants


# Фильтрует варианты по "быкам". bulls - число быков, number - число, по которому нужно отсортировать,
# variants - доступные варианты
def bulls_filter(bulls, number, variants):
    possible_variants = []
    n = 0
    for num in variants:
        for i in range(len(number)):
            if num[i] == number[i]:
                n += 1
        if n == bulls:
            possible_variants.append(num)
        n = 0

    return possible_variants
