# 遍历字典
# user_0 = {
#   'username': 'efermi', 
#   'first': 'enrico', 
#   'last': 'fermi',
# }

# for key, value in user_0.items():
#   print('\nKey: ' + key + ', Value: ' + value)

favorite_languages = { 
  'jen': 'python', 
  'sarah': 'c', 
  'edward': 'ruby', 
  'phil': 'python', 
}

# for name, lang in favorite_languages.items():
#   print(name.title() + '\'s favorite language is ' + lang.title() + '.')

# # 遍历字典中的所有键
# for name in favorite_languages.keys():
#   print(name)

# for lang in favorite_languages.values():
#   print(lang)

friends = ['phil', 'sarah']
  
for name in favorite_languages.keys():
  print(name.title())
  
  if name in friends:
    print(" Hi " + name.title() + ", I see your favorite language is " + favorite_languages[name].title() + "!")

if 'erin' not in favorite_languages.keys():
  print("Erin, please take our poll!")

