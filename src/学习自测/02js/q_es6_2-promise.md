# Promise

知识回顾

- [Promise 设计](../../概念与原理/02js/s_promise_1-design.md)
- [Promise 基础](../../概念与原理/02js/s_promise_2-base.md)

## Promise 基础

::: details

- Promise 是异步编程的一种解决方案，比传统的解决方案使用回调函数和事件更合理和更强大
- 它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了 Promise 对象
- 有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数
- 此外，Promise 对象提供统一的接口，使得控制异步操作更加容易。

:::

### Promise.then 在 Event Loop 中的执行顺序

> 后面补充题目，知道考点是什么就够了

### Promise 存在哪些缺点，如何解决

::: details

1. 无法取消 Promise，一旦新建它就会立即执行，无法中途取消
2. 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部
3. 吞掉错误或异常，错误只能顺序处理，即便在 Promise 链最后添加 catch 方法，依然可能存在无法捕捉的错误（catch 内部可能会出现错误）
4. 阅读代码不是一眼可以看懂，你只会看到一堆 then，必须自己在 then 的回调函数里面理清逻辑

> 引出 async / await 通过 try catch 捕获错误

:::

### 如何停止一个 Promise 链

::: details

在要停止的 promise 链位置添加一个方法，返回一个永远不执行 resolve 或者 reject 的 Promise，那么这个 promise 永远处于 pending 状态，所以永远也不会向下执行 then 或 catch 了。这样我们就停止了一个 promise 链。

```js
Promise.cancel = Promise.stop = function () {
  return new Promise(function () {})
}
```

:::

### Promise 链上返回的最后一个 Promise 出错了怎么办

::: details
catch 在 promise 链式调用的末尾调用，用于捕获链条中的错误信息，但是 catch 方法内部也可能出现错误，所以有些 promise 实现中增加了一个方法 done，done 相当于提供了一个不会出错的 catch 方法，并且不再返回一个 promise，一般用来结束一个 promise 链。

```js
done() {
   this.catch(reason => {
     console.log('done', reason);
     throw reason;
   });
}
```

:::

## 如何用 Promise 控制并发

- Promise.all() 但有缺点，一个错误就返回了，不会执行后面的 then 方法
- Promise.allSettled() 控制并发，在你有多个不依赖于彼此成功完成的异步任务时，或者你总是想知道每个 promise 的结果。但也有缺点，无法控制顺序
- 封装一个 Promise 并发函数

::: details

- 明确概念

- `并发`：并发是多个任务同时交替的执行（因为 cpu 执行指令的速度非常之快，它可以不必按顺序一段代码一段代码的执行，这样效率反而更加低下），这样看起来就是一起执行的，所以叫并发。
- `并行`：可以理解为多个物理 cpu 或者有分布式系统，是真正的'同时'执行
- `并发控制`：意思是多个并发的任务，一旦有任务完成，就立刻开启下一个任务
- `切片控制`：将并发任务切片的分配出来，比如 10 个任务，切成 2 个片，每片有 5 个任务，当前一片的任务执行完毕，再开始下一个片的任务，这样明显效率没并发控制那么高了

- 思路

首先执行能执行的并发任务，根据并发的概念，每个任务执行完毕后，捞起下一个要执行的任务。
将关键步骤拆分出合适的函数来组织代码

1. 循环去启动能执行的任务
2. 取出任务并且推到执行器执行
3. 执行器内更新当前的并发数，并且触发捞起任务
4. 捞起任务里面可以触发最终的回调函数和调起执行器继续执行任务

- 具体实现

[Promise 控制并发请求](../../编码与实践/02js/c_promise_2-concurrent/c_promise_2-concurrent.md)

:::


## 参考

- [听说你会 Promise？ 那么如何控制请求并发数呢](https://juejin.cn/post/7219961144584552504)——JetTsang
