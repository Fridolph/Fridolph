from random import randint

N = randint(0, 100)

def guess(k):
  if k == N:
    print 'right'
    return True
  if k < N:
    print '%s is less-than N' % k

  else:
    print '%s is greater-than N' % k
  
  return False

while True:
  line = raw_input('please input a number: ')
  if line.isdigit():
    k = int(line)
    if guess(k):
      break