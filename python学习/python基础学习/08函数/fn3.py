def add_end(L = []):
  L.append('END')
  return L

print(add_end())
print(add_end())
print(add_end())

# Python函数在定义的时候，默认参数L的值就被计算出来了，即[]，因为默认参数L也是一个变量。
# L指向对象[]，每次调用函数，如果改变了L的内容，则下次调用时默认参数内容也变了，不再是定义时的 [] 了

def add__end(L = None):
  if L is None:
    L = []
  L.append('END')
  return L
print('---------------------')
print(add__end())
print(add__end())
print(add__end())