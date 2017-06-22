for value in range(1,5):
  print(value)

# 创建数值列表
numbers = list(range(1,6))
print(numbers)

even_numbers = list(range(2,11,2))
print(even_numbers)

squares = []
for value in range(1,11):
  square = value**2 
  squares.append(square)

print(squares)

# 对数字列表执行简单的统计计算
digits=[1,2,3,4,5,6,7,8,9,0]
print(digits)
print(min(digits))
print(max(digits))
print(sum(digits))

# 列表解析
squares = [value**2 for value in range(1,11)] 
print(squares)
