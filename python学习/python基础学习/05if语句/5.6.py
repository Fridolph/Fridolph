# s = input('birth: ')
# birth = int(s)
# if birth < 24:
#   print('青年')
# else: 
#   print('中年')

height = float(input('请输入身高(m): '))
weight = float(input('请输入体重(kg): '))
bmi = weight / (height**2)

if bmi < 18.5:
  print('过轻')
elif (18.5 < bmi < 25):
  print('正常')
elif (25 < bmi < 28):
  print('过重')
elif (28 < bmi < 32):
  print('肥胖')
else:
  print('严重肥胖')