from random import randint, sample

# print sample('abcdefg', randint(3,6))

s1 = {x: randint(1, 4) for x in sample('abcdefg', randint(3,6))}

s2 = {x: randint(1, 4) for x in sample('abcdefg', randint(3,6))}

s3 = {x: randint(1, 4) for x in sample('abcdefg', randint(3,6))}

print s1,'\n', s2, '\n', s3

