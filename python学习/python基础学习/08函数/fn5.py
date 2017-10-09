# 关键字参数
# 可变参数允许传入0个或任意个参数，这些可变参数在函数调用时自动组装为一个tuple
# 而关键字参数允许传入0个或任意个含参数名的参数，这些关键字参数在函数内部自动组装为一个dict
def person(name, age, **kw):
  print('\nname: ', name, '\nage: ', age, '\nother: ', kw, '\n')

# person('fri',24)
# person('fri',24,city='Zunyi')
extra = {
  'city': 'Zunyi',
  'job': 'Engineer'
}
# person('fri', 24, city = extra['city'], job = extra['job'])
person('fri', 24, **extra)
# **extra表示把extra这个dict的所有k-v用关键字参数传入到函数的 **kw 参数
# kw 将获得一个 dict 注意 kw 获得的 dict 是 extra 的一个拷贝， 对 kw 的改动不会影响到函数外的 extra
