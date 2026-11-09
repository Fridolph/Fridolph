# 数组与字符串基础练习

## 两数之和、字符频次、回文与最长单词

<<< ./implementation.js

| 实现 | 契约与复杂度 | 容易漏掉的边界 |
| --- | --- | --- |
| twoSum | 查询补数后存当前元素；期望 O(n) 时间 / O(n) 空间 | 重复值 `[3,3]`；下标 0 不能用真假判断；同一个元素不能重复使用 |
| characterCounts | Map 按首次插入顺序计数；O(n) | `for...of` 按码点迭代，能保留换行和代理对 |
| isPalindrome | 约定忽略标点与大小写，保留 Unicode 字母数字；O(n) | 中文不应被 `\W` 全部删掉；空归一化结果视为回文 |
| longestWord | 按空白分词，一次遍历；O(n) | 同长度取第一个，不额外排序；标点不自动删除 |
| maxNumericEntry | 遍历自有可枚举字符串键；O(k) | 空对象返回 null、负数也可比较、不用 0 当初始最大值 |

码点不是用户感知的字形：组合音标、家庭 emoji 仍可能由多个码点组成。面向自然语言时需明确归一化、区域大小写和 `Intl.Segmenter` 等分词策略，不能把练习规则冒充通用文本分析。

## 去重与扁平化：优先理解内置能力

```js
const unique = values => [...new Set(values)]
const oneLevel = values => values.flat(1)
const allLevels = values => values.flat(Infinity)
```

Set 使用 SameValueZero 比较，NaN 可以去重，对象按引用比较。`flat` 对数组空槽与显式 undefined 的处理不同；循环引用、超深结构和不可信规模需要额外限制。按对象 id 去重则应使用 Map 并约定保留第一次还是最后一次，不能声称 Set 自动进行结构比较。

**练习：** 两数之和改成“所有不重复的值组合”时，输入、输出和算法分别如何变化？字符频次并列最多时如何稳定返回第一项？

> 来源：[个人算法学习笔记](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/算法相关)。实现已按明确契约重写，非原样复制；边界验证见本目录 `__tests__/learning-algorithms.test.mjs`。
