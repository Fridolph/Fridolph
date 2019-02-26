> React / Vue 不同组件之间是如何通信的？

Vue

* 父子组件用props通信，子调用$emit，父监听
* 非父子组件用Event Bus通信
* 如果项目够复杂，可能需要Vuex等全局状态管理库通信

React

* 父子组件，父 -> 子 直接通过props，子 -> 父 通过callback回调
* 非父子组件，用发布订阅模式的Event模块
* 项目复杂用Redux、Mobx等全局状态管理库
* 用新的Context API

---

Event Bus是发布订阅模式的典型应用。很多模块的通信都是基于类似模式，包括安卓开发中的`Event Bus`，Node.js中的`Event模块`（Node中几乎所有模块都依赖于Event，包括但不限于http、stream、buffer及fs等模块）

> 这里我们没有对传入的参数进行判断校验，仅仅对核心方法进行实现

---

## 1. 基本构造

1.1 初始化class

这里选择`Map`作为存储事件的结构，因为作为键值对的存储方式Map比一般对象更加适合，操作起来也更加简介

```js
class EventEmitter {
  constructor() {
    this._events = this._events || new Map() // 存储事件 / 回调键值对
    this._maxListeners = this._maxListeners || 10 // 设置监听上限
  }
}
```

1.2 监听与触发

触发监听函数我们可以用apply与call两种方法，在少数参数时call的性能更好，多个参数时apply性能更好

```js
// 触发名为type的事件
class EventEmitter {
  constructor() {
    this._events = this._events || new Map() // 存储事件 / 回调键值对
    this._maxListeners = this._maxListeners || 10 // 设置监听上限
  }

  emit(type, ...args) {
    let handler
    // 从存储事件键值对的 this._events 中获取对应事件回调函数
    handler = this._events.get(type)
    if (args.length > 0) {
      handler.apply(this, args)
    } else {
      handler.call(this)
    }
    return
  }

  addListener(type, fn) {
    // 将type事件以及对应的fn函数放入 this._events 中存储
    if (!this._events.get(type)) {
      this._events.set(type, fn)
    }
  }
}

// 我们实现了触发事件的emit方法和监听事件的addListener方法， 至此就可以进行简单实践了
// 实例化
const emitter = new EventEmitter()
// 监听一个名为sayHello的事件
emitter.addListener('sayHello', name => {
  console.log(`hello, ${name}`)
})
// 触发事件，执行回调
emitter.emit('sayHello', 'fridolph') // hello, fridolph
```

以上简单实现了基本的监听/触发，但是若有多个监听者，触发同一事件，则只会触发第一个，所以我们还需继续完善。

## 2. 完善

2.1 监听/触发器升级

我们的addListener实现方法还不够健全，在绑定第一个监听者之后，我们就无法对后续监听者进行绑定了，因此我们需要将后续监听者与第一个监听者函数放到一个数组里

```js
// 省略
emit(type, ...args) {
  let handler
  handler = this._events.get(tyep)

  // 如果是一个数组说明有多个监听者，需要依次触发里面的函数
  if (Array.isArray(handler)) {
    for (let i = 0; i < handler.length; i++) {
      if (args.length > 0) {
        handler[i].apply(this, args)
      } else {
        handler[i].call(this)
      }
    }
  } else {
    // 单个函数的情况我们直接触发即可
    if (args.length > 0) {
      handler.apply(this, args)
    } else {
      handler.call(this)
    }
  }
  return
}

// 监听名为type的事件
addListener(type, fn) {
  // 获取对应事件名称的函数清单
  const handler = this._events.get(type)
  if (!handler) {
    this._events.set(type, fn)
  } else if (handler && typeof handler === 'function') {
    // 如果handler是函数说明只有一个监听者
    // 多个监听者我们需要用数组存储
    this._events.set(type, [handler, fn])
  } else {
    // 已经有多个监听者， 那么直接往数组里push函数即可
    handler.push(fn)
  }
}
```

2.2 移除监听

我们会用`removeListener`函数移除监听函数，但是匿名函数是无法移除的

```js
removeListener(type, fn) {
  // 获取对应事件名称的函数清单
  const handler = this._events.get(type)
  // 如果是函数，说明只被监听了一次
  if (handler && typeof handler === 'function') {
    this._events.delete(type, fn)
  } else {
    let position
    // 如果handler是数组，说明被监听多次要找到对应的函数
    for (let i = 0; i < handler.length; i++) {
      if (handler[i] === fn) {
        position = i
      } else {
        position = -1
      }
    }
    // 如果找到匹配的函数，从数组中清除
    if (position !== -1) {
      // 找到数组对应的位置，直接清除此回调
      handler.splice(position, 1)
      // 如果清除后只有一个函数，那么取消数组，以函数形式保存
      if (handler.length === 1) {
        this._events.set(type, handler[0])
      }
    } else {
      return this
    }
  }
}
```

3.0 发现问题

我们已经基本完成了Event最重要的几个方法，也完成了升级改造。可以说一个Event的骨架已被开发好，但是还有几个不足和需要补充的

1. 鲁棒性不足：我们没有对参数进行充分的判断，没有完善的报错机制
2. 模拟不够充分，除了`removeAllListeners`这些方法没有实现以外，例如监听时间后会触发newListener事件，我们也没有实现，另外最开始的监听者上限我们也没有利用到

> “鲁棒性”是指控制系统在一定（结构，大小）的参数摄动下，维持其它某些性能的特性。也就是系统的健壮性，是在异常和危险情况下系统生存的关键。鲁棒控制方法适用于稳定性和可靠性作为首要目标的应用，同时过程的动态特性已知且不确定因素的变化范围可以预估。

---

最终参考 [event.js](https://github.com/Gozala/events/blob/master/events.js) 完整的Event实现

> [Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect) 是ES6新增内置对象，它提供拦截JS操作的方法。这些方法与处理器对象的方法相同。Reflect不是一个函数对象，因此它是不可构造的，其所有属性和方法都是静态的（类比Math的方法）

```js
// 开头是copyright 版权信息等 直接省略
'use strict';

// 定义R对象 如果支持es6用原生的Reflect，没就相当于提供polyfill
var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args)
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target))
  }
} else {
  RelectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
  }
}

// console.warn的封装
function processEmitWarning(warning) {
  if (console && console.warn) console.warn(warning)
}

// Number.isNaN 是es6加入的，后面是并联的兼容处理，Number类型 自身与自身不相等的只有NaN了
var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value
}

function EventEmitter() {
  EventEmitter.init.call(this)
}
// 将EventEmitter构造函数作为默认导出
module.exports = EventEmitter

// 向后兼容node 0.10.x 版本 看来这个库相当老了啊，不过也不妨碍我们学习
EventEmitter.EventEmitter = EventEmitter

EventEmitter.prototype._events = undefined
EventEmitter.prototype._eventsCount = 0
EventEmitter.prototype._maxListeners = undefined

// 默认情况下，如果超过10个侦听器，EventEmitters将会输出警告添加到它
// 这是一个有用的默认值，它有助于查找内存泄漏
var defaultMaxListeners = 10

// 这个API见得还是挺多了，EventEmitter.defaultMaxListeners 可以直接获取默认最大侦听器数，通过传参 可设置最大数
Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.')
    }
    defaultMaxListeners = arg
  }
})

// 构造类的静态方法
EventEmitter.init = function() {
  // 相当于constructor的构造函数调用 初始化
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null)
    this._eventsCount = 0
  }
  this._maxListeners = this._maxListeners || undefined
}

// 显然不是所有的Emitters侦听器都应该限制为10个。这个功能允许增加
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.')
  }
  this._maxListeners = n
  return this
}

// 给下面的 getMaxListeners方法用  EventEmitter原型方法里的 this指向实例对象
// 所以可从实例中 拿到 属性值 _maxListeners
function $getMaxListeners(that) {
  if (that._maxListeners === undefined) {
    return EventEmitter.defaultMaxListeners
  }
  return that._maxListeners
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this)
}

EventEmitter.prototype.emit = function emit(type) {
  var args = []
  // emit第一个参数一般是方法名，所以 从arguments[1]开始
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i])
  // 右边的表达式返回一个布尔值 ，type报错就为true。doError可理解为错误标记的flag
  var doError = (type === 'error')

  // 拿到 实例的 _events 对象
  var events = this._events
  if (events !== undefined) {
    doError = (doError && events.error === undefined)
    // 没有错就直接返回 false
  } else if (!doError) return false
  // 下面是错误处理
  if (doError) {
    var er
    if (args.length > 0) {
      er = args[0]
    }
    if (er instanceof Error) {
      //注意：“throw”这一行的注释是有意的，他们表示 如果这导致未处理的异常，则在Node的输出中输入。
      throw er
    }
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''))
    // 错误上下文为er 这里的er就是传进来的type的报错环境上下文
    err.context = er
    // 抛出错误
    throw err
  }

  // 从events里找type对应的函数 拿到 并赋给handler
  var handler = events[type]

  if (handler === undefined) return false

  if (typeof handler === 'function') {
    // 绑定上下文
    ReflectApply(handler, this, args)
  } else {
    // handler多次调用  把多个handler 放到数组里来处理
    var len = handler.length
    var listeners = arrayClone(handler, len)
    for (var i = 0; i < len; i++) {
      ReflectApply(listeners[i], this, args)
    }
  }
  return true
}

function _addListener(target, type, listener, prepend) {
  var m
  var events
  var existing

  // listener类型判断
  if (typeof listener !== 'undefined') {
    throw new TypeError('The "listener" argument must be of type Function. Received type' + typeof listener)
  } else {
    // 为了避免在 type === "newListener" 这种情况下递归
    // 在将其添加到侦听器之前，首先触发 "newListener"
    if (events.newListener !== undefined) {
      target.emit('newListener', type, listener.listener ? listener.listner : listener)
      // 重新分配 `events`，因为newListener处理程序可能导致了 this._events被分配给一个新的对象
      events = target._events
    }
    existing = events[type]
  }

  if (existing === undefined) {
    // 优化一个listener的情况。不需要额外的数组对象
    existing = events[type] = listener
    ++target._eventsCount
  } else {
    if (typeof exiting === 'function') {
      // 添加第二个元素，需要更改为数组
      existing = events[type] = prepend ? [listener, existing] : [existing, listener]
      //如果我们已经有了一个数组，只需追加
    } else if (prepend) {
      existing.unshift(listener)
    } else {
      existing.push(listener)
    }
    // 检查监听器泄漏
    m = $getMaxListeners(target)
    // m > 0 && (exiting.length > m && !existing.warned )
    if (m > 0 && exiting.length > m && !existing.warned) {
      existing.warned = true
      // 没有错误代码，因为它是一个warning
      var w = new Error(
        'Possible EventEmitter memory leak detected. ' +
        existing.length + ' ' + String(type) + ' listeners ' +
        'added. Use emitter.setMaxListeners() to ' +
        'increase limit'
      )
      w.name = 'MaxListenersExceededWarning'
      w.emitter = target
      w.type = type
      w.count = existing.length
      ProcessEmitWarning(w)
    }
  }
  return target
}
// 结合上面的函数，这是高阶函数的用法 普通地，我们一般会传 事件名和回调
// 这里返回 _addListner方法 第一个参数是 this 实例对象作为上下文环境
// 然后是 事件名，回调，prepend默认为false
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false)
}
// 同名方法 addListner 和用 on等效
EventEmitter.prototype.on = EventEmitter.prototype.addListener

// 和on的区别在于 prepend为true，当前已经是数组了才会这样用（不同我们来，已经封装在内部逻辑里了）
EvnetEmitter.prototype.prpendListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true)
}

function onceWrapper() {
  var args = []
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i])
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn)
    this.fired = true
    ReflectApply(this.listener,this.target, args)
  }
}

function _onceWrap(target, type, listener) {
  var state = {fired: false, wrapFn: undefined, target: target, type: type, listener: listener}
  var wrapped = onceWrapper.bind(state)
  wrapped.listener = listener
  state.wrapFn = wrapped
  return wrapped
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener)
  }
  this.on(type, _onceWrap(this, type, listener))
  return this
}

EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener)
  }
  this.prependListener(type, _onceWrap(this, type, listener))
  return this
}

EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener)
  }
  events = this._events
  if (events === undefined) return this

  list = events[type]
  if (list === undefined) return this

  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) {
      this._events = Object.create(null)
    } else {
      delete events[type]
      if (events.removeListener) {
        this.emit('removeListener', type, list.listner || listener)
      }
    }
  } else if (typeof list !== 'function') {
    position = -1

    for (i = list.length - 1; i >= 0; i--) {
      originalListener = list[i].listener
      position = i
      break
    }

    if (position < 0) return this

    if (position === 0) {
      list.shift()
    } else {
      sliceOne(list, position)
    }

    if (list.length === 1) {
      events[type] = list[0]
    }

    if (events.removeListener !== undefined) {
      this.emit('removeListener', type, originalListener || listener)
    }

    return this
  }
}

EventEmitter.prototype.off = EventEmitter.prototype.removeListener

EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i

  events = this._events
  if (events === undefined) return this

  // 不侦听removeListener，不需要触发emit
  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null)
      this._eventsCount = 0
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) {
        this._events = Object.create(null)
      } else {
        delete events[type]
      }
    }
    return this
  }

  // 为所有事件上的所有侦听器发出removeListener
  if (arguments.length === 0) {
    var keys = Object.keys(events)
    var key
    for (i = 0; i < keys.length; i++) {
      key = keys[i]
      if (key === 'removeListener') continue
      this.removeAllListeners[key]
    }
    this.removeAllListeners('removeListener')
    this._events = Object.create(null)
    this._eventsCount = 0
    return this
  }

  listeners = events[type]

  if (typeof listeners === 'function') {
    this.removeListener(type, listeners)
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i])
    }
  }
  return this
}

function _listeners(target, type, unwrap) {
  var events = target._events

  if (events === undefined) return []

  var evlistener = events[type]
  if (evlistener === undefined) return []

  if (typeof evlistener === 'function') {
    return unwrap ? [evlistener.listener || evlistener] : [evlistener]
  }

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length)
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true)
}

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false)
}

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type)
  } else {
    return listenerCount.call(emitter, type)
  }
}

EventEmitter.prototype.listenerCount = listenerCount
function listenerCount(type) {
  var events = this._events
  if (events !== undefined) {
    var evlistener = events[type]
    if (typeof evlistener === 'function') {
      return 1
    } else if (evlistener !== undefined) {
      return evlistener.length
    }
  }
  return 0
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : []
}

function arrayClone(arr, n) {
  var copy = new Array(n)
  for (var i = 0; i < n; i++) {
    copy[i] = arr[i]
  }
  return copy
}

function sliceOne(list, index) {
  for (; index + 1 < list.length; index++) {
    list[index] = list[index + 1]
  }
  list.pop()
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length)
  for (var i = 0; i < ret.length; i++) {
    ret[i] = arr[i].listener || arr[i]
  }
}
```
