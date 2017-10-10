from collections import Iterable
isinstance('abc', Iterable) # str是否可迭代
# True
isinstance([1,2,3], Iterable) # list是否可迭代
# True
isinstance(123, Iterable) # 整数是否可迭代
# False