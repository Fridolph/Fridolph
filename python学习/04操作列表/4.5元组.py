# 数组是可改变的，而元组是不可改变的，可理解为 const 所组成的数组
dimensions = (200, 50)   
print(dimensions[0]) 
print(dimensions[1])

# dimensions[0] = 250

dimensions = (200, 50) 
print("Original dimensions:") 
for dimension in dimensions:
  print(dimension)

dimensions = (400, 100)
print("\nModified dimensions:")
for dimension in dimensions: 
  print(dimension)