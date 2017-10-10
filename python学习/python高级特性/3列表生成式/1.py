L = list(range(10, 20))
# print(L)

L = []
for x in range(1, 11):
  L.append(x)

# print(L)

# print([x * x for x in range(1, 11)])

# 写列表生成式时，要把生成的元素 x * x 放到前面，后面跟for循环，就可以把list创建出来，