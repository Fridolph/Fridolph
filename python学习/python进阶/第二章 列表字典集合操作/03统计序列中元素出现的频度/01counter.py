from random import randint
from collections import Counter

data = [randint(0, 20) for _ in range(30)]

# print data

c2 = Counter(data)

result = c2.most_common(3)

print result

