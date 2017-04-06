# 创建一个待验证的用户列表
# 和一个用于存储的空列表
unconfirmed_users = ['alice', 'brian', 'candace']
confirmed_users = []

while unconfirmed_users:
  current_user = unconfirmed_users.pop()

  print("Verifying user: " + current_user.title())
  confirmed_users.append(current_user)

# 显示所有已  的用户
print("\nThe following users have been confirmed:") 
for confirmed_user in sorted(confirmed_users):
  print(confirmed_user.title())