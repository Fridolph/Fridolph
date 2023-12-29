> 可以通过Node的setTimeout全局方法延迟执行一段代码

问题：
想延迟执行一个函数

解决方案：
使用setTimeout, 并且在需要的时候使用 Function.prototype.bind


方法可以被很容易地通过Function.prototype.bind传入setTimeout，这可以被用来将第一个参数绑定为this, 或是更多见的这个方法隶属的对象

