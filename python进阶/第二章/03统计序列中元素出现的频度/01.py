from random import randint

data = [randint(0, 20) for _ in range(30)]

# print data

c = dict.fromkeys(data, 0)


for x in data:
  c[x] += 1
  
print c