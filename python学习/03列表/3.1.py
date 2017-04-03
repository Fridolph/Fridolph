bicycles = ['trek', 'cannondale', 'redline', 'specialized'] 
print(bicycles)
print(bicycles[1])
print(bicycles[1].title())
print(bicycles[-1])

message = "My first bicycle was a " + bicycles[0].title() + "." 
print(message)

# 3-1 姓名:将一些朋友的姓名存储在一个列表中,并将其命名为 names。
# 依次访问 该列表中的每个元素,从而将每个朋友的姓名都打印出来。
names=['fuyinsheng', 'yangke', 'wangbo', 'youxin']
print(names[0])
print(names[1])
print(names[2])
print(names[3])

# 3-2 问候语:继续使用练习 3-1 中的列表,但不打印每个朋友的姓名,而为每人打印一条消息。
# 每条消息都包含相同的问候语,但抬头为相应朋友的姓名。
msg = names[0] + ', Hello!'
print(msg)
msg = names[1] + ', Hello!'
print(msg)
msg = names[2] + ', Hello!'
print(msg)
msg = names[3] + ', Hello!'
print(msg)

# 3-3 自己的列表:想想你喜欢的通勤方式,如骑摩托车或开汽车,并创建一个包含 多种通勤方式的列表。
# 根据该列表打印一系列有关这些通勤方式的宣言,
# 如“I would liketo own a Honda motorcycle”。