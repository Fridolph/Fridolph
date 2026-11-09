# ESNext

## ES7 - 2016

- 数组 includes()方法，用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false。
- a \*\* b 指数运算符，它与 Math.pow(a, b)相同。

## ES8 - 2017

- `async/await`
- Object.values()
- Object.entries()
- String padding `padStart()` 和 `padEnd()`，填充字符串达到当前长度
- 函数参数列表结尾允许逗号
- Object.getOwnPropertyDescriptors()
- ShareArrayBuffer 和 Atomics 对象，用于从共享内存位置读取和写入

## ES9 - 2018

- 异步迭代 `for of`
- Promise.finally()
- Rest/Spread 属性
- 正则表达式命名捕获组（Regular Expression Named Capture Groups）
- 正则表达式反向断言（lookbehind）
- 正则表达式 dotAll 模式
- 正则表达式 Unicode 转义
- 非转义序列的模板字符串

## ES10 - 2019

- 行分隔符（U + 2028）和段分隔符（U + 2029）符号现在允许在字符串文字中，与 JSON 匹配
- 更加友好的 JSON.stringify
- 新增了 Array 的 `flat()` 方法和 `flatMap()` 方法
- 新增了 String 的 `trimStart()` 方法和 `trimEnd()` 方法
- Object.fromEntries()
- Symbol.prototype.description
- String.prototype.matchAll
- Function.prototype.toString()现在返回精确字符，包括空格和注释
- 简化 try {} catch {},修改 catch 绑定
- 新的基本数据类型 BigInt
- globalThis
- import()
- Legacy RegEx
- 私有的实例方法和访问器

## ES11 - 2020

ES2020(ES11) 引入了以下新特性：

- String 的 matchAll 方法
- 动态导入语句 import()
- import.meta
- `export * as ns from 'module'`
- Promise.allSettled()
- 一种新的数据类型：BigInt
- GlobalThis
- Nullish coalescing Operator
- Optional Chaining

## ES12 - 2021

- String.prototype.replaceAll
- Promise.any & AggregateError
- 逻辑赋值运算符 `??=` `&&=` `||=`
- WeakRef & FinalizationRegistry（弱引用和垃圾回收监听）
- Numeric literal separator（数字分隔符）
  - `1_000_000_000` // 1000000000
- Array.prototype.sort

## ES13 - 2022

- Class Fields

  - Class Public Instance Fields 公共实例字段
  - Private Instance Fields 私有实例字段
  - Private instance methods and accessors 私有实例方法和访问器
  - Static class fields and methods 静态公共字段和方法
  - Private static class fields and methods 静态私有字段和方法

- Class Static Block 类静态初始化块
- Ergonomic brand checks for Private Fields 私有字段检查
- RegExp Match Indices
- Top-level await
- `.at()`
- Error Cause
- Accessible Object.prototype.hasOwnProperty

## ES14 - 2023

- Array.prototype.toSorted
- Array.prototype.toReversed
- Array.prototype.with
- Array.prototype.findLast
- Array.prototype.findLastIndex
- Array.prototype.toSpliced
- 正式的 shebang 支持
- Symbol 作为 WeakMap 的键

## ES15 - 2024

### 1. Promise.withResolvers

这个功能引入了一个新方法来创建一个 promise，直接返回 resolve 和 reject 的回调。使用 Promise.withResolvers ，我们可以创建直接在其执行函数之外 resolve 和 reject

```ts
const [promise, resolve, reject] = Promise.withResolvers()

setTimeout(() => resolve('2s'), 2000)

promise.then(value => console.log(value))
```

### 2. Object.groupBy

Object.groupBy() 方法是一项新添加的功能，允许我们按照特定属性将数组中的 对象分组，从而使数据处理变得更加容易。

```ts
const pets = [
  { gender: '男', name: '张三' },
  { gender: '女', name: '李四' },
  { gender: '男', name: '王五' },
]

const res = Object.groupBy(pets, pet => pet.gender)
console.log(res) // { 女: [ { gender: '女', name: '李四' } ], 男: [ { gender: '男', name: '张三' }, { gender: '男', name: '王五' } ] }
```

### 3. Temporal

Temporal 提案引入了一个新的 API，以更直观和高效的方式 处理日期和时间。例如，Temporal API 提供了新的日期、时间和持续时间的数据类型，以及用于创建、操作和格式化这些值的函数。

```ts
const today = Temporal.PlainDate.from({ year: 2024, month: 2, day: 15 })
console.log(today.toString()) // 输出: 2024-2-15

const duration = Temporal.Duration.from({ hours: 24, minutes: 30 })
const tomorrow = today.add(duration)
console.log(tomorrow.toString()) // 输出: 2024-2-16
```

### 4. Records 和 Tuples

Records 和 Tuples 是全新的数据结构，提供了一种更简洁和类型安全的方式来创建对象和数组。

- Records 类似于对象，但具有具体类型的固定属性集。
- Tuples 类似于数组，但具有固定长度，每个元素可以具有不同类型。

```ts
let record = #{
  id: 1,
  name: "JavaScript",
  year: 2024
};
console.log(record.name); // 输出: JavaScript
```

### 5. 装饰器 Decorators

装饰器（Decorators）是一种提议的语法，用于添加元数据或修改类、函数或属性的行为。装饰器可用于实现各种功能，如日志记录、缓存和依赖注入。

```ts
function logged(target, key, descriptor) {
  const original = descriptor.value
  descriptor.value = function (...args) {
    console.log(`Calling ${key} with arguments:`, args)
    return original.apply(this, args)
  }
  return descriptor
}

class Example {
  @logged
  sum(a, b) {
    return a + b
  }
}

const e = new Example()
e.sum(1, 2) // 输出：[1, 2]
```

### 其他

ES15 还提供了很多其他的新提案，比如：新的正则 v、管道符|>、String.prototype.isWellFormed()、ArrayBuffer.prototype.resize 等等

## 参考

- [ES6、ES7、ES8、ES9、ES10 新特性一览](https://juejin.cn/post/6844903811622912014)——上沅兮
- [ES11 新增的这 9 个新特性，你都掌握了吗？](https://juejin.cn/post/6883306672064987149)——无名之苝
- [ES2021(ES12)新特性解读](https://juejin.cn/post/7036574117033672712)——小吉很低调
- [ES2022(ES13)新特性解读](https://juejin.cn/post/7060329023569657892)
- [ES14 新特性揭秘，对前端开发有哪些影响？](https://juejin.cn/post/7279719681444528163)——Bun
- [ES2024 即将发布！5 个可能大火的 JS 新方法](https://juejin.cn/post/7349410765525483555?searchId=202408141131206491A32D71AB9B47C626)——程序员 Sunday
