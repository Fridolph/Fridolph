# JavaScript 正则表达式：规则、捕获与边界

正则描述文本匹配规则，适合固定格式识别、提取和替换。先确定输入语言和业务约束，再写表达式；不能靠一条“万能正则”完成邮箱投递验证、日期合法性或 HTML 解析。

## 最小语法地图

| 能力 | 示例 | 要点 |
| --- | --- | --- |
| 字符类 | `[0-9]`、`[^,]` | `^` 在字符类开头表示取反，在外部表示起始边界 |
| 简写 | `\d`、`\w`、`\s` | JS 的 `\w` 主要是 ASCII 字母、数字和下划线，不能当所有语言的字母 |
| 数量 | `?`、`*`、`+`、`{2,4}` | 默认贪婪，后接 `?` 改成惰性；惰性也不保证运行快 |
| 边界 | `^`、`$`、`\b` | `m` 改变行首尾语义；`\b` 不是通用中文词边界 |
| 分组 | `(ab)`、`(?:ab)`、`(?<name>ab)` | 捕获、非捕获、命名捕获 |
| 或与反向引用 | `cat\|dog`、`([a-z])\1` | `\1` 引用捕获到的文本，不是再次执行子表达式 |
| 断言 | `foo(?=bar)`、`(?<=foo)bar` | 判断周围上下文，本身不消费字符；兼容性要检查目标运行环境 |

`g` 全局、`i` 忽略大小写、`m` 多行锚点、`s` 让点号匹配行终止符、`u` 启用 Unicode 感知语义、`y` 从 lastIndex 精确开始。`v` 提供更强的 Unicode 集合能力，需核对环境且不能与 `u` 同时使用。

正则字面量 `/\d+/` 与字符串构造 `new RegExp('\d+')` 的转义层级不同；点号不默认匹配换行，JavaScript 也没有通用的 `\h` 水平空白简写。

## 提取、替换与状态

```js
const date = /^(?<year>\d{4})-(?<month>0[1-9]|1[0-2])-(?<day>0[1-9]|[12]\d|3[01])$/
const match = date.exec('2026-04-20')
match?.groups // { year: '2026', month: '04', day: '20' }
'2026-04-20'.replace(date, '$<month>/$<day>/$<year>') // 04/20/2026

[...'a1 b22'.matchAll(/(?<key>[a-z])(?<value>\d+)/g)]
  .map(match => match.groups)
```

这个日期正则只检查形式与范围，仍会接受 2 月 31 日；日历有效性需要进一步按年月日校验，不能依赖 Date 自动进位就算合法。

`replace` 的回调返回什么就替换成什么：返回空字符串表示删除，忘记 return 可能得到字符串 `undefined`。使用匹配结果或回调参数，不依赖隐式共享的 `RegExp.$1`。

```js
const pattern = /a/g
pattern.test('a') // true，lastIndex = 1
pattern.test('a') // false，失败后重置为0
```

带 `g` / `y` 的正则有状态，反复校验同一个值时应去掉这些 flag，或有意识地重置 lastIndex。全局收集匹配优先 `matchAll`；自己写 exec 循环遇到空匹配时要推进位置，否则可能死循环。

## 规则要服务于明确需求

```js
// 仅接受普通十进制字符串：允许符号、小数；不含指数、空白及多余前导零
const decimal = /^[+-]?(?:0|[1-9]\d*)(?:\.\d+)?$/
const valid = text => decimal.test(text) && Number.isFinite(Number(text))
```

语法正确不代表金额精度安全；金额还需约定小数位、范围、整数分或十进制定点方案。姓名不应该简单限制为2～4个汉字；电话号码要结合国家 / 地区，邮箱的轻量格式检查也不证明真实存在或属于当前用户。

## 性能与安全

`/^(a+)+$/` 这类嵌套量词对不匹配输入可能导致严重回溯。先限制输入长度，避免对不可信超长文本运行含歧义的模式；必要时使用不同算法或具备线性匹配保证的引擎。惰性量词不能自动解决 ReDoS。

动态拼接用户文本时，需要按正则字面内容转义；目标环境支持时可用 `RegExp.escape`，单纯包含查询则直接用 `includes`。不要把字符串当代码求值，也不要通过修改 String.prototype 发布工具函数。

**自测：** 为什么 `/a/g.test` 会交替返回？为什么 `\w+` 不适合中文姓名？格式正确的日期为什么仍可能不存在？

> 来源：[个人正则笔记](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/正则表达式)（含《JavaScript 忍者秘籍》读书摘记，归并改写）；[MDN 正则指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions)；[OWASP ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)。
