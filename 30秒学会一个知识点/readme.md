摘抄自 https://30secondsofcode.org/

总结得很犀利很叼~ 写代码的同时又能了解一个知识点 （当然真只靠30秒是完全不够的）

于是 将网站知识摘抄的同时，自己再慢慢搜索资料，MDN来补充，学习新知识点 && 温故知新。

---

先这样了，坚持，加油！

```js
// 创建一个最多接受n个参数的函数，忽略任何其他参数。使用Array.prototype.slice（0，n）和扩展运算符（...），使用最多n个参数调用提供的函数fn。
const ary = (fn, n) => (...args) => fn(...args.slice(0, n))

// call 给定一个键和一组参数，在给定上下文时调用它们。主要用于组合物。使用闭包来调用存储的参数的存储键。
const call = (key, ...args) => context => context(key, ...args)
const apply = (key, args) => context => context(key, args)

// collectInto 将接受数组的函数更改为可变参数函数。给定一个函数，返回一个闭包，它将所有输入收集到一个接受数组的函数中。
const collectInto = fn => (...args) => fn(args)
```
