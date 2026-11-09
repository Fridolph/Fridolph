# 下面为变量类型相关常考察点

若有陌生或不清楚的可再到 [概念与原理 - 变量](../../概念与原理/02js/s_js_1-base.md) 回顾

## 变量

### JS 有多少种数据类型

::: details

- 基本类型 7
  - Undefined
  - Null
  - Boolean
  - Number
  - String
  - Symbol
  - BigInt
- 引用类型：Object
  - Array、Function、Date、RegExp、Error 等

:::

### 数据类型的判断方式

::: details

1. typeof 操作数的类型，只能识别基础数据类型和引用类型

特别注意：

- tyoeof null === 'object'
- tyoeof NaN === 'number'
- tyoeof document.all === 'undefined' 不是浏览器标准

2. constructor 指向创建梳理对象的构造函数（作为辅助方法来判断）

注意事项：

- null 和 undefined 没有 constructor 属性
- constructor 属性是可修改的

3. instanceof 判断一个实例是否属于某个类。原型链查找

注意事项：右操作数必须是函数或者 class

4. isPrototypeOf 是否出现在实力对象的原型链上

注意：能正常返回值的情况，基本等同 instanceof

5. Object.prototype.toString

通过函数的动态 this 特性，返回其数据类型 `[object Date]`

6. 鸭子类型检测

检查自身，属性的类型或者执行结果的类型，例如 Promise（候选方法）

7. Symbol.toStringTag

Object.prototype.toString 会读取该值，需自定义类型，要注意兼容性（ES6 后新增高级特性）

8. 等比较：与某个固定值进行比较

使用场景 undefined、window、document、null 等

:::

### let、const 和 var 的区别

::: details

| 特性     | let            | const                                  | var          |
| -------- | -------------- | -------------------------------------- | ------------ |
| 变量提升 | 无，暂时性死区 | 无，暂时性死区                         | 存在变量提升 |
| 立即赋值 | 不需           | 需要                                   | 不需         |
| 可修改   | 可修改         | 基础类型不可修改，引用类型赋值后可修改 | 可修改       |

:::

## 判断

### typeof 的用法

::: details 点击提示
**typeof**

- 判断所有值类型：number、string、boolean、undefined、symbol、bigint
- 能识别函数 function
- 判断是否为引用类型 （但不能细分）
- null 会被判断为 object
  :::

### instanceof 的用法

::: details 点击提示
instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上
:::

### typeof 与 instanceof 的区别

::: details
|特性|typeof|instanceof|
|-|-|-|
|返回类型|返回一个变量的基本类型|返回的是一个布尔值|
|判断范围|基础数据类型(null 除外)和 function|准确地判断复杂引用数据类型|

- `返回结果类型不同`：typeof 会返回一个变量的基本类型，instanceof 返回的是一个布尔值
- `判断范围不同`：instanceof 可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型；而 typeof 也存在弊端，它虽然可以判断基础数据类型（null 除外），但是引用数据类型中，除了 function 类型以外，其他的也无法判断。
  :::

### Object.is() 与比较操作符 “===”、“==” 的区别

::: details

- 使用双等号（==）进行相等判断时，如果两边的类型不一致，则会进行`强制类型转化`后再进行比较。
- 使用三等号（===）进行相等判断时，如果两边的类型不一致时，`不会做强制类型准换`，直接返回 false。
- 使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它`处理了一些特殊的情况`，比如 -0 和 +0 不再相等，两个 NaN 是相等的。

:::

### 对象转为原始数据类型的值

隐式转换的要点：

- Symbol.ToPrimitive
- Object.ptototype.valueOf
- Object.ptototype.toString

::: details

[] 的原始值：

- `typeof [][Symbol.ToPrimitive]` -> undefined
- `[].valueOf()` -> []
- `[].toString()` -> ''

{} 的原始值：

- `typeof {}[Symbol.ToPrimitive]` -> undefined
- `{}`.valueOf() -> {}
- `{}`.toString() -> '[object Object]'

所以：

[] + [] = ''
[] + {} = '[object Object]'

{} + [] = 0 -> {}; + [] -> + '' -> 0
{} + {} = NaN -> {}; + {} -> + '[object Object]' -> NaN

:::

### == 操作符的强制类型转换规则

::: details

- 如果比较的是基本数据类型，直接比较值是否相等
- 如果比较的是对象，则比较其内部值是否相等
- 如果比较的是 null 和 undefined，则返回 true
- 如果比较的是字符串和数字，则将字符串转换为数字再进行比较
- 如果比较的是布尔值和数字，则将布尔值转换为数字再进行比较

:::

### 对于 < 和 > 比较符

::: details

- 如果两边都是字符串，则比较字母表顺序，`'a' < 'b' -> true`
- 其他情况下，转换为数字再比较 `'12' < 4 -> false`，`false > -1 -> true`
  :::

## 运算

### 为什么 0.1+0.2 ! == 0.3，如何让其相等

::: details
计算机是通过二进制的方式存储数据的，所以计算机计算 0.1+0.2 的时候，实际上是计算的两个数的二进制的和。0.1 的二进制是 0.0001100110011001100...（1100 循环），0.2 的二进制是：0.00110011001100...（1100 循环），这两个数的二进制都是无限循环的数。
:::

## 数组相关

### 类数组

是一个普通对象，有 length 属性和从零开始索引的属性，但是没有数组的内置方法

- arguments 对象
- DOM 相关列表

类数组如何转为数组：

- JS API ： slice concat 等
- Array.from
- Array.apply
- 复制 与 遍历

### 创建数组的几种方式

- 数组对象字面量 new Array
- Array.from (ES6)
- Array.of (ES6)

批量创建数据

1. 批量制造数据 for
2. 运用 map 循环
3. Array.fill 填充数据
4. Array.from 初始化函数返回数据
5. 数组去重 Set

## 参考

- [前端（HTML+CSS+JS+打包+环境+网络）2023](https://juejin.cn/post/7227787460968415289)
