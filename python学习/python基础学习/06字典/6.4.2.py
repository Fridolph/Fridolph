pizza={
  'crust': 'thick',
  'toppings': ['mushrooms', 'extra cheese'], 
}

print(
  "You ordered a " + 
  pizza['crust'] + 
  "-crust pizza " + 
  "with the following toppings:"
)

for topping in pizza['toppings']: 
  print("\t" + topping)

favorite_languages = {
  'jen': ['python', 'ruby'],
  'sarah': ['c'],
  'edward': ['ruby', 'go'], 
  'phil': ['python', 'haskell'], 
}

for name,langs in favorite_languages.items():
  print(name + '\'s favorite language is: ')
  for lang in langs:
    print(lang.title())