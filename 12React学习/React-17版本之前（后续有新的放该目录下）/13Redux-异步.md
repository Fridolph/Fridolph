Redux 异步请求

View -> actions -> Middlewares(API -> dispatch) -> reducer -> State -> View

异步 Action 属于 Redux 的一种设计模式

Redux 中间件 - Middlewares

1. 截获 action
2. 发出 action

---

- 异步 action 不是特殊 action，而是多个同步 action 的组合使用
- 中间件在 dispatcher 中截获 action 做特殊处理
