# 添加键值对
# alien_0 = {'color': 'green', 'points': 5} 
# print(alien_0)
# alien_0['x_position'] = 0
# alien_0['y_position'] = 25
# print(alien_0)

# 创建字典
# alien_0 = {}
# alien_0['color'] = 'green'
# alien_0['points'] = 5
# print(alien_0)

# 修改字典中的值
# alien_0 = {'color': 'green'}
# print("The alien is " + alien_0['color'] + ".")
# alien_0['color'] = 'yellow'
# print("The alien is now " + alien_0['color'] + ".")


# alien_0 = {'x_position': 0, 'y_position': 25, 'speed': 'medium'} 
# print("Original x-position: " + str(alien_0['x_position']))
# # 向右移动外星人
# # 据外星人当前速度决定将其移动多远 
# if alien_0['speed'] == 'slow':
#   x_increment = 1
# elif alien_0['speed'] == 'medium':
#   x_increment = 2 
# else:
#   # 这个外星人的速度一定很快   
#   x_increment = 3
# # 新位置等于 位置加上增量
# alien_0['x_position'] = alien_0['x_position'] + x_increment

# print("New x-position: " + str(alien_0['x_position']))

# 删除键值对
# alien_0 = {'color': 'green', 'points': 5}
# print(alien_0)
# del alien_0['points'] 
# print(alien_0)

# 由类似对象组成的字典
favorite_languages = { 
  'jen': 'python', 
  'sarah': 'javascript', 
  'edward': 'ruby', 
  'phil': 'python', 
}
print('fridolph\'s favourite language is ' + favorite_languages['sarah'].title() + '.')