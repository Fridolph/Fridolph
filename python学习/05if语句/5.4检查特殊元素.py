# requested_toppings = ['mushrooms', 'green peppers', 'extra cheese']
# for requested_topping in requested_toppings: 
#   print("Adding " + requested_topping + ".")
# print("\nFinished making your pizza!")

# requested_toppings = ['mushrooms', 'green peppers', 'extra cheese']
# for requested_topping in requested_toppings:
#   if requested_topping == 'green peppers':
#     print("Sorry, we are out of green peppers right now.")   
#   else:
#     print("Adding " + requested_topping + ".") 

# print("\nFinished making your pizza!")

# 确定列表不为空
# requested_toppings = []
# if requested_toppings:
#   for requested_topping in requested_toppings:
#     print("Adding " + requested_topping + ".") 
#   print("\nFinished making your pizza!")
# else:
#   print("Are you sure you want a plain pizza?")

# new_list = []
# if new_list:
#   for item in new_list:
#     print('add' + item + '.')
#   print('finished')
# else: 
#   print('the list is empty.')

# 使用多个列表
available_toppings = ['mushrooms', 'olives', 'green peppers', 'pepperoni', 'pineapple', 'extra cheese']
requested_toppings = ['mushrooms', 'french fries', 'extra cheese']

for requested_topping in requested_toppings: 
  if requested_topping in available_toppings:
    print("Adding " + requested_topping + ".") 
  else:
    print("Sorry, we don't have " + requested_topping + ".")
print("\nFinished making your pizza!")