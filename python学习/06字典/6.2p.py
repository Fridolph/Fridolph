# 6.1 字典 - 人
yk = {
  'name': 'yangke',
  'age': 24,
  'like': 'fys',
  'hobby': '看书睡觉吃饭',
  'say': '你好吗'
}
print(yk)

# 6.2 储存数字
numbers = {
  'yk': 1,
  'fys': 4,
  'wb': 3
}

for number in numbers:
  print(number + ', do you like ' + str(numbers[number]) + ' ?')