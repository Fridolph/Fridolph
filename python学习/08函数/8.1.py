def greet_user():
  """显示简单的问候语"""
  # 注释
  print("Hello!")
  
greet_user()

def greet_user(username):
  print("Hello, " + username.title() + "!")

greet_user('fridolph')