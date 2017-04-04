# car = 'subaru'
# print("Is car == 'subaru'? I predict True.") 
# print(car == 'subaru')
# print("\nIs car == 'audi'? I predict False.") 
# print(car == 'audi')


# 1 检查两个字符串相等或不等
str1 = 'abc'
str2 = 'Abc'
print(str1 == str2)
# 2 使用函数lower()的测试
print(str1 == str2.lower())
# 3 比较两个数
num1 = 12
num2 = 15
print(num1 > num2)
# 4 and or 
print('比较结果 num1大于12或者num小于16:' + str(num1 > 12 or num2 < 16) )
print('比较结果 num1大于12且num小于16:' + str(num1 > 12 and num2 < 16) )
# 5 特定值是否包含在列表中
numbers = list(range(1,11,2))
print(numbers)
if 9 in numbers:
  print('9在列表numbers中')
else:
  print('12不在列表中')
# 5 特定值是否不包含在列表中
if 2 in numbers:
  print('2在列表中')
else:
  print('2不在列表中')