# Number

与数字类型相关的方法 （目前只有 3 个）

## inRange

检查给定数字是否在两个数字之间。包含起始数字。结束号码是唯一的。范围的开始和结束可以是升序或降序。如果未指定结束值，则将其设置为起始值。并且 start 设置为 0。

- 基本用法

传递范围的数字、开始和结束（可选）。如果给定的数字在范围内，\_.inRange 函数将返回 true。

```ts
import { inRange } from 'radash'

inRange(10, 0, 20) // true
inRange(9.99, 0, 10) // true
inRange(Math.PI, 0, 3.15) // true
inRange(10, 10, 20) // true
inRange(10, 0, 10) // false

inRange(1, 2) // true
inRange(1, 0) // false
```

- 源码解析

```ts
export function inRange(number: number, end: number): boolean
export function inRange(number: number, start: number, end: number): boolean
export function inRange(number: number, start: number, end?: number): boolean {
  // isTypeSafe 变量用于存储类型检查的结果
  const isTypeSafe =
    typeof number === 'number' &&
    typeof start === 'number' &&
    (typeof end === 'undefined' || typeof end === 'number')

  // 类型检查：
  // 首先检查 number、start 和 end 是否都是数字类型
  // 如果不是，函数立即返回 false。
  if (!isTypeSafe) {
    return false
  }

  // 参数调整：
  // 如果 end 参数未定义，则将 end 设置为 start，并将 start 设置为 0
  // 这样，函数可以处理只有一个参数的情况，即检查数字是否在 0 到 start 之间
  if (typeof end === 'undefined') {
    end = start
    start = 0
  }

  // 判断逻辑：
  // 使用 Math.min(start, end) 和 Math.max(start, end) 来确定范围的起始和结束值，确保 start 小于等于 end。
  // 检查 number 是否大于等于范围的起始值且小于范围的结束值。如果是，返回 true；否则，返回 false
  return number >= Math.min(start, end) && number < Math.max(start, end)
}
```

## toFloat

如果可能，将值转换为浮点数

- 基本用法

\_.toFloat 函数将尽力将给定值转换为浮点数。

```ts
import { toFloat } from 'radash'

toFloat(0) // => 0.0
toFloat(null) // => 0.0
toFloat(null, 3.33) // => 3.33
```

- 源码解析

这段代码定义了一个名为 toFloat 的 TypeScript 函数，用于将输入值转换为浮点数。如果转换失败或输入值为 null 或 undefined，则返回一个默认值。

```ts
export const toFloat = <T extends number | null = number>(
  value: any,
  defaultValue?: T
): number | T => {
  // 定义一个常量 def，用于存储默认值
  const def = defaultValue === undefined ? 0.0 : defaultValue
  // 边界判断
  // 检查 value 是否为 null 或 undefined，如果是，则返回默认值 def
  if (value === null || value === undefined) {
    return def
  }
  // 尝试将 value 转换为浮点数，并将结果存储在 result 中。
  const result = parseFloat(value)

  // 检查 result 是否为 NaN（非数字）
  // 如果 result 是 NaN，则返回默认值 def。
  // 否则，返回转换后的浮点数 result
  return isNaN(result) ? def : result
}
```

## toInt

如果可能的话，将值转换为 int

- 基本用法

\_.toint 函数将尽最大努力将给定值转换为 int。

```ts
import { toInt } from 'radash'

toInt(0) // => 0
toInt(null) // => 0
toInt(null, 3) // => 3
```

- 源码解析

这段代码定义了一个名为 toInt 的 TypeScript 函数，用于将输入值转换为整数

```ts
export const toInt = <T extends number | null = number>(
  value: any,
  defaultValue?: T
): number | T => {
  // 定义一个常量 def，用于存储默认值
  const def = defaultValue === undefined ? 0 : defaultValue
  // 边界判断，同上
  if (value === null || value === undefined) {
    return def
  }
  // 尝试将 value 转换为整数，并将结果存储在 result 中
  const result = parseInt(value)
  return isNaN(result) ? def : result
}
```
