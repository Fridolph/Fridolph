from random import randint

d = { x: randint(60, 100) for x in 'xyzabc' }

# print sorted(d)
# print list(iter(d))

# print d.keys()
# print d.values()

# print zip(d.itervalues(), d.iterkeys())
print sorted(zip(d.itervalues(), d.iterkeys()))