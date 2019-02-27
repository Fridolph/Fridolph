## 浏览器的EventLoop

> 进程与线程

JS单线程。

进程：运行指令及加载和保存指令上下文所需的时间

线程：线程是更小单位，描述执行一段指令所需时间

---

### EventLoop 执行顺序

1. 执行同步代码 宏任务
2. 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
3. 执行所有微任务
4. 当执行完所有微任务，渲染页面
5. 开始下一轮EventLoop

当执行JS代码其实就是往执行栈放入函数，一旦执行栈为空，Event Loop就会从Task队列中拿出需要执行代码放入执行栈中执行，本质上说，JS的异步还是同步行为。

Call stacks - 调用栈等待响应 有就执行

EventLoop -> Task -> push Call Stacks

- MacroTask task Script、setTimeout、serInterval、setInterval、IO、UI rendering

- MicroTask jobs Promise、mutation observer、process.nextTick


## Node中的Event Loop

Node中的Eventloop和浏览器中的完全是不相同的东西。

Node的EventLoop分为**6**个阶段，它们会按照它反复执行。每当进入某一阶段时，都会从对应回调队列中取函数去执行。当队列为空或者执行回调数量达到系统限定的阈值，就会进入下一阶段


### 1. timer阶段

执行setTimeout、setInterval回调，是由poll阶段控制的。

同样，在Node中，定时器指定的时间也是不准确的，只是尽快执行。

### 2. I/O 阶段

处理上一循环中少数未执行的I/O回调

### 3. idle , prepare阶段

idle prepare阶段为内部实现 不怎么了解

### 4. poll阶段

1. 回到timer阶段执行回调
2. 执行IO回调

若该阶段没有了回调

- 若poll队列不为空，会遍历回调队列并同步执行，直到队列为空或到达系统限制
- 若poll队列为空
  - 有setImmediate回调执行，poll阶段会停止且进入check阶段执行回调
  - 没有setImmediate，会等待回调被加入到队列中并立即执行，这样同样有超时防止一直等待

若设定timer且poll队列为空，则会判断是否timer超时，如果有会回到timer阶段执行回调

### 5. check 阶段

check阶段，检查setImmediate

### 6. close callbacks 阶段

执行close事件
