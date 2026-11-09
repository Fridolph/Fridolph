# 装饰器模式在前端有哪些实际应用？

## 核心回答

装饰器模式**动态地为对象添加职责**，在前端中以**高阶函数/高阶组件**的形式大量出现。

```ts
// 1. 高阶函数 — 函数装饰器
function withRetry<T extends (...args: any[]) => Promise<any>>(fn: T, times = 3): T {
  return (async (...args) => {
    for (let i = 0; i <= times; i++) {
      try { return await fn(...args) }
      catch (e) { if (i === times) throw e }
    }
  }) as T
}

const robustFetch = withRetry(fetch, 3)

// 2. 函数组合 — 洋葱模型
const compose = (...fns: Function[]) =>
  fns.reduce((a, b) => (...args: any[]) => a(b(...args)))

const withLog = (fn: any) => (...args: any[]) => { console.log('before'); return fn(...args) }
const withTimer = (fn: any) => (...args: any[]) => { const t = Date.now(); const r = fn(...args); console.log(Date.now() - t); return r }

// 3. React HOC — 组件装饰器
function withAuth<P>(Component: React.ComponentType<P>) {
  return (props: P) => {
    const user = useAuth()
    if (!user) return <Navigate to="/login" />
    return <Component {...props} user={user} />
  }
}
```

**好处**：
- 比继承更灵活，**运行时组合**
- 每个装饰器**单一职责**，易测试、可复用
- 不侵入原函数/组件，装饰可随时添加或移除

**关键点**：装饰器的核心价值是"对修改关闭，对扩展开放"。新增功能=新增装饰器，不修改原有代码。

> 来源：[JavaScript Design Patterns — Decorator](https://www.patterns.dev/vanilla/decorator-pattern)
