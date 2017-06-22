# 5.8 跟管理员打招呼
# users = ['fri', 'yk', 'wb', 'admin', 'keke']
# users = []

# if users:
#   for user in users:
#     if user == 'admin':
#       print('Hello admin, would you like to see a status report?')
#     else:
#       print('Hello ' + user + ', thank you for logging in again')
# else:
#   print('nothing...')

# 5.10 检查用户名
# current_user = ['fri', 'yk', 'wb', 'admin', 'keke']
# new_user = ['fridolph', 'keke', 'wangbo', 'admin', 'yangke']

# for name in new_user:
#   if name.lower() in current_user:
#     print(name + '已被使用，请更换')
#   else:
#     print(name + '可以正常使用')

# 5.11 序数
numbers = list(range(1,10))
print(numbers)

for number in numbers:
  if number == 1:
    print(str(number) + 'st')
  elif number == 2:
    print(str(number) + 'nd')
  elif number == 3:
    print(str(number) + 'rd')
  else:
    print(str(number) + 'th')


