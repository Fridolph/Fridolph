## Event Loop

JS是单线程。JS在执行过程中会产生执行环境，这些执行环境会被顺序加入到执行栈中。如果遇到异步代码，会被挂起并加入到Task队列中。一旦执行栈为空，Event Loop就会从Task队列中拿出需要执行的代码并放入执行栈中执行，所以本质上来说JS中的异步还是同步行为。

不同的任务源会被分配到不同的Task队列中，任务源可以分为微任务Microtask和宏任务Macrotask。在ES6规范中，microtask称为jobs，macrotask称为task

微任务包括:

* process.nextTick
* Promise
* Object.observe
* MutationObserver

宏任务包括：

* script
* setTimeout
* setInterval
* setImmediate
* I/O
* UI rendering

有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了script，浏览器会先执行一个宏任务，接下来有异步代码的话先执行微任务。

所以正确的一次Event Loop的顺序是这样的：

1. 执行同步代码，属性宏任务
2. 执行栈为空，查询是否有微任务需要执行
3. 执行所有微任务
4. 必要的话渲染UI
5. 然后开始下一轮Event Loop，执行宏任务中的异步代码

通过上述的Event Loop顺序可知，如果宏任务的异步代码有大量的计算并且需要操作DOM的话，为了更快的界面响应，我们可以把操作DOM放入微任务中。

---

## Node中的Event Loop

```bash
┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<──connections───     │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
```

* timer

timers阶段会执行setTimeout和setInterval

一个timer指定的时间并不是准确时间，而是在达到这个时间后尽快执行回调，可能会因为系统正在执行别的事务而延迟。 下限的时间有一个范围：[1, 2147483647]，如果设定的时间不在这个范围，将被设置为1.

* I/O

I/O阶段会执行 （除了close事件、定时器和setImmediate的）回调

* idle, prepare

idle, prepare阶段内部实现

* poll

poll阶段很重要，在这一阶段中，系统会做两件事：

1. 执行到点的定时器
2. 执行poll队列中的事件

并且当poll中没有定时器的情况下，会发现以下两件事：

a. 如果poll队列不为空，会遍历回调队列并同步执行，直到队列为空或者系统限制
b. 如果poll队列为空，会有两件事发生
  b1. 如果有setImmediate需要执行，poll阶段会停止并且进入到check阶段执行setImmediate
  b2. 如果没有setImmediate需要执行，会等待回调被加入到队列中并立即执行回调

* check

check阶段执行setImmediate

* close callbacks

close callbacks阶段执行close事件，且在node中，有些情况下定时器执行顺序是随机的：

```js
setTimeout(() => console.log('setTimeout'), 0)
setImmediate(() => console.log('setImmediate'))
// 这里谁都有可能先输出，这取决于性能
// 因为可能进入Event Loop用了不到1ms，这时执行setImmediate否则执行setTimeout
```

下面这种情况下，执行顺序是相同的：

```js
var fs = require('fs')
fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0)
  setImmediate(() => console.log('immediate'))
})
// 因为readFile的回调在poll中执行
// 发现有setImmediate所以会立即跳到check阶段执行回调
// 再去timer阶段执行setTimeout
// 所以输出上一定是 setImmediate, setTimeout
```

---

上面介绍的都是macrotask的执行情况，microtask会在以上每个阶段完成后立即执行

```js
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(() => {
    console.log('promise1')
  })
}, 0)

setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0)
// 以上代码在浏览器和ndoe中打印情况是不同的
// 浏览器中一定是 timer1 promise1 timer2 promise2
// node中可能是 timer1 timer2 promise1 promise2
```

Node中的`process.nextTick`会先于其他microtask执行

```js
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(() => {
    console.log('promise1')
  })
}, 0)

process.nextTick(() => {
  console.log('nextTick')
})
// nextTick timer1 promise1
```
