# Promise、Generator 与异步控制自测

## 1. Promise 的状态与执行顺序？

**参考回答：** Promise 有 pending、fulfilled、rejected 三种状态，状态确定后不能再改变。executor 在构造时同步运行，then / catch 的响应异步进入微任务。resolve 接受另一个 Promise / thenable 时会采用它的结果，所以调用 resolve 不一定立刻变为 fulfilled。

**追问：** 为什么用 setTimeout 写的简易 Promise 不能完全模拟原生微任务顺序？Promise 只是表达结果，本身不会把同步重计算搬到后台。

## 2. 为什么 then 会返回新 Promise？

**参考回答：** 链式调用需要将回调返回值、抛出的异常或返回的异步结果传给下一环。忘记 return 内部 Promise，会让外层提前完成并丢失错误传播；catch 处理后正常返回，会将链转成成功结果。

```js
Promise.resolve(1)
  .then(value => { throw new Error(String(value)) })
  .catch(() => 2)
  .then(console.log) // 2
```

**追问：** finally 的返回值通常不替换原值，但它抛错或返回 rejected Promise 时会怎样？

## 3. Promise.all、allSettled、race、any 怎样选择？

**参考回答：** all 需要全部成功，任一失败会使聚合结果失败；allSettled 收集每项成功或失败；race 采用最先 settled 的结果；any 等待首个成功，全部失败时抛 AggregateError。它们一般不自动取消其他任务，输出顺序与完成顺序也要区分。

**追问：** all 的快速失败后，已经发出去的写请求是否停止？空输入下这四种方法各有什么行为？

## 4. async / await 让代码串行了吗？

**参考回答：** async 函数返回 Promise，执行会同步进行到 await 挂起点，再在等待结果后恢复。依次 await 会建立依赖顺序，互不依赖的任务可以先启动再一起等待；但并发要考虑上限、资源竞争和错误处理，不能无限 Promise.all。

```js
async function example() {
  console.log('B')
  await 0
  console.log('D')
}
console.log('A')
example()
console.log('C') // 浏览器中依次 A B C D
```

**追问：** await 并不等于阻塞整个线程；但是 await 前的大循环为什么仍会卡页面？

## 5. Generator 与 async 的关系？

**参考回答：** Generator 通过 yield 暂停，调用方用 next / throw / return 驱动迭代，本身不等于异步。早期可用执行器驱动 yield 出来的 Promise 组织异步流程；async / await 由语言提供相应的异步控制语义。async generator 则结合异步迭代，不要与普通 generator 混为一谈。

**追问：** yield 表达式的值从哪里来？调用 next(value) 与迭代返回的 value 分别表示什么？

## 6. 防抖、节流与请求竞态怎么区分？

**参考回答：** 防抖等待一段安静时间再执行，节流限制频率；还要约定 leading / trailing、this、参数与取消行为。它们不能替代服务端幂等，也不能自动解决“后发请求先返回”。搜索类场景还需要 AbortController 或序号校验，只采用最新结果。

**追问：** 页面销毁后如何清理尾部计时器？取消 fetch 后，服务端写操作会不会已经执行？

## 7. 怎样解释 Node 与浏览器事件循环差异？

**参考回答：** 浏览器围绕任务、微任务检查点和渲染机会组织执行；Node 还涉及 I/O 阶段、process.nextTick 等机制。现代 Node 的微任务处理与早期版本不同，Node 20 起相关 libuv 定时器阶段也有调整；顶层 CommonJS 和 ESM 上下文还可能影响观察顺序。要说明运行环境，不背“nextTick 永远最先”或“setImmediate 永远先于 setTimeout”。

**验证任务：** 把同一个顺序实验分别存成 .cjs、.mjs，在当前 Node 运行，记录版本和回调所在上下文。

> 来源：[个人 interviewMap / JS必知点](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/interviewMap/JS必知点)；[MDN Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)；[Node 事件循环说明](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)。
