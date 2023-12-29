> 有时想略微延迟一下操作。在传统的JS中，通过setTimeout执行一个很小的延迟是可接受的。
> 在Node中，提供了一个更有效的方案，process.nextTick

问题：
想写一个方法返回一个EventEmitter示例，或允许一个回调仅在有些时候调用一个异步的接口，而不是所有时候。

解决方案：
使用process.nextTick来包装一个同步操作

讨论：
process.nextTick方法允许你把一个回调放在下一次事件轮询队列的头上。这意味着它可以用来延迟执行，其结果是它比使用setTimeout更有效率。


### 创建一个始终异步的API

... 

在这个例子中，通过fs.readFile把一个文件读取到缓存中，然后在后面的每次调用中返回这个文件的副本。
它被封装在一个进程中多次执行，所以可以比较异步的文件操作与process.nextTick的不同


### 可视化事件轮询: setImmediate 和 processs.maxTickDepth

setImmediate以及clearImmediate全局方法接受一个回调参数和可选的参数，它会在下一次I/O事件后并在setTimeout以及setInterval之前执行。

通过这个方法添加的回调函数通常在当前事件轮询接受后执行。可以被安全执行的回调数量被processs.maxTickDepth控制，默认的是1000，以及I/O操作可以继续被处理。

当在创建异步函数或者对象时，通过process.nextTick来确保函数的行为是一致的、可预测的。

Node中实现的基于浏览器的定时器可以在事件轮询中正常执行。
尽管它们主要是用来测试异步代码的，深入了解setTimeout、setImmediate以及process.nextTick何时执行需要掌握事件轮询。