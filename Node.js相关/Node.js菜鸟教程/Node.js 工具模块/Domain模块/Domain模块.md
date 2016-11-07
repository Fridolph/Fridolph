Node.js Domain(域) 简化异步代码的异常处理，可以捕捉处理try catch无法捕捉的异常。引入 Domain 模块 语法格式如下：
var domain = require("domain")

domain模块，把处理多个不同的IO的操作作为一个组。注册事件和回调到domain，当发生一个错误事件或抛出一个错误时，domain对象会被通知，不会丢失上下文环境，也不导致程序错误立即推出，与process.on('uncaughtException')不同。
Domain 模块可分为隐式绑定和显式绑定：

隐式绑定: 把在domain上下文中定义的变量，自动绑定到domain对象

显式绑定: 把不是在domain上下文中定义的变量，以代码的方式绑定到domain对象


###方法

1. domain.run(function)
在域的上下文运行提供的函数，隐式的绑定了所有的事件分发器，计时器和底层请求。
2. domain.add(emitter)
显式的增加事件
3. domain.remove(emitter)
删除事件。
4. domain.bind(callback)
返回的函数是一个对于所提供的回调函数的包装函数。当调用这个返回的函数被时，所有被抛出的错误都会被导向到这个域的 error 事件。
5. domain.intercept(callback)
和 domain.bind(callback) 类似。除了捕捉被抛出的错误外，它还会拦截 Error 对象作为参数传递到这个函数。
6. domain.enter()
进入一个异步调用的上下文，绑定到domain。
7. domain.exit()
退出当前的domain，切换到不同的链的异步调用的上下文中。对应domain.enter()。
8. domain.dispose()
释放一个domain对象，让node进程回收这部分资源。
9. domain.create()
返回一个domain对象。

###属性

domain.members： 已加入domain对象的域定时器和事件发射器的数组。