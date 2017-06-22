name = 'fri'
print(name == 'fri')
print(name == 'Fri')

# 检查是否不相等
requested_topping = 'mushrooms'
if requested_topping != 'anchovies': 
  print("Hold the anchovies!")

# 检查多个条件 - 与
age_0 = 22  
age_1 = 18
print(age_0 >= 21 and age_1 >= 21)

age_1 = 22
print(age_0 >= 21 and age_1 >= 21)

# 或
print(age_0 < 20 or age_1 > 20)

# 检查特定值是否包含在列表中
requested_toppings = ['mushrooms', 'onions', 'pineapple']
print('mushrooms' in requested_toppings)
print('pepperoni' in requested_toppings)

# 检查特定值是否不包含在列表中
banned_users = ['andrew', 'carolina', 'david'] 
user = 'marie'
if user not in banned_users:
  print(user.title() + ", you can post a response if you wish.")
