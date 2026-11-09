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

```js
Object.prototype.hasOwnProperty.call(obj, 'key')
// ↓↓
Object.hasOwn(obj, 'key')
```

## ES14 - 2023 

- Array.prototype.toSorted
- Array.prototype.toReversed
- Array.prototype.with
- Array.prototype.findLast
- Array.prototype.findLastIndex
- Array.prototype.toSpliced
- 正式的 shebang 支持
- Symbol 作为 WeakMap 的键

## 参考

- [ES6、ES7、ES8、ES9、ES10 新特性一览](https://juejin.cn/post/6844903811622912014)——上沅兮
- [ES11 新增的这 9 个新特性，你都掌握了吗？](https://juejin.cn/post/6883306672064987149)——无名之苝
- [ES2021(ES12)新特性解读](https://juejin.cn/post/7036574117033672712)——小吉很低调
- [ES2022(ES13)新特性解读](https://juejin.cn/post/7060329023569657892)
- [ES14新特性揭秘，对前端开发有哪些影响？](https://juejin.cn/post/7279719681444528163)——Bun
