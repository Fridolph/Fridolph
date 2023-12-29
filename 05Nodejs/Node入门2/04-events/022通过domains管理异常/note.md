> 处理多个EventEmitter实例的异常感觉非常困难， 可以使用domains

问题：
正在处理多个非阻塞的API， 但纠结于如何有效地处理异常。

解决方案：
Node的domain模块能被用来集中地处理多个异常操作，这包括EventEmitter实例发出的未处理的error事件

讨论：
Node的domain接口提供了用异常处理封装已有的非阻塞API以及错误的方法。这能帮助集中处理异常。而且在多个相互依赖的I/O操作时非常有用。

