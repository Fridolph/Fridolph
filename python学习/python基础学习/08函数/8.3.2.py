# 让实参变成可选的
def getFullname(firstName, lastName, middleName=''):
  if middleName:
    fullName = firstName + ' ' + lastName
  else:
    fullName = firstName + ' ' + middleName + ' ' + lastName
  
  return fullName.title()

musician = getFullname('jimi', 'hendrix') 
print(musician)
musician = getFullname('john', 'hooker', 'lee') 
print(musician)