# 用迭代理解阶乘与斐波那契

约定 `0! = 1`、`F(0) = 0`、`F(1) = 1`，输入为非负安全整数，输出为 BigInt。避免把负数、字符串、Infinity 等默默算成一个看似有效的结果。

<<< ./implementation.js

```js
factorial(20) // 2432902008176640000n
fibonacci(100) // 354224848179261915075n
JSON.stringify({ value: fibonacci(100).toString() })
```

朴素递归 Fibonacci 会重复计算，时间呈指数增长；迭代只维护相邻两项，执行 O(n) 次循环。阶乘也执行 O(n) 次乘法。这里的 O(n) 指运算次数，BigInt 位数随结果增长，实际时间和内存不能按定长整数估算；“两个变量”也不代表占用字节恒定。

BigInt 不能与 Number 直接混算，也不能被 JSON.stringify 默认序列化。输入约束防止精度歧义，接口还需限制 n 的业务上限，避免计算拖住事件循环。JavaScript 不应依赖尾调用优化来保证递归大输入安全。

**练习：** 比较递归、记忆化、迭代版本；为输出设计字符串接口契约，再解释为什么 BigInt 精确不等于无限计算能力。

> 来源：[个人算法学习笔记](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/算法相关)。实现已按明确契约重写，非原样复制；边界验证见本目录 `__tests__/learning-algorithms.test.mjs`。
