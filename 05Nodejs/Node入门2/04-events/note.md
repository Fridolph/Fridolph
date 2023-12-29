## 本章概要：

* 使用Node的EventEmitter模块
* 异常管理
* 第三方模块中如何使用EventEmitter
* 如何使用domains模块的events
* EventEmitter的替代品

Node的事件模块目前只包含一个类：EventEmitter。这个类在Node的内置模块以及第三方模块中被大量使用。
它是一个简单的类，在使用Node中最需要考虑的是异常处理。

### 基础用法

要使用EventEmitter,首先必须先继承于它。


### 总结：

在这一章，学会了继承和多继承如何使用EventEmitter，以及如何在不使用domain的情况下管理错误。