# coding: utf-8
l = [1,2,3,4]

s = 'abcdefg'

for x in l: print x

print '----------'

for x in s: print x


# for in 语句中 首先要保证 in 后的 对象为一个可迭代对象
# 这里要分清楚 可迭代 和 迭代器 这两个概念

# 迭代器  由可迭代对象得到迭代器
print iter(l)
print iter(s)