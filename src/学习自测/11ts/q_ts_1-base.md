# TypeScript

回顾 [概念与原理 - TypeScript 基础](../../概念与原理/11ts/s_ts_1-base.md)

## TS 类型

### any 类型的作用是什么

::: details
为编程阶段还不清楚类型的变量指定一个类型，这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。
:::

## 区别

### 为什么要使用 TypeScript ？ TS 相对于 JS 的优势是什么

::: details
TypeScript 是 ` JS 的超集`，包括所有的 JS 规范版本。同时拥有强大的`类型`系统，包括泛型，是一个面向对象的语言，提供类，接口和模块。

TS 对 JS 的改进主要是`静态类型检查`（强类型语言）“静态类型更有利于构建大型应用”。
同时 TS 多了接口，泛型这些 JS 所没有的特性，内置的数据类型也比较多。
:::

### TypeScript 的内置数据类型有哪些

::: details 在 Typescript 中，内置的数据类型也称为原始数据类型

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
  :::

### TypeScript 中 const 和 readonly 的区别

::: details
const 可以`防止变量的值被修改`，在运行时检查，使用 const 变量保存的数组，可以使用 push，pop 等方法

readonly 可以`防止变量的属性被修改`，在编译时检查，使用 Readonly Array 声明的数组不能使用 push，pop 等方法
:::

### any 类型的作用是什么

::: details
为编程阶段还**不清楚类型的变量指定一个类型**。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库（不确定用户输入值的类型，第三方代码库是如何工作的）。 这种情况下，我们`不希望类型检查器对这些值进行检查`而是直接让它们`通过编译阶段的检查`。

any 的问题：

- 类型污染：any 类型的对象`会导致后续的属性类型都会变成 any`
- 使用不存在的属性或方法而不报错
  :::

### any、never、unknown、null、undefined 和 void 有什么区别

::: details

- any: `动态`的变量类型（失去了类型检查的作用）
- never: `永不存在`的值的类型。例如：never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
- unknown: `任何类型的值`都可以赋给 unknown 类型，但是 **unknown 类型的值只能赋给 unknown 本身和 any 类型**
- null & undefined: 默认情况下 null 和 undefined 是`所有类型的子类型`。 就是说你可以把 null 和 undefined 赋值给 number 类型的变量。当你指定了 --strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自。
- void: `没有任何类型`。例如：一个函数如果没有返回值，那么返回值可以定义为 void。
  :::

### any 和 unknown 有什么区别

::: details

- any 和 unknown 都是顶级类型
- unknown 更加严格。any 不做类型检查； unknown 因为未知性质，不允许访问属性，不允许赋值给其他有明确类型的变量。
  :::

### keyof 和 typeof 关键字的作用

::: details

- keyof 索引类型查询操作符， 获取一个`类型的所有属性名`组成的`联合类型`。
- typeof 获取一个变量或对象的类型。typeof 是一个类型查询操作符，它用于获取一个值的类型
  :::

### TS 中的泛型是什么

::: details

泛型允许我们在编码与实践时使用一些`以后才指定的类型`。在定义函数，接口或者类的时候，不预先定义好具体的类型，而`在使用的时候在指定类型`的一种特性。
:::

## type 与 interface

### TypeScript 中 type 和 interface 的区别

::: details 相同点

- 都可以描述 `对象` 或者 `函数`
- 都允许拓展 `extends`。interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface 。虽然效果差不多，但是两者语法不同。

:::

::: details 不同点

1. type 可以声明基本类型，联合类型，元组
2. type 可以使用 typeof 获取实例的类型进行赋值
3. 多个相同的 interface 声明可以自动合并
   :::

> 使用 `interface 描述数据结构`，使用 `type 描述类型关系`
> 一般来说，如果不清楚什么时候用 interface/type，能用 interface 实现，就用 interface , 如果不能就用 type

## 类 Class

### TS 中什么是方法重载

::: details
方法重载是指在一个类中定义多个同名的方法，但要求每个方法具有不同的参数的类型或参数的个数。 基本上，它在派生类或子类中重新定义了基类方法。

方法覆盖规则：

- 该方法必须与父类中的名称相同。
- 它必须具有与父类相同的参数。
- 必须存在 IS-A 关系或继承。
  :::

### 说说 TS 中的类及其特性

::: details
TypeScript 引入了类，以便它们可以利用诸如封装和抽象之类的面向对象技术的好处。除了属性和方法之外，TypeScript 中的类还支持以下特性：

**1. 类的成员访问修饰符**

- `public` 默认的访问修饰符，公共成员可以在任何地方访问。
- `private` 私有成员只能在当前类中访问，继承类和实例都不能访问。
- `protected` 受保护的成员可以在当前类和继承类中访问，实例不能访问。

**2. 类的静态成员**

静态成员可以通过 `static` 关键字来定义

**3. 类的继承**

它通过关键字 `extends` 来实现。继承基类可以获得基类的属性、方法、静态成员和构造函数等

**4. 抽象类**

抽象类通过关键字 `abstract` 来定义
:::

## 其他

### Declare 关键字有什么作用

::: details
一般的 JavaScript 库/框架都没有 TypeScript 声明文件，但是我们希望在 TypeScript 文件中使用它们时不会出现编译错误，为此需要使用 declare 关键字。
:::

## 参考

- [TypeScript 集合——2023](https://juejin.cn/post/7227702665484042297)
