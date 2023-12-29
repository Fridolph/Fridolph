> 有时需要动态地响应一个EventEmitter实例的变化，或者查询它的监听器。

问题：
需要知道一个监听器何时被添加到一个emitter上，或者查询现有的监听器。

解决方案：
追踪监听器何时被添加，EventEmitter发出一个特殊事件叫newListener。监听了这个事件的监听器会接受到事件的名字以及监听器的方法。 

讨论：
EventEmitter对象的理解至关重要。能够正确地反映EventEmitter对象，能够创建够灵活和直观的API。
一个动态的方法是通过newListener事件，这个事件会在监听器通过on方法添加的时候触发。
有趣的是，这个事件本身是通过EventEmitter自己触发、通过emit实现的。




2 - .js

我们可以更进一步，并通过emitter.listener(event)查询EventEmitter对象上的事件监听。虽然所有监听事件不能一次性返回，但整个列表是可以通过this._events对象获取的，尽管这个属性应视为私有。
listener方法目前返回一个数组实例。这可以被用来遍历多个Listener，如果有多个listener被添加到指定的事件，可能会在异步进程结束后删除它们，或者检查是否有任何的Listener添加。

当一个事件的数组可以被获取到的情况下，listeners函数将返回this._events[type].slice(0)。
对一个数组调用slice用来创建一个数组的拷贝。