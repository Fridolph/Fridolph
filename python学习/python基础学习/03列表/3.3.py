# 3.3.1 使用方法sort()对列表进行永久性排序
cars = ['bmw', 'audi', 'toyota', 'subaru']
cars.sort()
print(cars)
cars.sort(reverse=True)
print(cars)

# 3.3.2 使用函数sorted()对列表进行临时排序
cars = ['bmw', 'audi', 'toyota', 'subaru']
print("Here is the original list:") 
print(cars)
print("\nHere is the sorted list:") 
print(sorted(cars))
print("\nHere is the original list again:") 
print(cars)

# 3.3.3 倒着打印列表
cars = ['bmw', 'audi', 'toyota', 'subaru']
print(cars)
cars.reverse() 
print(cars)
# 方法reverse()永久性地修改列表元素的排列顺序,
# 但可随时恢复到原来的排列顺序,为此 只需对列表再次调用reverse()即可。

# 3.3.4 确定列表的长度
print(len(cars))
cars.reverse() 
print(cars[-1])

# 3.5 小结
# 在本章中,你学习了:列表是什么以及如何使用其中的元素;如何定义列表以及如何增删元 素;
# 如何对列表进行永久性排序,以及如何为展示列表而进行临时排序;如何确定列表的长度, 
# 以及在使用列表时如何避免索引错误。
# 在第4章,你将学习如何以更高效的方式处理列表元素。
# 通过使用为数不多的几行代码来遍 历列表元素,你就能高效地处理它们,即便列表包含数千乃至数百万个元素。