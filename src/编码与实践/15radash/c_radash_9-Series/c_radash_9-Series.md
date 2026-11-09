# series

创建有序系列对象

## 基本用法

有时，您有一个枚举或联合类型（可能是一种状态），它具有固有的顺序，并且您需要像按顺序一样使用值。 Series 函数接受许多值并返回一个对
象，让您可以对这些值执行有序逻辑。

### 用于处理基础类型的示例

```ts
import { series } from 'radash'

type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'

const weekdays = series<Weekday>(['monday', 'tuesday', 'wednesday', 'thursday', 'friday'])

weekdays.min('tuesday', 'thursday') // => 'tuesday'
weekdays.max('wednesday', 'monday') // => 'wednesday'
weekdays.next('wednesday') // => 'thursday'
weekdays.previous('tuesday') // => 'monday'
weekdays.first() // => 'monday'
weekdays.last() // => 'friday'
weekdays.next('friday') // => null
weekdays.next('friday', weekdays.first()) // => 'monday'
weekdays.spin('monday', 3) // => 'thursday'
```

### 用于处理复杂类型的示例

```ts 
// 在处理对象时，您需要为Series提供第二个参数，
// 该函数将非原始值转换为可以检查相等性的标识。
import { series } from 'radash'

type Weekday = {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'
}

const weekdays = series<Weekday>(
  [
    { day: 'monday' },
    { day: 'tuesday' },
    { day: 'wednesday' },
    { day: 'thursday' },
    { day: 'friday' },
  ],
  w => w.day
)

weekdays.next({ day: 'wednesday' })
// => { day: 'thursday' }
weekdays.previous({ day: 'tuesday' })
// => { day: 'monday' }
```

## 源码分析

- todo

```ts
import { list } from './array'

/**
 * Creates a series object around a list of values
 * that should be treated with order.
 */
export const series = <T>(
  items: T[],
  toKey: (item: T) => string | symbol = item => `${item}`
) => {
  const { indexesByKey, itemsByIndex } = items.reduce(
    (acc, item, idx) => ({
      indexesByKey: {
        ...acc.indexesByKey,
        [toKey(item)]: idx
      },
      itemsByIndex: {
        ...acc.itemsByIndex,
        [idx]: item
      }
    }),
    {
      indexesByKey: {} as Record<string | symbol, number>,
      itemsByIndex: {} as Record<number, T>
    }
  )
  /**
   * 给定系列中的两个值，返回系列中较早出现的值
   */
  const min = (a: T, b: T): T => {
    return indexesByKey[toKey(a)] < indexesByKey[toKey(b)] ? a : b
  }
  /**
   * Given two values in the series, returns the
   * value that occurs later in the series
   */
  const max = (a: T, b: T): T => {
    return indexesByKey[toKey(a)] > indexesByKey[toKey(b)] ? a : b
  }
  /**
   * Returns the first item from the series
   */
  const first = (): T => {
    return itemsByIndex[0]
  }
  /**
   * Returns the last item in the series
   */
  const last = (): T => {
    return itemsByIndex[items.length - 1]
  }
  /**
   * Given an item in the series returns the next item
   * in the series or default if the given value is
   * the last item in the series
   */
  const next = (current: T, defaultValue?: T): T => {
    return (
      itemsByIndex[indexesByKey[toKey(current)] + 1] ?? defaultValue ?? first()
    )
  }
  /**
   * Given an item in the series returns the previous item
   * in the series or default if the given value is
   * the first item in the series
   */
  const previous = (current: T, defaultValue?: T): T => {
    return (
      itemsByIndex[indexesByKey[toKey(current)] - 1] ?? defaultValue ?? last()
    )
  }
  /**
   * A more dynamic method than next and previous that
   * lets you move many times in either direction.
   * @example series(weekdays).spin('wednesday', 3) => 'monday'
   * @example series(weekdays).spin('wednesday', -3) => 'friday'
   */
  const spin = (current: T, num: number): T => {
    if (num === 0) return current
    const abs = Math.abs(num)
    const rel = abs > items.length ? abs % items.length : abs
    return list(0, rel - 1).reduce(
      acc => (num > 0 ? next(acc) : previous(acc)),
      current
    )
  }
  return {
    min,
    max,
    first,
    last,
    next,
    previous,
    spin
  }
}
```