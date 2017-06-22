import re

txt = open('./hero.txt').read()

# print txt
from collections import Counter

c3 = Counter(re.split('\W+', txt))

print c3.most_common(10)

