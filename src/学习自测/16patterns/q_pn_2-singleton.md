# 什么是单例模式？前端哪些场景在用？

## 核心回答

单例模式确保一个类**只有一个实例**，并提供**全局访问点**。在前端中不一定用 class 实现，更多通过模块导出实现。

```ts
// 模块级单例 — 最常见的实现方式
// logger.ts
class Logger {
  private logs: string[] = []
  log(msg: string) { this.logs.push(msg) }
  getLogs() { return [...this.logs] }
}
export const logger = new Logger() // ES Module 天然单例

// 懒汉式 — 需要时才创建
class Database {
  private static instance: Database
  private constructor() {}
  static getInstance(): Database {
    if (!Database.instance) Database.instance = new Database()
    return Database.instance
  }
}
```

**前端典型场景**：
- Vuex/Pinia/Redux Store — 全局状态容器天然是单例
- 全局事件总线 — 跨组件通信
- 日志收集器 — 统一记录，避免分散
- Dialog/Toast 组件 — 全局弹窗确保只有一个

**面试关键点**：JavaScript 中 ES Module 本身就是单例（同一个模块多次 import 返回同一份引用），不需要刻意实现。

> 来源：[JavaScript Design Patterns — Singleton](https://www.patterns.dev/vanilla/singleton-pattern)
