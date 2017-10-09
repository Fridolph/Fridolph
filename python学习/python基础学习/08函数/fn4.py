def calc(numbers): 
  sum = 0
  for x in numbers:
    sum = sum + x*x
  print(sum)
  return sum

# calc([1,2,3,4,5])

def calc2(*numbers):
  sum = 0
  for x in numbers:
    sum = sum + x * x
  print(sum)
  return sum

calc2(1,2,3,4,5)  