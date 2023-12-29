## typeof 作用

用来检测一个变量或一个对象的数据类型

## typeof 检测的范围

typeof 检测变量的类型范围包括：

- string
- number
- bigint
- boolean
- symbol
- undefined
- object
- function

局限性：不能检测数组、Set、Map

```ts
// 通过Object.prototype.toString.call(array) // [object Array]
// 通过Object.prototype.toString.call(set) // [object Set]
// 通过Object.prototype.toString.call(map) // [object Map]
```

## 类型守卫及运用场景

为什么要用类型守卫？

在语句的块级作用域（if语句内或条目运算符表达式内）缩小变量的一种类型推断的行为

类型守卫产生的时机？

TS条件语句遇到下列条件关键词时，会在语句的块级作用域内缩小变量的类型，这种类型推断的行为称为类型守卫（Type Guard）。类型守卫可以帮助我们在块级作用域中获得更为需要的精确变量类型。

- 实例判断 instanceof
- 属性或方法判断 in
- 类型判断 typeof
- 字面量相同判断 ==, ===,  !==,  !=

