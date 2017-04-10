# 简单返回值
def get_formatted_name(first_name, last_name):
  full_name = first_name + ' ' + last_name
  return full_name.title()

musician = get_formatted_name('yang', 'ke') 
print(musician)


def get_formatted_name(first_name, middle_name, last_name):
  full_name = first_name + ' ' + middle_name + ' ' + last_name
  return full_name.title()

musician = get_formatted_name('john', 'lee', 'hooker') 
print(musician)
