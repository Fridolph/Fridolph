# 事件循环 Event Loop

[概念与原理 - 事件循环](../../概念与原理/12broswer/s_bw_2-eventloop.md)

## 能说下 JavaScript 的事件循环机制吗

- JavaScript 是单线程运行的
- 异步要基于回调来实现
- Event Loop 就是异步回调的实现原理
  
:::details 具体实现过程如下：

- 将 document 下 script 标签中的所有同步代码都放入`执行栈，立即执行`
- 执行过程中如果产出新的 宏任务 / 微任务，就将他们`推入相应的任务队列`
- 等`执行栈没有代码`可以执行之后再`执行微任务队列`
- 微任务队列都执行完以后，又开始执行宏任务队列（执行微任务队列）
如此循环，不断重复的过程就叫做 `Event Loop`（事件循环）

   :::

## 微任务和宏任务的异同

:::details 提示

- 微任务和宏任务`都属于异步任务`
- 主要区别在于`执行顺序不同`
   :::

## 宏任务有哪些

:::details 提示

- setTimeout 和 setInterval 的回调函数
- DOM 事件
- XMLHttpRequest 中的 readystatechange 事件
- requestAnimationFrame 中的回调函数
- I/O 操作和网络请求的回调函数
- Node.js 中的文件读写操作的回调函数
- Node.js 中的进程事件
  :::

## 微任务有哪些

:::details 提示

- `Promise` 的回调函数（then、catch、finally）
- `MutationObserver` 监听函数
- `process.nextTick` 回调函数
- ~~Object.observe~~ 已废弃
  :::

## 微任务和宏任务的执行顺序

直接看题

```js
console.log('1')

setTimeout(() => {
  // a
  console.log('2')
  setTimeout(() => console.log('3'))
  new Promise(resolve => {
    console.log('4')
    resolve()
  }).then(() => {
    console.log('5')
  })
})

new Promise(resolve => {
  console.log('6')
  resolve()
})
  .then(() => {
    // b
    console.log('7')
  })
  .then(() => {
    // c
    console.log('8')
  })

console.log('9')

setTimeout(() => {
  // d
  console.log('10')

  new Promise(resolve => {
    console.log('11')
    resolve()
  })
    .then(() => {
      setTimeout(() => console.log('12'))
    })
    .then(() => {
      console.log('13')
    })
})
```

:::details 流程图提示
<Image src="/02js/micro_macro.png" alt="图示" :inline="false"/>
:::

:::details 答案
控制台依次打印：<br>
1 6 9 第一轮 macro task <br>
7 8 第一轮剩余 micro task <br>
2 第二轮 macro task <br>
4 5 第二轮 micro task <br>
10 11 第三轮 macro task <br>
13 第三轮 micro task <br>
3 第四轮 macro task <br>
12 第五轮 macro task
:::

## 参考

- [Event Loop，一次性弄懂它](https://juejin.cn/post/7229372047414902839)