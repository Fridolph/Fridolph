# 4.3使用一个for循环打印数字1-20
# for num in range(1,21):
#   print(num)

# 4.4创建一个列表，包含数字1-100000，再使用for循环将这些数字打印出来
# numbers = list(range(1, 100001))
# for number in numbers:
#   print(number)

# 4.5
# print(min(numbers))
# print(max(numbers))
# print(sum(numbers))

# 4.6 1-20的奇数
# odds = list(range(1,21,2))
# for odd in odds:
#   print(odd)

# 4.7 3-30能被3整除的数字，再使用for循环来打印他们
# threes = list(range(3,31,3))
# for three in threes:
#   print(three)

# 4.8 1-10的立方
lifang = [value**3 for value in range(1,11)]
print(lifang)