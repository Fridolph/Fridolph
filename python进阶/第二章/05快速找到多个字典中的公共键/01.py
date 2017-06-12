from random import randint, sample

# print sample('abcdefg', randint(3,6))

s1 = { x: randint(1, 4) for x in sample('abcdefg', randint(3,6)) }

print s1