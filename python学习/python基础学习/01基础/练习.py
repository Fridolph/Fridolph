# 2-3 个性化消息:将用户的姓名存到一个变量中,并向该用户显示一条消息。
# 显示的消息应非常简单,如“Hello Eric, would you like to learn some Python today?”。
name = 'fridolph'
message = 'Hello ' + name.title() + ', would you like to learn some Python today?'
print('----- 2-3 -----')
print(message)



# 2-4 调整名字的大小写:将一个人名存储到一个变量中,再以小写、大写和首字母大写的方式显示这个人名。
print('----- 2-4 -----')
name2 = 'yang ke'
print(name2.title())
print(name2.lower())
print(name2.upper())

# 2-5输出应类似于下面这样(包括引号):
# Albert Einstein once said, “A person who never made a mistake never tried anything new.”
para = 'Albert Einstein once said, “A person who never made a mistake never tried anything new.”'
print('----- 2-5 -----')
print(para)

# 2-6 名言 2:重复练习 2-5,但将名人的姓名存储在变量 famous_person 中,
# 再创建 要显示的消息,并将其存储在变量 message 中,然后打印这条消息。
famous_person = 'Albert Einstein'
message = famous_person +  ' once said, “A person who never made a mistake never tried anything new.”'
print('----- 2-6 -----')
print(message)

# 2-7 剔除人名中的空白:存储一个人名,并在其开头和末尾都包含一些空白字符。 务必至少使用字符组合"\t"和"\n"各一次。
# 打印这个人名,以显示其开头和末尾的空白。然后,分别使用剔除函数 lstrip()、 rstrip()和 strip()对人名进行处理,并将结果打印出来。
n1 = ' fridolph'
n2 = 'yang ke     '
n3 = ' wang bo  '
msg = '\t' + n1.lstrip() + '\n\t' + n2.rstrip() + '\n\t' + n3.strip()
print('----- 2-7 -----')
print(msg)

