d = {}

d['Jim'] = (1, 35)
d['Leo'] = (2, 38)
d['Bob'] = (3, 40)

for k in d:
  print k

print '--------------------'

from collections import OrderedDict

d = OrderedDict()

d['Jim'] = (1, 35)
d['Leo'] = (2, 38)
d['Bob'] = (3, 40)

for k in d:
  print k