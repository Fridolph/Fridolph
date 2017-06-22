# 在函数中修改列表

# 首先创建一个列表，其中包含一些要打印的设计
designs = ['yk', 'wb', 'fri']
models = []

while designs:
  current_design = designs.pop()

  print('print model: ' + current_design)
  models.append(current_design)

print('\n这些models被打印')
for model in models:
  print(model)