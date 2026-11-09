# 从 NestJS 理解 OOP、FP、FRP 与 AOP

> 这些是组织代码、处理变化的不同思路，不是四选一。可以用 OOP 组织服务，用纯函数计算规则，用 RxJS 组合事件流，再用 AOP 思路统一记录耗时。

## 先区分关注点

| 概念 | 全称 | 主要关注什么 | NestJS / Web 开发中的例子 |
| --- | --- | --- | --- |
| OOP | Object-Oriented Programming，面向对象编程 | 对象的状态、行为与协作 | Service、可替换的 Repository |
| FP | Functional Programming，函数式编程 | 用函数组合表达计算，控制副作用 | 独立的价格计算、数据转换函数 |
| FRP | Functional Reactive Programming，函数式响应式编程 | 用函数式方式描述随时间变化的值与事件 | 结合 RxJS 学习搜索、事件流与异步组合 |
| AOP | Aspect-Oriented Programming，面向切面编程 | 从业务中分离横切关注点 | Interceptor 统一统计耗时、转换响应 |

## OOP：把状态和行为组织起来

OOP 会把业务中的概念抽象为对象，让相关状态和操作集中在一起。对象不一定对应现实中的实体，也可以是策略、服务或连接池。

- **抽象**：只暴露调用者关心的能力，例如 `save()`，隐藏如何连接数据库。
- **封装**：通过明确的接口维护内部状态和规则，而不是让外部任意修改。
- **继承**：复用或扩展已有行为，需要满足“子类可以替代父类”的约束。
- **多态**：调用同一抽象接口，可以使用不同实现，例如 PostgreSQL 仓储与测试仓储。

```ts
interface NoteStore {
  save(title: string): Promise<void>
}

class NotesService {
  constructor(private readonly store: NoteStore) {}

  async create(title: string) {
    const normalized = title.trim()
    if (!normalized) throw new Error('标题不能为空')
    await this.store.save(normalized)
  }
}
```

这个例子通过构造函数接收依赖，测试时可以传入内存实现。**依赖注入不必依靠框架才能实现**；NestJS 容器负责进一步管理注册、解析和实例生命周期。这里的接口在运行时会被擦除，在 Nest 中需要配合显式 Token，见[提供者与 DI](../18nestjs/s_nestjs_4-provider)。

封装有助于维护边界，但不自动等于高内聚、低耦合。只有一个巨大 Service，或层层继承，也可能很难维护。需要复用独立能力时，通常优先考虑组合，而不是为了复用强行建立继承关系。

## FP：把可计算的规则写成纯函数

纯函数有两个关键特点：相同输入得到相同输出；不会产生可观察的副作用，比如修改外部变量、写数据库或发送请求。

```ts
type Note = Readonly<{ title: string; content: string }>

function summarize(note: Note): string {
  return `${note.title.trim()}：${note.content.slice(0, 40)}`
}
```

它只依赖传入的数据，不读取全局配置，也不修改原对象，测试时只需比较输入和输出。`Readonly` 是 TypeScript 的编译期约束，不等于运行时深度冻结。

**引用透明**指表达式可以被它的计算结果替换，而不改变程序行为；核心价值是便于推理、组合和测试，并不是“对 IDE 友好”。读取当前时间、随机数或可变全局状态，即使没有写操作，也可能破坏引用透明。

函数式编程还强调高阶函数、组合与不可变数据，并不要求整个应用没有副作用。实际服务端应用可以采用“纯函数计算规则，Service 协调数据库与网络调用”的方式，把副作用控制在明确的边界。

## FRP 与 RxJS：把随时间发生的事件组合起来

搜索输入、按钮点击、定时器和网络响应都可以被理解为事件流。响应式编程不仅用于异步网络请求，也适合描述同步事件之间的关系。

严格意义的 FRP 还包含随时间变化的行为等概念。**RxJS 更准确地说是响应式流编程库，使用函数式操作符组合 Observable；不能把任何 RxJS 代码都等同于严格的 FRP。**

下面是需要安装 RxJS 的浏览器示意代码，`input` 为已有输入框：

```ts
import { debounceTime, distinctUntilChanged, fromEvent, map, switchMap } from 'rxjs'
import { ajax } from 'rxjs/ajax'

const subscription = fromEvent<InputEvent>(input, 'input').pipe(
  map(() => input.value.trim()),
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(keyword => ajax.getJSON(`/api/search?q=${encodeURIComponent(keyword)}`)),
).subscribe({
  next: results => console.log(results),
  error: error => console.error('搜索流出错', error),
})

// 页面或组件销毁时清理长期订阅
subscription.unsubscribe()
```

示例展示数据流与清理位置；实际清理应放在销毁回调中，不能订阅后立即取消。生产代码还应明确错误恢复策略：示例中的错误会终止整条订阅，若希望下一次输入仍能搜索，可以在 `switchMap` 的内部流中用 `catchError` 恢复。

需要能解释的边界：

- `Observable` 不保证异步；冷流通常在订阅时启动生产，热流可以在订阅前就已产生事件。
- `switchMap` 在新事件到来时取消旧的内部订阅。底层操作是否真正停止，取决于它是否实现取消；这不等于撤销已经提交的服务端数据库操作。
- 长期流需要管理订阅生命周期。NestJS Controller 返回的 Observable 通常由框架订阅，但自己创建的后台订阅仍需清理。
- 简单的一次数据库读写使用 `async/await` 就足够；事件组合、取消和流转换复杂时再考虑 RxJS。

进一步阅读：[观察者模式](./s_pn_10-observer)、[发布订阅模式](./s_pn_11-pubsub)。它们与响应式编程有关，但不等同于完整的流组合方案。

## AOP：把跨业务的通用逻辑集中处理

多个接口都需要日志、耗时统计和响应转换，如果逐个写在业务方法中，就会出现重复与遗漏。AOP 的思路是把这些**横切关注点**抽离，在约定的执行位置统一应用。

NestJS 的 Interceptor 是典型例子。下面是可注册到全局、Controller 或方法上的示意实现：

```ts
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable, finalize } from 'rxjs'

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TimingInterceptor.name)

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const startedAt = performance.now()
    const handler = `${context.getClass().name}.${context.getHandler().name}`

    return next.handle().pipe(
      finalize(() => {
        this.logger.log(`${handler}: ${Math.round(performance.now() - startedAt)}ms`)
      }),
    )
  }
}
```

`finalize` 在流完成、报错或取消订阅时执行，比只观察成功值的 `tap(next)` 覆盖更多结束情况。不过，这里测量的是拦截器包裹的处理时间，不是客户端端到端耗时，也不代表响应字节已经全部发送。

Interceptor 环绕后续 Pipe 和处理器，进入顺序为全局 → Controller → 方法，返回时反向。它无法捕获在它之前执行的 Guard 抛出的异常。Guard、Pipe 等机制也帮助分离通用逻辑，但有各自明确职责，不能随意互换。完整顺序见[请求生命周期](/学习自测/18nestjs/q_nestjs_7-request_lifecycle)。

AOP 不等于装饰器：装饰器可以声明元数据，也可以配合框架建立切入规则；仅写一个装饰器并不自动产生完整的切面机制。

## 口述回顾与继续自测

> OOP 主要组织对象的状态和行为，FP 主要通过函数组合表达计算，并控制副作用；FRP 关注随时间变化的数据与事件，可以结合 RxJS 理解流组合；AOP 则把日志、耗时统计这些跨业务逻辑统一抽离。它们可以一起使用，比如 Nest 用类和 DI 组织业务，用纯函数处理规则，再用拦截器统一统计耗时。

继续追问时，尝试回答：为什么组合有时比继承更合适？纯函数怎样读取时间？取消 RxJS 订阅能否取消数据库写入？拦截器为什么接不到 Guard 的错误？

> 来源：[MDN：面向对象编程](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object-oriented_programming)、[RxJS：Observable](https://rxjs.dev/guide/observable)、[RxJS：Subscription](https://rxjs.dev/guide/subscription)、[NestJS：Interceptors](https://docs.nestjs.com/interceptors)、[NestJS：Request lifecycle](https://docs.nestjs.com/faq/request-lifecycle)
