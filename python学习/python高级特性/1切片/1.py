L = ['fri', 'fridolph', 'yk', 'keke', 'k']

r = []
n = 3
for i in range(n):
  r.append(L[i])

# print(r)

# L[0:3]表示，从索引0开始，直到索引3为止，但不包括索引3
# print(L[0: 3])
# 若第一个是0，还可以省略
print(L[: 3])


L = list(range(100))

# 前10个
# print(L[:10])
# 后10个
# print(L[-10:])
# 前11-20个
# print(L[10:20])

# 前10个数，每两个取一个
# print(L[:10:2])

# 所有数，每5个取一个
# print(L[::5])

# 复制一个list
# print(L[:])

# tuple也是一种list，唯一区别是tuple不可变。因此，tuple也可以用切片操作，只是操作的结果仍是tuple
print((0,1,2,3,4,5)[:3])