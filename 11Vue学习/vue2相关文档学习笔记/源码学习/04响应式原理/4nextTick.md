# nextTick

nextTick 是Vue的一个核心实现，在介绍Vue的nextTick之前，为便于理解，先介绍一下JS的运行机制

## JS运行机制

JS执行是单线程的，它是基于事件循环的。事件循环大致分为以下几个步骤：

1. 所有同步任务都在主线程上执行，形成一个执行栈 execution context stack
2. 主线程之外，还存在一个任务队列。只要异步任务有了结果，就在任务队列之中放置一个事件
3. 一旦执行栈中所有的同步任务执行完毕，系统就会读取任务队列，看看里面有哪些事件。那些对应的异步任务，就是结束等待状态，进入执行栈，开始执行
4. 主线程不断重复上面的第三步

![JS运行机制](https://ustbhuangyi.github.io/vue-analysis/assets/event-loop.png)

主线程的执行过程就是一个tick，而所有的异步结果都是通过任务队列来调度和被调度。消息队列中存在的是一个个的任务task。规范中规定task分为两大类，分别是macro task和micro task，并且在macro task结束后，都要清空所有的micro task.

- 在浏览器中，常见的macro task有setTimeout、messageChannel、postMessage、setImmediate；
- 常见的micro task有 MutationObserver 和 Promise.then

## Vue的实现

在 Vue 源码 2.5+ 后，nextTick 的实现单独有一个 JS 文件来维护它，它的源码并不多，总共也就 100 多行。接下来我们来看一下它的实现，在 src/core/util/next-tick.js 中：

```ts
import {noop} from 'shared/util'
import {handleError} from './error'
import { isIOS, isNative } from './env'

const callbacks = []
let pending = false

function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

let microTimerFunc
let macroTimerFunc
let useMacroTask = false

if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} else {
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  microTimerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
} else {
  microTimerFunc = macroTimerFunc
}

export function withMacroTask(fn: Function): Function {
  return fn._withTask || (fn._withTask = function() {
    useMacroTask = true
    const res = fn.apply(null, arguments)
    useMacroTask = false
    return res
  })
}

export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })

  if (!pending) {
    pending = true
    if (useMacroTask) {
      macroTimerFunc()
    } else {
      MicroTimerFunc()
    }
  }

  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```

next-tick.js 申明了 microTimerFunc 和 macroTimerFunc 2 个变量，它们分别对应的是 micro task 的函数和 macro task 的函数。对于 macro task 的实现，优先检测是否支持原生 setImmediate，这是一个高版本 IE 和 Edge 才支持的特性，不支持的话再去检测是否支持原生的 MessageChannel，如果也不支持的话就会降级为 setTimeout 0；而对于 micro task 的实现，则检测浏览器是否原生支持 Promise，不支持的话直接指向 macro task 的实现。

next-tick.js 对外暴露了 2 个函数，先来看 nextTick，这就是我们在上一节执行 nextTick(flushSchedulerQueue) 所用到的函数。它的逻辑也很简单，把传入的回调函数 cb 压入 callbacks 数组，最后一次性地根据 useMacroTask 条件执行 macroTimerFunc 或者是 microTimerFunc，而它们都会在下一个 tick 执行 flushCallbacks，flushCallbacks 的逻辑非常简单，对 callbacks 遍历，然后执行相应的回调函数。

这里使用 callbacks 而不是直接在 nextTick 中执行回调函数的原因是保证在同一个 tick 内多次执行 nextTick，不会开启多个异步任务，而把这些异步任务都压成一个同步任务，在下一个 tick 执行完毕。

nextTick 函数最后还有一段逻辑：

```js
 if (!cb && typeof Promise !== 'undefined') {
  return new Promise(resolve => {
    _resolve = resolve
  })
}
```

这是当 nextTick 不传 cb 参数的时候，提供一个 Promise 化的调用，比如：

    nextTick().then(() => {})

当 _resolve 函数执行，就会跳到 then 的逻辑中。

next-tick.js 还对外暴露了 withMacroTask 函数，它是对函数做一层包装，确保函数执行过程中对数据任意的修改，触发变化执行 nextTick 的时候强制走 macroTimerFunc。比如对于一些 DOM 交互事件，如 v-on 绑定的事件回调函数的处理，会强制走 macro task。

## 总结

通过这一节对 nextTick 的分析，并结合上一节的 setter 分析，我们了解到数据的变化到 DOM 的重新渲染是一个异步过程，发生在下一个 tick。这就是我们平时在开发的过程中，比如从服务端接口去获取数据的时候，数据做了修改，如果我们的某些方法去依赖了数据修改后的 DOM 变化，我们就必须在 nextTick 后执行。比如下面的伪代码：

```js
getData(res).then(()=>{
  this.xxx = res.data
  this.$nextTick(() => {
    // 这里我们可以获取变化后的 DOM
  })
})
```

Vue.js 提供了 2 种调用 nextTick 的方式，一种是全局 API Vue.nextTick，一种是实例上的方法 vm.$nextTick，无论我们使用哪一种，最后都是调用 next-tick.js 中实现的 nextTick 方法。

- nextTick 是把要执行的任务推入到一个队列中，在下一个tick同步执行
- 数据改变后触发渲染watcher的update，但是watchers的flush是在nextTick后，所以重新渲染是异步的
