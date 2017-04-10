# 在字典中存储字典
users = { 
  'aeinstein': {
    'first': 'albert', 
    'last': 'einstein', 
    'location': 'princeton', 
  },
  'mcurie': {
    'first': 'marie', 
    'last': 'curie', 
    'location': 'paris', 
  },
}

for username, userinfo in users.items():
  print('username: ' + username)
  fullname = userinfo['first'] + ' ' + userinfo['last']
  location = userinfo['location']

  print('\tfullname: ' + fullname.title())
  print('\tlocation: ' + location.title())