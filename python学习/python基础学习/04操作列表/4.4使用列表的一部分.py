# players = ['charles', 'martina', 'michael', 'florence', 'eli']
# print(players[0:3])
# players = ['charles', 'martina', 'michael', 'florence', 'eli'] 
# print(players[1:4])
# # 没指定开头，以0开始
# players = ['charles', 'martina', 'michael', 'florence', 'eli']
# print(players[:4])
# # 没指定结尾
# players = ['charles', 'martina', 'michael', 'florence', 'eli'] 
# print(players[2:])

# players = ['charles', 'martina', 'michael', 'florence', 'eli'] 
# print(players[-3:])

# 遍历切片
players = ['charles', 'martina', 'michael', 'florence', 'eli']
print("Here are the first three players on my team:")   
for player in players[:3]:
  print(player.title())

# 复制列表
# my_foods = ['pizza', 'falafel', 'carrot cake']   
# friend_foods = my_foods[:]
# print("My favorite foods are:") 
# print(my_foods)
# print("\nMy friend's favorite foods are:") 
# print(friend_foods)
# my_foods.append('cannoli')
# friend_foods.append('ice cream')
# print(my_foods)
# print(friend_foods)
my_foods = ['pizza', 'falafel', 'carrot cake']   
friend_foods = my_foods
my_foods.append('cannoli')
friend_foods.append('ice cream')
print(my_foods)
print(friend_foods)