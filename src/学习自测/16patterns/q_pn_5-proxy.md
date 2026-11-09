# ES6 Proxy 在前端能解决哪些问题？

## 核心回答

ES6 Proxy 可以拦截对象的**13 种底层操作**（get/set/has/delete/construct 等），是代理模式的 JavaScript 级实现。常用场景：

```ts
// 1. 响应式数据 — Vue 3 核心原理
function reactive<T extends object>(obj: T): T {
  return new Proxy(obj, {
    get(target, key, receiver) {
      track(target, key)  // 依赖收集
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const old = target[key]
      const result = Reflect.set(target, key, value, receiver)
      if (old !== value) trigger(target, key)  // 派发更新
      return result
    },
  })
}

// 2. 数据校验 — 拦截非法赋值
const validator: ProxyHandler<{ age: number }> = {
  set(obj, prop, value) {
    if (prop === 'age' && (value < 0 || value > 150)) {
      throw new Error(`Invalid age: ${value}`)
    }
    return Reflect.set(obj, prop, value)
  },
}

// 3. 接口缓存 — 请求去重
function withCache<T extends (...args: any[]) => Promise<any>>(fn: T) {
  const cache = new Map()
  return new Proxy(fn, {
    apply(target, thisArg, args) {
      const key = JSON.stringify(args)
      if (!cache.has(key)) cache.set(key, Reflect.apply(target, thisArg, args))
      return cache.get(key)
    },
  })
}

// 4. 属性访问日志
const logged = new Proxy(obj, {
  get(target, key) { console.log(`get ${String(key)}`); return target[key] },
})
```

**关键优势**：对原始对象**零侵入**，透明代理，比 Object.defineProperty 功能更强大（拦截 13 种操作而非仅 get/set）。

> 来源：[MDN — Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
