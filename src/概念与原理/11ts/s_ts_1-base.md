# TypeScript

自测 [学习自测 - TypeScript基础](../../学习自测/11ts/q_ts_1-base.md)

## 什么是 TypeScript

Typescript 是一个`强类型`的 `JavaScript 超集`，支持 ES6 语法，`支持面向对象编程`的概念，如类、接口、继承、`泛型`等。Typescript 并不直接在浏览器上运行，需要编译器编译成纯 Javascript 来运行。

## 为什么需要 TypeScript

- TypeScript 快速、简单，易于学习
- TypeScript 支持`面向对象`的编程特性，例如类、接口、继承、泛型等
- TypeScript 在编译时提供`错误检查`功能
- TypeScript 支持所有 JavaScript 库，因为它是 `JavaScript 的超集`
- TypeScript 通过使用`继承`来支持可重用性
- TypeScript 支持`最新`的 JavaScript 功能
- TypeScript 支持`静态类型`、`强类型`、模块、可选参数等

## TypeScript 的主要特点是什么

- `跨平台`：TypeScript 编译器可以安装在任何操作系统上
- `ES6 特性`：TypeScript 包含计划中的 ECMAScript 2015 (ES6) 的大部分特性
- `面向对象`的语言：TypeScript 提供所有标准的 OOP 功能，如类、接口和模块
- `静态类型检查`：TypeScript 使用静态类型并帮助在编译时进行类型检查
- `可选的静态类型`：TypeScript 允许可选的静态类型
- DOM 操作：可以使用 TypeScript 来操作 DOM 以添加或删除网页元素

## TypeScript 的缺点

- 需要时间编译
- 不支持抽象类
- 需要执行编译步骤才能将 TypeScript 转换为 JavaScript 才能在浏览器中运行
- 使用任何第三方库，定义文件是必须的（若无会极大影响开发体验）
- 类型定义文件的质量很难把控
- 类型体操学习曲线陡峭

## JavaScript 与 TypeScript 的区别

| 特性       | JavaScript           | TypeScript               |
| ---------- | -------------------- | ------------------------ |
| 开发时间   | Netscape 1995        | Anders Hejlsberg 2012    |
| 扩展名     | .js                  | .ts                      |
| 类型支持   | 弱类型语言           | 强类型，支持静态检查     |
| 浏览器执行 | 可直接执行           | 需要编译成 JS 后再执行   |
| 本质       | 解释型语言，运行报错 | 编译型语言，开发期间报错 |
| 基础类型   | 对象、字符串是对象   | 数字、字符串是接口       |
| 泛型支持   | 不支持               | 支持                     |

## TypeScript 的组成部分

- 语言：它**由语法，关键字和类型注释组成**
- TypeScript `编译器`：编译器将用 TypeScript 编写的指令转换为等效的 JavaScript
- TypeScript 语言服务：语言服务在核心编译器管道周围暴露了一个附加层

## TypeScript 的内置类型

- boolean 布尔类型
- number 数字类型
- string 字符串类型
- void 空类型
- null 类型
- undefined 类型
- array 数组类型
- tuple 元组类型，允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
- enum 枚举类型，enum 类型是对 JavaScript 标准数据类型的一个补充，使用枚举类型可以为一组数值赋予友好的名字
- any 任意类型
- never 类型
- object 对象类型

## 参考

- [前端掘金者 H：TypeScript 面试题解析助你进阶 TS 专家](https://juejin.cn/post/7215084575495798843)
