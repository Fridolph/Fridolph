from random import randint

data = [randint(-10, 10) for _ in range(10)]

print data

print filter(lambda x: x >= 0, data)