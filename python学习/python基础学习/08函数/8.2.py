def describe_pet(animal_type, pet_name): 
  """显示宠物的信息"""
  print("\nI have a " + animal_type + ".")
  print("My " + animal_type + "'s name is " + pet_name.title() + ".")

describe_pet('dog', 'yangke')
describe_pet('cat', 'yangke')

def describe_pet(animal_type, pet_name):
  """显示 物的信息"""
  print("\nI have a " + animal_type + ".")
  print("My " + animal_type + "'s name is " + pet_name.title() + ".")
describe_pet('harry', 'hamster')

def describe_pet(animal_type, pet_name):
  """显示 物的信息"""
  print("\nI have a " + animal_type + ".")
  print("My " + animal_type + "'s name is " + pet_name.title() + ".")

describe_pet(animal_type='hamster', pet_name='harry')

describe_pet(animal_type='hamster', pet_name='harry') 
describe_pet(pet_name='harry', animal_type='hamster')

def describe_pet(pet_name, animal_type='dog'):
  """显示 物的信息"""
  print("\nI have a " + animal_type + ".")
  print("My " + animal_type + "'s name is " + pet_name.title() + ".")

describe_pet(pet_name='willie')