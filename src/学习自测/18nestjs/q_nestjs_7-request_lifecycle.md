# NestJS 请求生命周期

> 以下以常规 HTTP Controller 请求为例。服务如何启动和关闭，见[应用生命周期](./q_nestjs_6-app_lifecycle)。

## 1. 客户端发起请求后，NestJS 的完整处理流程是什么？

::: details 参考回答

一次正常的 HTTP 请求，会先经过 Middleware，再到 Guard，然后进入 Interceptor，接着由 Pipe 转换和校验参数，再执行 Controller，按需调用 Service 处理业务。处理完成后，经过 Interceptor 的返回阶段，最后发送响应。

这里 Middleware 处理通用请求信息，Guard 判断能不能访问，Pipe 负责参数转换和校验，Controller 协调业务调用。Interceptor 会环绕后续执行，适合做耗时统计和响应转换。多个拦截器进入时从外到内，返回时从内到外。

如果中间出现未被捕获的异常，就进入异常处理分支，由匹配的 Exception Filter 或 Nest 默认异常处理机制返回错误响应。成功请求不会经过 Filter。

:::

**回答节奏**：先按顺序说出正常链路，再补充职责和异常分支，控制在一到两分钟。

**追问入口**：Interceptor 能捕获 Guard 的异常吗？多个拦截器的执行顺序是什么？

## 正常请求流程

```text
客户端发送 HTTP 请求
    ↓
Middleware
    ↓
Guard
    ↓
Interceptor：进入阶段
    ↓
Pipe
    ↓
Controller 处理方法
    ↓
按需调用 Service、数据库等
    ↓
Interceptor：返回阶段
    ↓
发送 HTTP 响应
    ↓
客户端收到响应
```

这是后续处理被正常放行时的主线。Middleware 可以提前返回响应，Interceptor 也可以直接返回缓存等结果，让请求跳过后续业务处理。

**Service 是常见的业务分层，不是框架强制规定的生命周期步骤。** Controller 可以调用 Service，也可以直接返回结果。

## 各阶段负责什么？

| 阶段 | 核心职责 | 例子 |
| --- | --- | --- |
| Middleware | 处理通用请求信息 | requestId、请求上下文 |
| Guard | 判断是否允许进入处理器 | 认证、接口权限检查 |
| Interceptor：进入 | 环绕后续执行，添加前置逻辑 | 开始计时 |
| Pipe | 转换和校验处理器参数 | `ParseIntPipe`、DTO 校验 |
| Controller | 接收参数、协调业务调用 | 调用笔记保存服务 |
| Service（按需调用） | 执行业务规则与数据操作 | 检查归属、条件更新 |
| Interceptor：返回 | 转换结果、观测完成或错误 | 统一响应结构、记录耗时 |

这里是常见职责划分。例如依赖具体业务数据的资源归属检查，也可以放在 Service 中，不必全部写在 Guard。

## 多个组件如何排序？

### Guard：从外到内

```text
全局 Guard → Controller 级 Guard → 路由方法级 Guard
```

同一层级通常按绑定顺序执行。某个 Guard 拒绝后，后续正常处理链不再执行。

### Interceptor：进入从外到内，返回从内到外

```text
进入：全局 → Controller 级 → 方法级
返回：方法级 → Controller 级 → 全局
```

这是“洋葱式”执行，同一层级的多个拦截器也按嵌套顺序进入、反向返回。

**Interceptor 环绕的后续处理包括 Pipe 和 Controller，而不只是 Controller 方法本身。** 其中的“返回阶段”也不等于响应已经发给客户端，而是在响应发送前处理结果。

### Pipe：从外到内，再到具体参数

```text
全局 Pipe → Controller 级 Pipe → 方法级 Pipe → 参数级 Pipe
```

这表示作用域上的处理顺序；同一参数上的多个 Pipe 按绑定顺序执行。不要据此假设多个参数的解析一定按代码中从左到右串行执行，也不要依赖跨参数 Pipe 的副作用顺序。

### Middleware：按注册和模块绑定顺序

全局注册的 Middleware 先执行，再执行模块中绑定的 Middleware；具体顺序还取决于注册、模块导入和路由绑定，不能直接套用 Guard 的全局、Controller、方法三级顺序。

## 异常是分支，不是正常链路的最后一步

```text
处理过程中发生异常
    ↓
当前执行链是否捕获并处理？
    ├─ 是 → 按处理后的结果继续或结束
    └─ 否 → 匹配的 Exception Filter 或 Nest 默认异常处理
                ↓
            返回错误响应
```

- **Guard 返回 `false`**：通常产生 403，不进入后面的 Interceptor、Pipe、Controller；Guard 也可以主动抛出其他异常。
- **Pipe 校验失败**：通常产生 400，不执行 Controller；具体状态码取决于 Pipe 的实现和配置。
- **Service 抛出异常**：可能先被 Interceptor 的错误处理捕获；未处理时，再交给异常过滤器。

**Guard 在 Interceptor 之前执行，所以后面的 Interceptor 无法捕获 Guard 抛出的异常。** Pipe 和 Controller 则在拦截器包裹的执行链内，异常可以通过 RxJS 的 `catchError` 等方式处理。

Exception Filter 通常按更具体的作用域优先匹配：

```text
方法级 → Controller 级 → 全局
```

匹配的 Filter 处理异常后，不会像拦截器那样继续逐层向外传递。没有自定义 Filter 时，Nest 也有默认异常处理机制，**成功请求不需要经过 Exception Filter**。

## 学习场景：保存一篇笔记

假设后续使用 NestJS + PostgreSQL 实现笔记保存接口：

```text
客户端提交笔记
    ↓
Middleware 建立 requestId
    ↓
Guard 检查登录身份
    ↓
Interceptor 开始计时
    ↓
Pipe 校验 DTO
    ↓
Controller 调用保存服务
    ↓
Service 检查归属、执行版本条件更新
    ↓
Interceptor 转换返回结果、记录耗时
    ↓
客户端收到响应
```

如果版本条件不匹配，Service 可以抛出 `ConflictException`；未被其他逻辑处理时，由异常处理机制返回 409 响应。

## 记忆主线

**中间件 → 守卫 → 拦截器进入 → 管道 → 业务处理 → 拦截器返回；未处理异常走过滤器分支。**

继续复习：[中间件与守卫](/概念与原理/18nestjs/s_nestjs_5-middleware_guard)、[拦截器与管道](/概念与原理/18nestjs/s_nestjs_6-interceptor_pipe)、[异常过滤器](/概念与原理/18nestjs/s_nestjs_7-exception_filter)。

> 来源：[NestJS 官方文档：Request lifecycle](https://docs.nestjs.com/faq/request-lifecycle)

> 来源：[NestJS 官方文档：Interceptors](https://docs.nestjs.com/interceptors)
