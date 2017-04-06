# 删除包含特定值的所有列表元素
pets = ['dog', 'cat', 'dog', 'goldfish', 'cat', 'rabbit', 'cat'] 
print(pets)
while 'cat' in pets:
  pets.remove('cat')
  
print(pets)