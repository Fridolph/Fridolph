# Typed

## isArray

- 基本用法
  传入一个值并获取一个布尔值，告诉您该值是否是数组。

```ts
import { isArray } from 'radash'

isArray('hello') // => false
isArray(['hello']) // => true
```

- 源码解析

```ts
// 当一个变量 isArray 被赋值为 Array.isArray 时
// 它实际上引用的是 Array 构造函数 （ class Array 上的静态方法 ）
export const isArray = Array.isArray
// Array.hasOwnProperty('isArray') -> true
```

## isDate

确定值是否为日期

- 基本用法
  确定值是否为日期。不检查输入日期是否有效，仅检查它是 Javascript 日期类型。

```ts
import { isDate } from 'radash'

isDate(new Date()) // => true
isDate(12) // => false
isDate('hello') // => false
```

- 源码分析

```ts
export const isDate = (value: any): value is Date => {
  // 使用 Object.prototype.toString.call(value) 方法
  // 来获取给定值（value）的类型字符串
  // 然后检查该字符串是否等于'[object Date]'
  return Object.prototype.toString.call(value) === '[object Date]'
}
```

::: warning 注意

由于这段代码依赖于 `Object.prototype.toString` 方法，因此不能在非 ES6 环境中运行。在非 ES6 环境中，你可以使用其他方法来实现相同的功能，例如使用 `typeof value === 'object'` 来检查值是否是一个对象，然后使用 `value instanceof Date` 来检查值是否是 Date 类的实例

:::

## isEmpty

判断一个值是否为空

- 基本用法
  这个函数主要用于处理复杂类型的值，包括布尔值、null、undefined、数字、日期、函数、符号等

```ts
import { isEmpty } from 'radash'

isEmpty([]) // => true
isEmpty('') // => true

isEmpty('hello') // => false
isEmpty(['hello']) // => false
```

- 源码解析

```ts
export const isEmpty = (value: any) => {
  // 首先，检查value是否为 布尔值 亦或是 null 或 undefined
  // 如果是，则返回true
  if (value === true || value === false) return true
  if (value === null || value === undefined) return true

  // 然后，检查value是否为数字
  // 若是，判断 value是否等于0 返回该布尔值
  if (isNumber(value)) return value === 0

  // 检查value是否为日期，如果是 value.getTime() 会转换为时间戳
  // 时间戳若有效的，isNaN 为 false，否则为 true
  if (isDate(value)) return isNaN(value.getTime())

  // 检查value是否为函数，如果是，则返回false
  if (isFunction(value)) return false

  // 检查value是否为 Symbol，如果是，则返回false
  if (isSymbol(value)) return false

  // 获取value的长度或大小（如果有的话），并检查其是否为0
  // 为0，则说明是空数组，返回true，否则为 false
  const length = (value as any).length
  if (isNumber(length)) return length === 0
  // 同上，这里针对 Map、Set
  const size = (value as any).size
  if (isNumber(size)) return size === 0

  const keys = Object.keys(value).length
  return keys === 0
}
```

::: warning 注意事项：

这段代码使用了类型断言（as any），这可能会导致运行时错误，因为类型断言会跳过类型检查。建议在使用时尽可能地进行类型检查和验证。
这段代码没有处理循环引用的情况，如果 value 是一个对象，并且对象之间存在循环引用，那么 Object.keys(value)可能会导致栈溢出错误。

:::

## isEqual

确定两个值是否相等

- 基本用法
  给定两个值，如果它们相等则返回 true。
  主要目的是实现一个通用且高效的比较器，可以用来比较任何类型的数据，包括对象、数组、字符串、数字、布尔值等。

```ts
import { isEqual } from 'radash'

isEqual(null, null) // => true
isEqual([], []) // => true

isEqual('hello', 'world') // => false
isEqual(22, 'abc') // => false
```

- 源码解析

```ts
export const isEqual = <TType>(x: TType, y: TType): boolean => {
  // Object.is方法来检查x和y是否是同一个对象
  if (Object.is(x, y)) return true

  // 分别检查x和y是否是Date对象。如果是，则比较它们的日期时间戳是否相等
  if (x instanceof Date && y instanceof Date) {
    return x.getTime() === y.getTime()
  }

  // 检查x和y是否是正则对象。如果是，则比较它们的内部表示是否相等。
  if (x instanceof RegExp && y instanceof RegExp) {
    return x.toString() === y.toString()
  }

  // 检查x和y是否不是对象或者null。如果是，则返回false
  if (typeof x !== 'object' || x === null || typeof y !== 'object' || y === null) {
    return false
  }

  // 这里稍微复杂些
  // 如果x和y是对象，则获取它们自己的属性键数组，并遍历这些属性键
  const keysX = Reflect.ownKeys(x as unknown as object) as (keyof typeof x)[]
  const keysY = Reflect.ownKeys(y as unknown as object)

  // 检查y是否具有相同的属性键，并且对应的属性值是否与x相等。
  if (keysX.length !== keysY.length) return false
  for (let i = 0; i < keysX.length; i++) {
    if (!Reflect.has(y as unknown as object, keysX[i])) return false
    if (!isEqual(x[keysX[i]], y[keysX[i]])) return false
  }
  // 如果所有属性都相等，则返回true。
  return true
}
```

## isFloat

判断一个值是否为浮点数

- 基本用法

```ts
import { isFloat } from 'radash'

isFloat(12.233) // => true
isFloat(12) // => false
isFloat('hello') // => false
```

- 源码解析

```ts
export const isFloat = (value: any): value is number => {
  // isNumber 函数会检查传入的值是否为 Number 类型，包括整数和浮点数
  // 使用逻辑运算符 % 检查 value 是否为整数
  return isNumber(value) && value % 1 !== 0
  // 如果 value 是浮点数，它将不会被整除
}
```

## isFunction

判断一个值是否是一个函数

- 基本用法

```ts
import { isFunction } from 'radash'

isFunction('hello') // => false
isFunction(['hello']) // => false
isFunction(() => 'hello') // => true
```

- 源码解析

```ts
export const isFunction = (value: any): value is Function => {
  // 通过检查value是否为null或undefined，
  // 然后检查value是否有constructor属性，
  // 并判断其call和apply方法是否为函数
  return !!(value && value.constructor && value.call && value.apply)
}
```

::: warning 注意事项：

虽然这个函数在大多数情况下能够正确判断传入的值是否为函数，但在某些特殊情况（如 null 或 undefined）中，它会返回 true，这可能不是预期的行为。在处理这些特殊情况时，可能需要额外的检查。

:::

## isInt

判断一个值是否为 int

- 基本用法
  这个函数可以用于检查变量是否为有效的整数，从而避免在代码中出现非预期的整数行为。
  例如，在处理数字字符串或从用户输入中获取数据时，可以使用 isInt 函数来确保输入的是一个整数。

```ts
import { isInt } from 'radash'

isInt(12) // => true
isInt(12.233) // => false
isInt('hello') // => false
```

- 源码解析

```ts
export const isInt = (value: any): value is number => {
  // 1. 使用isNumber函数检查value是否为数字（包括整数和浮点数）
  // 2. 使用逻辑运算符&&连接isNumber(value)和value % 1 === 0
  // 3. 如果value是数字且是整数，则返回true，否则返回false
  return isNumber(value) && value % 1 === 0
}
```

::: warning 注意：

- isInt 函数不能检查负数和 0 是否为整数，因为它只检查正整数。要检查一个值是否为负整数，可以使用 value < 0 && value % 1 !== 0。
- isInt 函数不能处理非数字类型的值，例如 null、undefined、string、object 等。在处理这些值时，需要先检查它们是否为数字，然后再使用 isInt 函数。

:::

## isNumber

判断一个值是否是数字

- 基本用法
  在需要检查一个变量是否为数字的情况下，可以使用这个函数进行判断，可以避免使用原始值进行比较时可能出现的类型转换错误。

```ts
import { isNumber } from 'radash'

isNumber('hello') // => false
isNumber(['hello']) // => false
isNumber(12) // => true
```

- 源码解析

```ts
export const isNumber = (value: any): value is number => {
  try {
    // 使用Number函数将value转换为数字
    // 如果转换后的数字与原始值相等，则返回true，否则返回false
    return Number(value) === value
  } catch {
    return false
  }
}
```

::: warning 注意事项：
这个函数会尝试将 value 转换为数字，如果转换失败（例如，如果 value 是一个字符串且包含非数字字符），将抛出一个异常。因此，在实际使用中，需要捕获可能的异常。
:::

## isObject

判断一个值是否是一个对象

- 基本用法  
  这个函数可以用于检查变量是否为对象，例如在处理对象属性时，以确保它们不是全局变量或未定义。

```ts
import { isObject } from 'radash'

isObject('hello') // => false
isObject(['hello']) // => false
isObject(null) // => false
isObject({ say: 'hello' }) // => true
```

- 源码解析

```ts
export const isObject = (value: any): value is object => {
  // 使用逻辑与运算符&&首先检查value是否存在，
  // 并且它的构造函数是否为Object
  // 这是为了确保接下来要检查的是一个对象

  // 然后，使用value.constructor === Object
  // 来检查给定的value是否确实是一个对象。
  return !!value && value.constructor === Object
  // 这是为了区分普通对象和数组
  // （因为数组的构造函数也是Object）
}
```

## isPrimitive

检查给定值是否为原始值

- 基本用法  
  基本类型： number 、 string 、 boolean 、 symbol、 bigint、 undefined、 null。
  在某些情况下，需要判断给定的值是否为原始类型，以避免处理非预期类型的数据。
  例如，在 JavaScript 中，有些函数和方法接受原始类型作为参数，但拒绝接受对象或函数作为参数。在这种情况下，可以使用 `isPrimitive` 函数来检查输入值是否为原始类型。

```ts
import { isPrimitive } from 'radash'

isPrimitive(22) // => true
isPrimitive('hello') // => true
isPrimitive(['hello']) // => false
```

- 源码解析

```ts
// 用于判断给定的值是否为原始类型
export const isPrimitive = (value: any): boolean => {
  return (
    // 首先，检查value是否为undefined，如果是，则返回true。
    value === undefined ||
    // 然后，检查value是否为null，如果是，则返回true。
    value === null ||
    (typeof value !== 'object' && typeof value !== 'function')
    // 接下来，检查value的类型是否不是对象（typeof value !== 'object'）
    // 也不是函数（typeof value !== 'function'）
    // 如果是，则返回true。
    // 如果value的类型满足上述条件，则返回false
  )
}
```

## isPromise

确定一个值是否是 Promise

- 基本用法
  在异步编程中，经常需要检查某个值是否是一个 Promise 实例。例如，当你需要在一个函数中等待一个 Promise 的结果时，你需要在函数的参数列表中使用 await 关键字。
  但是，如果你传入了一个不是 Promise 实例的值，那么它会尝试执行这个值，这可能会导致错误。因此，使用 isPromise 函数来检查传入的值是否是一个 Promise 实例，可以避免潜在的错误。

```ts
import { isPromise } from 'radash'

isPromise('hello') // => false
isPromise(['hello']) // => false
isPromise(new Promise(res => res())) // => true
```

- 源码解析

```ts
export const isPromise = (value: any): value is Promise<any> => {
  if (!value) return false
  // 如果传入的值是一个Promise实例，那么它应该有一个then方法，且then方法应该是一个函数
  // 通过检查value.then是否是一个函数，可以判断传入的值是否是一个Promise实例
  if (!value.then) return false
  // 使用了一个辅助函数isFunction来检查传入的值是否是一个函数
  if (!isFunction(value.then)) return false
  return true
}
```

::: warning 注意事项：
这个函数假设所有的传入值都可以被安全地转换为布尔值。在实际应用中，你可能需要对一些特定的值进行特殊处理，以确保它们不会被错误地识别为 Promise。例如，对于 null 或 undefined，你可能需要编写额外的逻辑来处理这些情况。
:::

## isString

判断一个值是否是一个字符串

- 基本用法
  可以使用这个函数来检查一个值是否为字符串类型，从而避免在代码中使用 `instanceof` 关键字，这样可以提高代码的可读性和安全性。

```ts
import { isString } from 'radash'

isString('hello') // => true
isString(['hello']) // => false
```

- 源码解析

```ts
export const isString = (value: any): value is string => {
  // 使用 typeof 和 instanceof 运算符，以及对 value 进行非空检查
  return typeof value === 'string' || value instanceof String
}
```

## isSymbol

确定一个值是否是一个 Symbol

- 基本用法
  这个函数通常用于检查变量是否是一个已经定义的 Symbol，例如使用 `const` 定义的符号。这对于确保符号名称不会被重复使用非常有用，特别是当符号名称对于应用程序至关重要时。

```ts
import { isSymbol } from 'radash'

isSymbol('hello') // => false
isSymbol(Symbol('hello')) // => true
```

- 源码解析

```ts
export const isSymbol = (value: any): value is symbol => {
  // 函数使用逻辑与（&&）操作符来检查value是否为undefined或null，以及value是否具有Symbol构造函数
  // 如果满足这两个条件，函数返回true，否则返回false。
  return !!value && value.constructor === Symbol
}
```
