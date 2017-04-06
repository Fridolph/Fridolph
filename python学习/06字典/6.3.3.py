# 按顺序遍历字典中的所有键
favorite_languages = { 
  'jen': 'python', 
  'sarah': 'c', 
  'edward': 'ruby', 
  'phil': 'python', 
}

for name in sorted(favorite_languages.keys()): 
  print(name.title() + ", thank you for taking the poll.")