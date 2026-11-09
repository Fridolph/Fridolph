# Array

Radash 使用 TypeScript 编写，提供开箱即用的完整打字功能。 大多数 Radash 函数都是确定性的和/或纯粹的。

## range

创建用于迭代的范围

- 基本用法
  
给定开始、结束、值和步长，返回一个生成器，该生成器将按步长生成从开始到结束的值。对于将 for (let i = 0) 替换为 for of 很有用。 Range 将返回一个生成器 `generator`，for of 将一次调用一个生成器，因此创建大范围是安全的。

```ts
import { range } from 'radash'

range(3)                  // yields 0, 1, 2, 3
range(0, 3)               // yields 0, 1, 2, 3
range(0, 3, 'y')          // yields y, y, y, y
range(0, 3, () => 'y')    // yields y, y, y, y
range(0, 3, i => i)       // yields 0, 1, 2, 3
range(0, 3, i => `y${i}`) // yields y0, y1, y2, y3
range(0, 3, obj)          // yields obj, obj, obj, obj
range(0, 6, i => i, 2)    // yields 0, 2, 4, 6

for (const i of range(0, 200, 10)) {
  console.log(i) // => 0, 10, 20, 30 ... 190, 200
}

for (const i of range(0, 5)) {
  console.log(i) // => 0, 1, 2, 3, 4, 5
}
```

- 源码解析


```ts
export function* range<T = number>(
  startOrLength: number,
  end?: number,
  // 类型为T或者是一个接受整数参数并返回T的函数
  // 默认值为i => i as T，即将整数直接转换为T类型。
  valueOrMapper: T | ((i: number) => T) = i => i as T,
  // 步长，表示生成的序列中相邻整数的差值。默认值为1
  step: number = 1
): Generator<T> {
  // 检查valueOrMapper是否为函数，如果是，则将其赋值给mapper变量；否则，使用默认值
  const mapper = isFunction(valueOrMapper) ? valueOrMapper : () => valueOrMapper
  // 计算start和final的值。如果end存在，则start为startOrLength，否则为0。
  const start = end ? startOrLength : 0
  // 如果end不存在，则final为startOrLength
  const final = end ?? startOrLength
  // 使用for循环遍历start到final之间的整数，步长为step。
  for (let i = start; i <= final; i += step) {
    // 在循环中，使用mapper函数将当前整数转换为T类型，并将其作为生成器生成的值。
    yield mapper(i)
    // 如果当前整数加上step大于final，则跳出循环。
    if (i + step > final) break
  }
}
```

这个生成器函数可以用于生成指定范围内的整数序列，常用于遍历数组、集合或其他需要遍历的数据结构。

## list

创建包含特定项目的列表

- 基本用法

给定开始、结束、值和步长，返回一个列表，其中包含按步长从开始到结束的值。该接口与`range`相同。

```ts
import { list } from 'radash'

list(3)                  // [0, 1, 2, 3]
list(0, 3)               // [0, 1, 2, 3]
list(0, 3, 'y')          // [y, y, y, y]
list(0, 3, () => 'y')    // [y, y, y, y]
list(0, 3, i => i)       // [0, 1, 2, 3]
list(0, 3, i => `y${i}`) // [y0, y1, y2, y3]
list(0, 3, obj)          // [obj, obj, obj, obj]
list(0, 6, i => i, 2)    // [0, 2, 4, 6]
```

> 看用法大家应该猜到了，没错，核心就是 Array.from()

- 源码解析

```ts
export const list = <T = number>(
  // 表示要创建的数组的起始值或长度
  startOrLength: number,
  // 表示要创建的数组的结束值。可选，默认为undefined
  end?: number,
  // 一个T类型的值，或者是一个接受一个数字参数并返回T类型的函数
  // 可选，默认为undefined
  valueOrMapper?: T | ((i: number) => T),
  // 表示要创建的数组的步长。可选，默认为undefined
  step?: number
): T[] => {
  // 原理是使用Array.from()方法，从range函数返回的数字序列中创建一个数组（range 看上面应该清楚了）
  // list函数的返回类型是一个T类型的数组，其中T默认为number类型。
  // 如果valueOrMapper参数是一个函数，那么数组中的每个元素都会被这个函数处理。
  // 如果step参数被提供，那么数组将按照指定的步长创建。
  return Array.from(range(startOrLength, end, valueOrMapper, step))
}
```

## objectify

将列表转换为字典对象

- 基本用法
  
给定一个项目数组，使用给定函数映射的键和值创建一个字典。第一个参数是要映射的数组。第二个参数是确定每个项目的键的函数。第三个参数是可选的，它确定每个项目的值。

```ts
import { objectify } from 'radash'

const fish = [
  { name: 'Marlin',weight: 105 },
  { name: 'Bass',weight: 8 },
  { name: 'Trout',weight: 13 }
]

objectify(fish, f => f.name) 
// => { Marlin: [marlin object], Bass: [bass object], ... }

objectify(
  fish,
  f => f.name,
  f => f.weight
) 
// => { Marlin: 105, Bass: 8, Trout: 13 }
```

- 源码分析

该函数接受三个参数：一个数组（array）、一个获取键的函数（getKey）和一个获取值的函数（getValue，可选）。函数的返回类型是一个记录（`Record<Key, Value>`），其中键是Key类型，值是Value类型

```ts
export const objectify = <T, Key extends string | number | symbol, Value = T>(
  array: readonly T[],
  getKey: (item: T) => Key,
  getValue: (item: T) => Value = item => item as unknown as Value
): Record<Key, Value> => {
  // 使用reduce方法遍历数组，将每个元素键值对插入到结果对象中
  return array.reduce((acc, item) => {
    // getKey函数用于从数组元素中提取键，getValue函数用于从数组元素中提取值。
    // 如果getValue函数未提供，则默认行为是直接将item转换为Value类型
    // 遍历数组，将每个元素键值对插入到结果对象中
    acc[getKey(item)] = getValue(item)
    // 返回结果对象
    return acc
  }, {} as Record<Key, Value>)
}
```

将一个包含对象或数组的数组转换为一个具有指定键值类型的记录。这对于将数据结构从数组转换为对象非常有用，特别是当数组中的元素具有相同的键和值时。

## replaceOrAppend

替换数组中的项目或追加（如果不匹配）

- 基本用法

给定一个项目数组、一个项目和一个恒等函数，返回一个新数组，其中该项目要么在现有项目的索引处替换——如果存在，否则将其附加在末尾。

```ts
import { replaceOrAppend } from 'radash'

const fish = [
  { name: 'Marlin', weight: 105 },
  { name: 'Salmon', weight: 19 },
  { name: 'Trout', weight: 13 }
]
const salmon = { name: 'Salmon', weight: 22 }
const sockeye = { name: 'Sockeye', weight: 8 }

replaceOrAppend(fish, salmon, f => f.name === 'Salmon') 
// => [marlin, salmon (weight:22), trout]

replaceOrAppend(fish, sockeye, f => f.name === 'Sockeye') 
// => [marlin, salmon, trout, sockeye]
```

- 源码解析

该函数接受三个参数：一个 readonly 类型的数组list（表示原始数组），一个类型为T的新项newItem，以及一个函数match，用于判断是否需要替换或追加新项。函数的返回值是一个数组，类型为T。

```ts
export const replaceOrAppend = <T>(
  list: readonly T[],
  newItem: T,
  match: (a: T, idx: number) => boolean
) => {
  // 首先，检查list和newItem是否为空，如果都为空，则返回一个空数组
  if (!list && !newItem) return []
  // 然后，检查newItem是否为空，如果为空，则返回list的浅拷贝对象
  if (!newItem) return [...list]
  // 接下来，检查list是否为空，如果为空，则返回[newItem]
  if (!list) return [newItem]

  // 遍历list，对于每个item，使用match函数判断是否需要替换或追加新项
  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx]
    if (match(item, idx)) {
      return [
        // 如果需要替换，则从list中提取从0到idx的元素，
        ...list.slice(0, idx),
        // 然后将新项添加到提取的元素之后，
        newItem,
        // 最后将剩余的元素添加到结果数组中。
        // 如果不需要替换，则继续遍历
        ...list.slice(idx + 1, list.length)
      ]
    }
  }
  // 如果遍历完list仍然没有找到需要替换的元素，则将新项添加到结果数组中
  // 并返回结果数组
  return [...list, newItem]
}
```

这个函数可以在原始数组list中查找或替换特定条件下的元素，从而创建一个新的数组。这个函数可以用于在数组中插入新元素、修改现有元素或在特定条件下替换元素。

## replace

替换数组中的一项

- 基本用法

给定一组项目，替换与给定条件函数匹配的项目。仅替换第一个匹配项。始终返回原始数组的副本。

```ts
import { replace } from 'radash'

const fish = [
  { name: 'Marlin', weight: 105 },
  { name: 'Bass', weight: 8 },
  { name: 'Trout', weight: 13 }
]
const salmon = { name: 'Salmon', weight: 22 }

replace(fish, salmon, f => f.name === 'Bass') // => [marlin, salmon, trout]
```

- 源码解析

该函数接受三个参数：一个 readonly 类型的数组list（表示原始数组），一个类型为T的新项newItem，以及一个函数match，用于判断某个项是否满足替换条件。

实现原理是将原始数组中的每个项与新项进行比较，如果满足条件，则将新项插入到该项之前，并将该项及后续项向前移动一位。最后返回一个新的数组，其中包含了替换后的结果。

```ts
export const replace = <T>(
  list: readonly T[],
  newItem: T,
  match: (item: T, idx: number) => boolean
): T[] => {
  // 函数首先检查list是否为空，如果为空，则直接返回一个空数组
  if (!list) return []
  // 遍历原始数组list，并逐个检查每个项item
  if (newItem === undefined) return [...list]

  // 遍历原始数组list，并逐个检查每个项item
  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx]
    // 如果match函数返回true，则表示当前项满足替换条件。
    // 此时，将新项newItem插入到当前项之前，并将当前项及后续项向前移动一位。
    if (match(item, idx)) {
      // 具体实现是使用slice方法将数组分割成三部分：
      return [
        // 第一部分是原始数组的前idx项，
        ...list.slice(0, idx),
        // 第二部分是原始数组第idx + 1项及后续项，
        newItem,
        // 第三部分是原始数组的末尾。
        ...list.slice(idx + 1, list.length)
      ]
      // 最后将这三部分连接起来，得到替换后的数组
    }
  }
  // 遍历结束后，如果没有任何项满足替换条件，则直接返回原始数组
  return [...list]
}
```

## select

过滤并映射数组

- 基本用法

一次性应用过滤器和映射操作。

```ts
import { select } from 'radash'

const fish = [
  { name: 'Marlin', weight: 105, source: 'ocean' },
  { name: 'Bass', weight: 8, source: 'lake' },
  { name: 'Trout', weight: 13, source: 'lake' }
]

select(
  fish,
  f => f.weight,
  f => f.source === 'lake'
) 
// => [8, 13]
```

- 源码解析

该函数接受三个参数：一个 readonly 类型的数组array、一个依赖传入数组和索引的函数mapper和一个依赖传入数组和索引的函数condition。

实现原理是使用reduce方法遍历数组，根据condition函数的条件来判断是否保留当前元素，如果保留，则使用mapper函数计算该元素的新值并将其添加到结果数组中。

```ts
export const select = <T, K>(
  array: readonly T[],
  mapper: (item: T, index: number) => K,
  condition: (item: T, index: number) => boolean
) => {
  // 首先，如果array为空，则返回一个空数组
  if (!array) return []

  // 使用reduce方法遍历array
  return array.reduce((acc, item, index) => {
    // 从索引0开始。对于每个元素item，如果condition函数返回false，则不执行任何操作，继续遍历下一个元素
    if (!condition(item, index)) return acc
    // 如果condition函数返回true，则调用mapper函数，将item和当前索引作为参数，并将结果添加到acc数组中。
    acc.push(mapper(item, index))
    // 最后，将acc数组返回
    return acc
  }, [] as K[])
}
```

该函数可以用于从数组中选择满足特定条件的元素，并返回一个新的数组，其中包含转换后的元素。例如，可以用于从数组中选择偶数并将它们转换为字符串：

## shift

将数组项移动 n 步

- 基本用法

给定一个项目列表，返回一个向右移动 n 个位置的数组。

```ts
import { shift } from 'radash'
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
shift(arr, 3) // => [7, 8, 9, 1, 2, 3, 4, 5, 6]
```

- 源码解析

该函数接受一个数组arr和一个数字n作为参数，并返回一个新的数组。实现原理是将数组arr中的元素向右移动n次。

```ts
export function shift<T>(arr: Array<T>, n: number) {
  // 首先检查数组arr是否为空，如果为空，则直接返回原数组
  if (arr.length === 0) return arr
  // 计算n对数组arr的长度取模的结果，将这个结果作为shiftNumber变量
  const shiftNumber = n % arr.length
  // 如果shiftNumber为0，则直接返回原数组
  if (shiftNumber === 0) return arr

  // 使用slice方法从数组arr中切出后shiftNumber个元素，
  // 然后将剩余的元素切片，最后将这两个部分拼接在一起，得到新的数组。
  return [...arr.slice(-shiftNumber, arr.length), ...arr.slice(0, -shiftNumber)]
}

```

## sift

从列表中删除所有虚假项目

- 基本用法

给定一个项目列表，返回一个新列表，其中包含所有不为假的项目。

```ts
import { sift } from 'radash'

const fish = ['salmon', null, false, NaN, 'sockeye', 'bass']

sift(fish) // => ['salmon', 'sockeye', 'bass']
```

- 源码解析

实现原理是将一个readonly类型的可迭代列表（只读的可迭代对象）过滤掉所有的假值（Falsy），并将过滤后的结果转换为T类型的数组。

```ts
export const sift = <T>(
  list: readonly (T | Falsy)[]
): T[] => {
  // 函数的返回类型是T类型的可写数组
  return (
    // 使用list?.filter(x => !!x)过滤出非Falsy类型的元素
    // 将过滤后的元素转换为T类型的可写数组，使用as T[]关键字
    // 由于将list过滤掉假值后，可能会有null或undefined出现，
    // 所以需要使用as关键字将结果转换为T类型的数组。否则，编译器会提示类型错误
    list?.filter(x => !!x) as T[]
  ) ?? []
  // 如果list为null或undefined，则返回一个空数组[]
}
```

主要用途是用来处理列表，将其中所有的假值过滤掉，从而得到一个纯T类型的数组。这样做的目的是为了提高代码的可读性和可维护性，避免因为假值导致的问题。


## sort

按数字属性对对象列表进行排序

- 基本用法

给定一个对象数组，返回一个按 get 函数中指定的数值属性排序的新数组。第三个可选参数允许您按降序而不是默认的升序排序。

> 该函数仅支持数字排序。对于按字母顺序排序，请参阅按字母顺序功能。

```ts
import { sort } from 'radash'

const fish = [
  { name: 'Marlin', weight: 105 },
  { name: 'Bass', weight: 8 },
  { name: 'Trout', weight: 13 }
]

sort(fish, f => f.weight) 
// => [bass, trout, marlin]

sort(fish, f => f.weight, true) 
// => [marlin, trout, bass]
```

- 源码解析

```ts
export const sort = <T>(
  array: readonly T[],
  // 即一个接受一个T类型的参数并返回一个数字的函数
  getter: (item: T) => number,
  // 表示是否按降序排序
  desc = false
) => {
  // 如果提供的数组为空，则返回一个空数组
  if (!array) return []
  // 根据desc参数的值，我们创建两个排序函数asc和dsc，分别用于升序和降序排序
  // 这两个函数都接受两个T类型的参数，并返回它们的getter函数的返回值之差
  const asc = (a: T, b: T) => getter(a) - getter(b)
  const dsc = (a: T, b: T) => getter(b) - getter(a)

  // 我们使用array.slice()方法创建一个数组的副本，然后使用sort方法对副本进行排序。
  // 根据desc参数的值，我们使用dsc排序函数或asc排序函数进行排序
  return array.slice().sort(desc === true ? dsc : asc)
}
```

这个sort函数可以用于对具有getter函数指定的属性的数组进行排序。例如，您可以使用这个函数对具有id属性值的数组进行升序排序，或者使用desc参数为true对数组进行降序排序。

## sum

将数组的所有项相加

- 基本用法

给定一个项目数组，以及一个将每个项目映射到数字的可选函数，将所有项目相加。

```ts
import { sum } from 'radash'

const fish = [
  { name: 'Marlin', weight: 100 },
  { name: 'Bass', weight: 10 },
  { name: 'Trout', weight: 15 }
]

sum(fish, f => f.weight) // => 125
```

- 源码解析

实现原理：使用reduce方法来计算数组中元素的总和。reduce方法会遍历数组，并将每个元素与上一个累积值相加，然后将结果作为新的累积值传递给下一个reduce迭代

```ts
// 对于数字数组，sum函数通过reduce方法累加数组中的所有数字
// 使用readonly属性确保不会修改传入的数组，下同
export function sum<T extends number>(array: readonly T[]): number
// 对于对象数组，sum函数通过reduce方法累加数组中的所有对象。
// 在累加过程中，可以提供一个fn函数来处理每个对象，该函数接受一个item参数并返回一个数字。
export function sum<T extends object>(
  array: readonly T[],
  fn: (item: T) => number
): number
// sum函数可以计算数组中不同类型元素的加和。
export function sum<T extends object | number>(
  array: readonly any[],  
  fn?: (item: T) => number
): number {
  // 使用reduce方法遍历数组并累加元素
  // 根据数组中元素的类型和是否提供了fn函数来执行不同的累加操作
  return (array || []).reduce((acc, item) => acc + (fn ? fn(item) : item), 0)
}
```

## toggle

切换数组中的项目是否存在

- 基本用法

如果列表中已存在符合条件的项目，则会将其删除。如果没有，将会添加。

```ts
import { toggle } from 'radash'

const names = ['ra', 'zeus', 'loki']

toggle(names, 'ra')     // => [zeus, loki]
toggle(names, 'vishnu') // => [ra, zeus, loki, vishnu]

const ra = { name: 'Ra' }
const zeus = { name: 'Zeus' }
const loki = { name: 'Loki' }
const vishnu = { name: 'Vishnu' }

const gods = [ra, zeus, loki]
// 您可以传递可选的 toKey 函数来确定非原始值的标识。在处理更复杂的数据类型时很有帮助。
toggle(gods, ra, g => g.name)     
// => [zeus, loki]
toggle(gods, vishnu, g => g.name) 
// => [ra, zeus, loki, vishnu]
```

- 源码解析

这个函数的主要目的是从一个给定的list中删除或添加一个item，根据toKey函数的返回值是否与list中的元素相等。

```ts
export const toggle = <T>(
  list: readonly T[],
  item: T,
  // 如果没有提供toKey函数，则使用默认的相等比较
  toKey?: null | ((item: T, idx: number) => number | string | symbol),
  options?: {
    // 它可以通过strategy选项来决定添加项目的位置，默认为'append'
    strategy?: 'prepend' | 'append'
  }
) => {
  // 如果list和item都为空，则返回一个空数组
  if (!list && !item) return []
  // 如果list为空，但item不为空，则返回包含item的新数组
  if (!list) return [item]
  // 如果item为空，但list不为空，则返回list本身
  if (!item) return [...list]

  // matcher函数用于比较列表中的项，如果提供了toKey函数，则使用toKey函数进行比较；否则，使用默认的相等比较
  const matcher = toKey
    ? (x: T, idx: number) => toKey(x, idx) === toKey(item, idx)
    : (x: T) => x === item
  const existing = list.find(matcher)
  if (existing) return list.filter((x, idx) => !matcher(x, idx))
  const strategy = options?.strategy ?? 'append'
  if (strategy === 'append') return [...list, item]
  return [item, ...list]
}
```

## unique

从数组中删除重复项

- 基本用法

给定一个项目数组 - 以及一个可选的确定其身份的函数 - 返回一个没有任何重复项的新数组。
该函数不保留项目的原始顺序。

```ts
import { unique } from 'radash'

const fish = [
  { name: 'Marlin', weight: 105, source: 'ocean' },
  { name: 'Salmon', weight: 22, source: 'river' },
  { name: 'Salmon', weight: 22, source: 'river' }
]

unique( fish, f => f.name )
// [
//     { name: 'Marlin', weight: 105, source: 'ocean' },
//     { name: 'Salmon', weight: 22, source: 'river' }
// ]
```

- 源码解析

该函数接受一个 `readonly T[]` 类型的参数array和一个可选的toKey函数。T是一个泛型类型，可以是一个字符串、数字或符号；K是一个扩展类型，可以是一个字符串、数字或符号。函数的返回类型是T[]

```ts
export const unique = <T, K extends string | number | symbol>(
  array: readonly T[],
  toKey?: (item: T) => K
): T[] => {
  // 使用reduce方法遍历数组array，将每个元素存储在一个映射中。
  // 最后，valueMap将包含一个唯一的键值对集合
  const valueMap = array.reduce(
    (acc, item) => {
      const key = toKey ? toKey(item) : (item as any as string | number | symbol)
      // 在遍历过程中，对于每个元素，如果映射中已经存在该键，则跳过该元素；
      // 否则，将该元素添加到映射中
      if (acc[key]) return acc
      acc[key] = item
      return acc
    }, 
    // reduce函数的初始值是一个空对象{}
    // 返回Object.values(valueMap)，即唯一的元素值数组
    {} as Record<string | number | symbol, T>
  )
  // 通过Object.values方法将其转换为数组
  return Object.values(valueMap)
}
```

## zipToObject

将多个数组组合成集合

- 基本用法

创建一个对象，将第一个数组中的键映射到第二个数组中对应的值。

```ts
import { zipToObject } from 'radash'

const names = ['ra', 'zeus', 'loki']
const cultures = ['egypt', 'greek', 'norse']

zipToObject(names, cultures)
// => { ra: 'egypt', zeus: 'greek', loki: 'norse' }

zipToObject(names, (k, i) => k + i)
// => { ra: 'ra0', zeus: 'zeus1', loki: 'loki2' }

zipToObject(names, null)
// => { ra: null, zeus: null, loki: null }
```

- 源码解析

zipToObject函数使用reduce方法遍历keys数组，对于每个键，调用getValue函数获取相应的值。getValue函数根据values参数的类型进行不同的处理

```ts
export function zipToObject<K extends string | number | symbol, V>(
  keys: K[],
  values: V | ((key: K, idx: number) => V) | V[]
): Record<K, V> {
  // 首先检查keys和values是否为空，如果是，则返回一个空的记录
  if (!keys || !keys.length) {
    return {} as Record<K, V>
  }

    // 函数检查values是否是一个函数或者一个数组。
  const getValue = isFunction(values)
    // 如果是函数，则直接使用该函数作为getValue函数；
    ? values
    // 如果是数组
    : isArray(values)
      // 则创建一个函数，该函数接受两个参数（键和索引），并返回数组中的相应值。
      ? (_k: K, i: number) => values[i]
      // 如果values不是一个函数或数组，则直接使用values作为getValue函数
      : (_k: K, _i: number) => values

  // 函数使用reduce方法遍历keys数组，将每个键映射到相应的values值，
  // 并将结果累积到一个对象中。遍历完成后，返回该对象
  return keys.reduce((acc, key, idx) => {
    acc[key] = getValue(key, idx)
    return acc
  }, {} as Record<K, V>)
}
```

## zip

将多个数组组合成集合

- 基本用法


创建一个分组元素数组，其中第一个包含给定数组的第一个元素，第二个包含给定数组的第二个元素，依此类推。

```ts
import { zip } from 'radash'

const names = ['ra', 'zeus', 'loki']
const cultures = ['egypt', 'greek', 'norse']

const zipped1 = zip(names, cultures)
// => [
//   [ra, egypt]
//   [zeus, greek]
//   [loki, norse]
// ]

const zipped2 = zip(['a', 'b'], [1, 2], [true, false]) 
// zipped -> [['a', 1, true], ['b', 2, false]]
```

- 源码解析

zip函数可以用于将多个数组组合成一个新的数组，特别用于多维数组的处理。例如，如果有一个包含3个一维数组的数组，可以使用zip函数将其组合成一个二维数组。

```ts
// 类型定义：函数使用了泛型（T1, T2, T3, T4, T5）来处理不同类型的数组。
// 然而，由于TypeScript不支持匿名类型，因此需要在函数定义中指定数组中元素的类型
export function zip<T1, T2, T3, T4, T5>(
  array1: T1[],
  array2: T2[],
  array3: T3[],
  array4: T4[],
  array5: T5[]
): [T1, T2, T3, T4, T5][]
// 函数重载：为了实现不同长度的数组组合，zip函数使用了重载来定义不同的函数声明。
// 这些声明分别对应1到5个数组作为参数的情况。
export function zip<T1, T2, T3, T4>(
  array1: T1[],
  array2: T2[],
  array3: T3[],
  array4: T4[]
): [T1, T2, T3, T4][]
export function zip<T1, T2, T3>(
  array1: T1[],
  array2: T2[],
  array3: T3[]
): [T1, T2, T3][]
export function zip<T1, T2>(array1: T1[], array2: T2[]): [T1, T2][]
export function zip<T>(...arrays: T[][]): T[][] {
  // 1. 参数检查：zip函数在接收参数时，会检查参数是否为空数组。
  // 如果参数为空，函数将返回一个空数组
  if (!arrays || !arrays.length) return []
  // 2. 最大长度：函数会计算输入数组中的最大长度
  // 然后，我们创建了一个新数组，其长度为最大长度
  return new Array(
    // 3. 循环和递归：zip函数使用了递归和循环来处理输入数组。
    // 在实现中，递归函数会不断减少输入数组的长度，直到输入数组的长度变为1。
    // 此时，函数将开始组合这些数组
    Math.max(...arrays.map(({ length }) => length))
  )
    // 用空数组来填充，这样就变成了 [ [] , [] , [] , ... ] 二维数组的形式
    .fill([])
    // .map()方法是将整个二维数组转换为一个新数组，新数组中的每个元素都是原始数组中对应索引值的元素
    .map((_, idx) => arrays.map(array => array[idx]))
}
```