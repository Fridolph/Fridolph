# 前端中间件机制是什么设计模式？如何实现？

## 核心回答

中间件本质上是**责任链模式**。请求沿着处理器链传递，每个处理器决定：处理、传递（调用 next）或终止。

```ts
// Koa 洋葱模型核心 — 仅 20 行
type Next = () => Promise<void>
type Middleware = (ctx: any, next: Next) => Promise<void>

function compose(middlewares: Middleware[]) {
  return async (ctx: any) => {
    let index = -1
    const dispatch = async (i: number): Promise<void> => {
      if (i <= index) throw new Error('next() called multiple times')
      index = i
      const fn = middlewares[i]
      if (fn) await fn(ctx, () => dispatch(i + 1))
    }
    await dispatch(0)
  }
}

// 使用
const app = compose([
  async (ctx, next) => { console.log('1 start'); await next(); console.log('1 end') },
  async (ctx, next) => { console.log('2 start'); await next(); console.log('2 end') },
  async (ctx, next) => { console.log('3 start'); await next(); console.log('3 end') },
])
app({})
// 输出: 1 start → 2 start → 3 start → 3 end → 2 end → 1 end (洋葱)
```

**为什么好**：
- 请求/响应的前置后置处理**线性化**，逻辑清晰
- 每个 middleware **只做一件事**（日志/鉴权/压缩/缓存），职责单一
- 中间件可以**任意组合排序**，灵活度极高

**前端应用**：Express/Koa 中间件、Axios 拦截器、Webpack Loader 链、Vue Router 守卫。

> 来源：[Koa — compose](https://github.com/koajs/compose)
