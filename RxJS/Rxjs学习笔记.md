# RxJS

* RxJS是通过使用可观察序列来编写异步和基于事件的程序的库
* 核心类型 - Observable
* 周边类型 - Observer, Scheduler, Subject
* 操作符 - 受Array的map、filter、reduce、every...等方法启发

**把RxJS当成事件的Lodash**
将Observer模式与Iterator模式和函数式编程相结合，以满足管理事件序列的理想方法的需要

---

## 基本概念

* Observable 表示未来值或事件的可调用集合的思想
理解：一个可进不出的管道

* Observer 回调函数的集合，这些回调函数知道如何监听Observable传递的值

* Subscription 表示Observable的执行，主要用于取消回调

* Subject 等同于EventEmitter, 向多个Observer广播数值或者事件的唯一方法
理解：类比… 一个有进有出的管道，接受Observable传递进来的数据，然后再把这些数据复制N份再分发给Observer

* Operator 纯函数, 用于实现函数式编程风格，使用map、filter、concat、flatMap...等操作来处理集合
理解：工具

* Scheduler 控制并发的集中式调试程序，允许我们当运算在setTimeout或requestAnimationFrame等发生时进行
协调
理解：调度器，运行可快可慢

### Observable剖析

创建Observable
Rx.Observable.create 创建操作符（静态方法） of, from, intarval ...

Subscribing to Observables
类似于调用一个函数，提供回调处理传递的数据

Executing the Observable
仅当一个Observable被订阅时才运行的惰性计算
next*(error|complete)?

Disposing Observables
unsubscribe