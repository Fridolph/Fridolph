from random import randint

data = [randint(-10, 10) for _ in range(10)]

print data

list = [x for x in data if x >= 0]

print list
