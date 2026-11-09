# 迭代器模式 Iterator Pattern

## 概念

迭代器模式提供一种方法顺序访问聚合对象（集合）中的各个元素，而又不暴露其内部表示。JavaScript 原生支持迭代器（`Symbol.iterator`），使 `for...of` 可以遍历任意可迭代对象。

## 核心思想

将"遍历"与"集合"分离，通过统一的迭代器接口访问不同类型的集合。

```mermaid
flowchart LR
    A[Client] -->|for...of / next| B[Iterator]
    B -->|顺序访问| C[Aggregate 集合]
```

## 代码实现

### 自定义可迭代对象

```ts
// 实现 Symbol.iterator 使其可被 for...of 遍历
class Range implements Iterable<number> {
  constructor(private start: number, private end: number, private step = 1) {}

  [Symbol.iterator](): Iterator<number> {
    let current = this.start
    const end = this.end
    const step = this.step

    return {
      next(): IteratorResult<number> {
        if (current < end) {
          const value = current
          current += step
          return { value, done: false }
        }
        return { value: undefined, done: true }
      },
    }
  }
}

// 使用
for (const n of new Range(0, 10, 2)) {
  console.log(n) // 0, 2, 4, 6, 8
}
const arr = [...new Range(1, 5)] // [1, 2, 3, 4]
```

### 多种遍历方式的集合

```ts
class TreeNode<T> {
  children: TreeNode<T>[] = []
  constructor(public value: T) {}

  // 深度优先
  *dfs(): Generator<TreeNode<T>> {
    yield this
    for (const child of this.children) {
      yield* child.dfs()
    }
  }

  // 广度优先
  *bfs(): Generator<TreeNode<T>> {
    const queue: TreeNode<T>[] = [this]
    while (queue.length) {
      const node = queue.shift()!
      yield node
      queue.push(...node.children)
    }
  }
}
```

### 链式迭代器（类似 LINQ）

```ts
class LazyIterator<T> implements Iterable<T> {
  constructor(private source: Iterable<T>) {}

  *[Symbol.iterator]() { yield* this.source }

  map<U>(fn: (t: T) => U): LazyIterator<U> {
    const source = this.source
    return new LazyIterator({
      *[Symbol.iterator]() { for (const item of source) yield fn(item) },
    })
  }

  filter(pred: (t: T) => boolean): LazyIterator<T> {
    const source = this.source
    return new LazyIterator({
      *[Symbol.iterator]() { for (const item of source) if (pred(item)) yield item },
    })
  }

  take(n: number): LazyIterator<T> {
    const source = this.source
    return new LazyIterator({
      *[Symbol.iterator]() {
        let count = 0
        for (const item of source) { if (count++ >= n) break; yield item }
      },
    })
  }

  toArray(): T[] { return [...this] }
}

// 使用 — 惰性求值链
const result = new LazyIterator([1, 2, 3, 4, 5, 6])
  .filter(n => n % 2 === 0)
  .map(n => n * 10)
  .take(2)
  .toArray() // [20, 40]
```

## 前端应用场景

| 场景 | 说明 |
|------|------|
| 数组/集合遍历 | `for...of`、`Array.from`、展开运算符 |
| Generator 惰性求值 | 按需生成数据（无限序列、分页） |
| DOM 遍历 | `document.createTreeWalker` 提供迭代器 |
| Redux-Saga | 使用 Generator 实现异步流程控制 |
| 虚拟滚动 | 按需迭代可见区域的数据 |

## 优缺点

**优点**
- 遍历逻辑与集合结构分离
- 同一集合可有多种遍历方式
- Generator 语法简洁，支持惰性求值

**缺点**
- 简单遍历直接 forEach 就够了
- 迭代器只能单向遍历（除非自行实现 prev）
- 惰性求值的错误处理不如同步直观

> 来源：[Refactoring Guru — Iterator](https://refactoring.guru/design-patterns/iterator)
