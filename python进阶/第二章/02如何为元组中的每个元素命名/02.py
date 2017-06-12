from collections import namedtuple

Student = namedtuple('Student', ['name', 'age', 'sex', 'email'])

s = Student = ('Jim', 16, 'male', 'jim8721@gmail.com')

print s
