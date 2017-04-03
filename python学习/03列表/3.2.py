# 修改元素列表
motorcycles = ['honda', 'yamaha', 'suzuki'] 
print(motorcycles)
motorcycles[0] = 'ducati' 
print(motorcycles)

motorcycles.append('ducati')
print(motorcycles)

# 添加元素列表
motorcycles = []
motorcycles.append('honda') 
motorcycles.append('yamaha') 
motorcycles.append('suzuki')
print(motorcycles)

# 在列表中插入元素
motorcycles = ['honda', 'yamaha', 'suzuki']
motorcycles.insert(0, 'ducati') 
print(motorcycles)

# 在列表中删除元素

# 1. 使用del语句删除元素 如果知道要删除的元素在列表中的位置,可使用del语句。
motorcycles = ['honda', 'yamaha', 'suzuki']
print(motorcycles)
del motorcycles[0] 
print(motorcycles)
del motorcycles[1] 
print(motorcycles)

# 2. 使用方法pop()删除元素 有时候,你要将元素从列表中删除,并接着使用它的值。
motorcycles = ['honda', 'yamaha', 'suzuki']
print(motorcycles)
popped_motorcycle = motorcycles.pop()
print(motorcycles)
print(popped_motorcycle)

# 3. 弹出列表中任何位置处的元素
# 实际上,你可以使用pop()来删除列表中任何位置的元素,只需在括号中指定要删除的元素 的索引即可。
first_owned = motorcycles.pop(0)
print('The first motorcycle I owned was a ' + first_owned.title() + '.')

# 4. 根据值删除元素
# 有时候,你不知道要从列表中删除的值所处的位置。如果你只知道要删除的元素的值,可使 用方法remove()。
motorcycles = ['honda', 'yamaha', 'suzuki', 'ducati']
print(motorcycles)
motorcycles.remove('ducati') 
print(motorcycles)