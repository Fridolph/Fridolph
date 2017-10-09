# 命名关键字参数
# 对于关键字参数，函数的调用者可以传入任意不受限制的关键字参数
def person(name, age, **kw):
  if 'city' in kw:
    pass
  if 'job' in kw:
    pass
  print('\nname: ', name, '\nage: ', age, '\nother: ', kw, '\n')
# 但是调用者仍可以传入不受限制的关键字参数：
# person('fri', 24, addr='Zunyi', phone=13113113111)

# 如果要限制关键字参数的名字，就可以用关键字参数，例如，只接收city和job作为关键字参数：
def person2(name, age, *, city, job):
  print(name, age, city, job)

# person2('fri', 24, city='zunyi', job='程序猿')

# 如果函数定义中已经有了一个可变参数，后面跟着的命名关机那字参数就不再需要一个特殊分隔符*
def person3(name, age, *, city='beijing', job):
  print(name, age, city, job)

# person3('fri', 24, job='程序猿')