var hello1 = require('./module')
hello1.setName('YK')

var hello2 = require('./module')
hello2.setName('FYS')

hello1.sayHello()

// hello2的内容将前者覆盖掉。 最终输出的结果是由后者决定的， 因为hello1 hello2指向的是同一个实例