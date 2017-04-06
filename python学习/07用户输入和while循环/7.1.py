# name = input("Please enter your name: ") 
# print("Hello, " + name + "!")

# prompt = "If you tell us who you are, we can personalize the messages you see." 
# prompt += "\nWhat is your first name? "
# name = input(prompt) 
# print("\nHello, " + name + "!")

# height = input("How tall are you, in inches? ") 
# height = int(height)
# if height >= 36:
#   print("\nYou're tall enough to ride!")
# else:
#   print("\nYou'll be able to ride when you're a little older.")

number = input("Enter a nulsmber, and I'll tell you if it's even or odd: ")
number = int(number)
if number % 2 == 0:
  print("\nThe number " + str(number) + " is even.")
else:
  print("\nThe number " + str(number) + " is odd.")