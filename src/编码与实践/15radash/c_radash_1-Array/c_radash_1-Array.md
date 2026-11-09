# Array

Radash 使用 TypeScript 编写，提供开箱即用的完整打字功能。 大多数 Radash 函数都是确定性的和/或纯粹的。

::: warning 注意：

`import { isArray, isFunction } from './typed'`

array.ts 引入了 isArray 和 isFunction 两个方法用于数组类型的判断。

:::

## alphabetical

按属性的字母顺序对对象数组进行排序。

- 基本用法

给定一个对象数组和一个用于确定用于排序的属性的回调函数，返回一个新数组，其中对象按字母顺序排序。第三个可选参数允许您按降序而不是默认的升序排序。对于数字排序，请参阅排序函数。


```ts
import { alphabetical } from 'radash'

const gods = [
  { name: 'Ra', power: 100 },
  { name: 'Zeus', power: 98 },
  { name: 'Loki', power: 72 },
  { name: 'Vishnu', power: 100 },
]

alphabetical(gods, g => g.name) // => [Loki, Ra, Vishnu, Zeus]
alphabetical(gods, g => g.name, 'desc') // => [Zeus, Vishnu, Ra, Loki]
```

- 源码解析

函数的实现原理是将输入的数组 array 进行排序，然后返回一个新的排序后的数组。同时，函数还支持指定排序的顺序为升序（'asc'）或降序（'desc'）。

```ts
// 该函数接受一个readonly T[]类型的array
// 和一个(item: T) => string类型的getter函数，
// 以及一个默认值为'asc'的dir参数
export const alphabetical = <T>(
  array: readonly T[],
  getter: (item: T) => string,
  dir: 'asc' | 'desc' = 'asc'
) => {
  // 检查array是否为空，如果为空，则返回一个空数组
  if (!array) return []
  // 定义两个比较函数asc和dsc，分别用于实现升序和降序的排序
  const asc = (a: T, b: T) => `${getter(a)}`.localeCompare(getter(b))
  const dsc = (a: T, b: T) => `${getter(b)}`.localeCompare(getter(a))
  return
  // 使用array.slice()方法创建一个新数组newArray，该数组浅拷贝原始数组array
  array
    .slice()
    // 使用sort方法对newArray进行排序
    // 排序的比较函数为dir === 'desc' ? dsc : asc，
    // 即如果dir为'desc'，则使用dsc比较函数，否则使用asc比较函数
    // 最后返回排序后的newArray
    .sort(dir === 'desc' ? dsc : asc)
}
```

- 注意事项

1. 由于函数使用了 readonly 修饰符，这意味着您`不能直接修改输入数组 array`。为了避免混淆，建议使用 array.slice() 创建一个新的数组进行排序。后面的 readonly 同，就不赘述了
2. 函数 getter 函数用于获取每个元素的排序关键字，这对于实现自定义排序非常灵活。例如，如果需要根据某个属性排序，可以使用 getter = (item: T) => item.sortKey。
3. 函数默认使用升序（'asc'）进行排序，如果需要使用降序（'desc'），只需在调用时指定 dir 参数即可，例如 alphabetical(array, getter, 'desc')。

## boil

将项目列表减少到一项

- 基本用法

给定一个项目数组，返回赢得比较条件的最终项目。对于更复杂的最小/最大有用。

```ts
import { boil } from 'radash'

const gods = [
  { name: 'Ra', power: 100 },
  { name: 'Zeus', power: 98 },
  { name: 'Loki', power: 72 },
]

boil(gods, (a, b) => (a.power > b.power ? a : b))
// => { name: 'Ra', power: 100 }
```

- 源码解析

```ts
export const boil = <T>(
  // 同上，就不赘述了。数组不可更改
  array: readonly T[],
  // compareFunc 是一个比较函数。这里作为参数，并返回一个T类型的值
  compareFunc: (a: T, b: T) => T
) => {
  // 首先检查array是否为空；如果为空，则返回null
  if (!array || (array.length ?? 0) === 0) return null
  // 使用reduce方法结合compareFunc函数来计算数组中的所有元素的和
  return array.reduce(compareFunc)
  // 这里你可能会好奇, 默认值是什么呢?
  // reduce方法会从左到右遍历数组，每次将当前元素 a 与上一个元素 b 传入compareFunc函数，
  // 并将结果与下一个元素继续传入compareFunc函数，直到遍历完整个数组。
  // 我们看示例。 比较函数 (a, b) => a.power > b.power
  // 表示如果a的power大于b的power，则返回a，否则返回b。
  // 100 > 98， 所以 { name: 'Ra', power: 100 } 保留了，然后
  // { name: 'Ra', power: 100 } 保留， 继续与 { name: 'Loki', power: 72 } 作比较
  // { name: 'Ra', power: 100 } 仍保留，遍历结束，作为最终的返回值
}
```

## cluster

将列表拆分为多个给定大小的列表.

- 基本用法

给定一个项目数组和所需的列表大小 (n)，返回一个数组数组。每个包含 n（列表大小）项的子数组尽可能均匀地分割。

```ts
import { cluster } from 'radash'

const gods = [
  'Ra',
  'Zeus',
  'Loki',
  'Vishnu',
  'Icarus',
  'Osiris',
  'Thor',
  'Apollo',
  'Artemis',
  'Athena',
]

cluster(gods, 3)
// => [
//   [ 'Ra', 'Zeus', 'Loki' ],
//   [ 'Vishnu', 'Icarus', 'Osiris' ],
//   ['Thor', 'Apollo', 'Artemis'],
//   ['Athena']
// ]
```

- 源码解析

```ts
// 将一个数组list按照指定的size大小进行分组，返回一个由分组结果组成的二维数组
export const cluster = <T>(list: readonly T[], size: number = 2): T[][] => {
  // 计算分组后的集群数量 clusterCount
  const clusterCount = Math.ceil(list.length / size)
  // 使用Array.fill()方法创建一个包含clusterCount个null（用于占位）的数组clusters
  return (
    new Array(clusterCount)
      .fill(null)
      // 遍历clusters数组，为每个集群分配一组数据
      .map((_c: null, i: number) => {
        // 使用slice()方法从list中切出当前集群的数据，
        // 切片的起始位置为i * size，结束位置为i * size + size
        return list.slice(i * size, i * size + size)
        // 将切出的数据添加到当前集群的位置，
        // _c 就是一个集群，所包含的就是本次slice() 方法切出的数据（理解为前端分页就成）
      })
  )
}
```

## counting

创建一个包含项目出现次数的对象

- 基本用法

给定一个对象数组和一个身份回调函数来确定如何识别每个对象。返回一个对象，其中键是回调返回的 id 值，每个值都是一个整数，表示该 id 出现了多少次。

```ts
import { counting } from 'radash'

const gods = [
  { name: 'Ra', culture: 'egypt' },
  { name: 'Zeus', culture: 'greek' },
  { name: 'Loki', culture: 'greek' },
]

counting(gods, g => g.culture) // => { egypt: 1, greek: 2 }
```

- 源码分析

这个函数的目的是计算给定列表中每个元素的身份表示（通过 identity 函数）的计数

```ts
export const counting = <T, TId extends string | number | symbol>(
  list: readonly T[],
  // identity是一个类型参数，它可以是字符串、数字或符号
  identity: (item: T) => TId
): Record<TId, number> => {
  // 我们检查list是否为空，如果为空，则返回一个空的记录，其中键是TId类型，值是number类型
  if (!list) return {} as Record<TId, number>

  return list.reduce((acc, item) => {
    // 使用identity函数将item转换为TId类型
    // 鼠标移动到 id -> TId extends string | number | symbol
    const id = identity(item)
    // 检查acc中是否已经存在id，如果存在，则将id对应的值加1，否则将id设置为1
    acc[id] = (acc[id] ?? 0) + 1
    // 继续看示例，一开始也就是 {}，没有 egypt 所以
    // acc[egypt] = 0，那么第一次遍历 acc[egypt] = 0 + 1
    // 这里就不展开了，打个断点调试就会很清楚了
    // 最终得到 => { egypt: 1, greek: 2 }
    return acc
  }, {} as Record<TId, number>)
  // 默认值为 {}
}
```

## diff

创建两个数组之间的差异的数组

- 基本用法

给定两个数组，返回第一个数组中存在但第二个数组中不存在的所有项目的数组。

```ts
import { diff } from 'radash'

const oldWorldGods = ['ra', 'zeus']
const newWorldGods = ['vishnu', 'zeus']

diff(oldWorldGods, newWorldGods) // => ['ra']
```

- 源码解析

这个函数可以用于实现两个不同集合的差异操作

```ts
export const diff = <T>(
  root: readonly T[],
  other: readonly T[],
  // 见下面的identity拆解. 理清楚了再回过头来看就简单多了
  identity: (item: T) => string | number | symbol = (t: T) =>
    t as unknown as string | number | symbol
): T[] => {
  // 边界判断，如果两个数组都为空，则返回空数组
  if (!root?.length && !other?.length) return []
  // 如果root为空，则返回other
  if (root?.length === undefined) return [...other]
  // 如果other为空，则返回root
  if (!other?.length) return [...root]

  // 构建一个bKeys对象：用 identity 值作为键的布尔值对象
  const bKeys = other.reduce((acc, item) => {
    // identity('vishnu') -> 'vishnu'
    // 打断点代入一下：
    // bKeys = { vishnu: true, zeus: true }
    acc[identity(item)] = true
    return acc
  }, {} as Record<string | number | symbol, boolean>)

  // 使用 filter 方法遍历 root 集合，对于每个元素 a，
  // 如果 bKeys 中不存在 identity(a) 作为键，则将 a 添加到新集合中
  // 接着上面的代码继续代入：
  // !bKeys['ra'] -> true
  // !bKeys['zeus'] -> false
  // 所以最终返回的结果是 ['ra']
  return root.filter(a => !bKeys[identity(a)])
}
```

说实话，我在这也卡住了。但既然说好了不能逃避，那就试试把 identity 拆解，看看能不能理解。

```ts
// diff函数接受一个类型为 T
// 疑问：这里 是 T，返回的是 T[] 啊？不一样啊？
// 我们看示例，传的 其实是 params: { o: string[], n: string[] }，
// 最终返回的是 string[]，所以确实是 T[] 没毛病

// 该函数实现基于 TypeScript 的内置类型转换，
// 它会将传入的值转换为 string、number 或 symbol 类型之一
const diff = <T>(identity: (item: T) =>
  (
    string |
    number |
    symbol
  ) = (t: T) => (t as unknown) as (string | number | symbol)
  // 这里将变量 t 转换为未知类型（unknown）
  // 然后强制将其转换为 string、number 或 symbol 之一
  // 这样可以确保函数返回的类型是预期的类型之一
): T[] {}
```

::: warning 注意：
在实际应用中，应该根据具体情况来判断是否需要这种类型的转换，并确保有适当的类型检查和错误处理机制。
:::

## flat

将数组的数组展平为一维。

> 印象中最新 ESNext 貌似增加了该方法，这里也可学习下。

- 基本用法

给定一个包含许多数组的数组，返回一个新数组，其中子级的所有项目都出现在顶层。

```ts
import { flat } from 'radash'

const gods = [['ra', 'loki'], ['zeus']]
flat(gods) // => [ra, loki, zeus]
```

- 源码解析

通过 reduce 函数遍历多维数组的每一层，将当前层的元素推入 acc 数组，然后返回 acc 数组，从而实现拍平的效果。

```ts
export const flat = <T>(lists: readonly T[][]): T[] => {
  return lists.reduce((acc, list) => {
    // 在reduce函数的回调函数中，将当前层的元素推入acc数组，然后返回acc数组
    acc.push(...list)
    // 遍历lists数组完成后，acc数组中包含了所有层的元素，即为展平后的数组
    return acc
  }, [])
  // 初始化acc数组为空数组
}
```

::: warning 注意：

1. 请确保 lists 是一个有效的多维数组，否则在 reduce 函数中可能会出现错误。
2. 由于 reduce 函数的回调函数会频繁地创建新的数组，因此在性能上可能不是最优的解决方案。

如果对性能有严格要求，可以考虑使用其他数据结构或算法

:::

## fork

按条件将数组拆分为两个数组

- 基本用法

给定一个项目数组和一个条件，返回两个数组，其中第一个包含通过条件的所有项目，第二个包含未通过条件的所有项目。

```ts
import { fork } from 'radash'

const gods = [
  { name: 'Ra', power: 100 },
  { name: 'Zeus', power: 98 },
  { name: 'Loki', power: 72 },
  { name: 'Vishnu', power: 100 },
]

const [finalGods, lesserGods] = fork(gods, f => f.power > 90)
// [[ra, vishnu, zues], [loki]]
```

- 源码解析

```ts
export const fork = <T>(
  // 由于使用了readonly T[]类型，这意味着list在函数外部无法修改
  list: readonly T[],
  condition: (item: T) => boolean
): [T[], T[]] => {  
  // 非空判断，确定返回类型
  if (!list) return [[], []]
  return list.reduce(
    (acc, item) => {
      // acc 默认值为 [[], []]
      // 这里解构相当于 a = [], b = []
      const [a, b] = acc 
      // 将list中的每个元素依次应用condition函数
      // 根据结果将元素添加到不同的数组中      
      if (condition(item)) {
        return [[...a, item], b]
      } else {
        return [a, [...b, item]]
      }
    },
    // 这里使用了隐式的类型转换as [T[], T[]]
    // 这本身是一个安全的类型转换
    // 为了提高代码的可读性，可以显式地声明返回类型的类型
    [[], []] as [T[], T[]]
  )
}
```

## group

对一组项目进行排序

- 基本用法

给定一个项目数组，group 将构建一个对象，其中每个键都是属于该组的项目的数组。一般来说，这对于对数组进行分类很有用。

```ts
import { group } from 'radash'

const fish = [
  { name: 'Marlin', source: 'ocean' },
  { name: 'Bass', source: 'lake' },
  { name: 'Trout', source: 'lake' },
]

const fishBySource = group(fish, f => f.source)
// => { ocean: [marlin], lake: [bass, trout] }
```

- 源码解析

```ts
// 泛型解析：T 占位，Key 为三个基本类型之一
export const group = <T, Key extends string | number | symbol>(
  // 参数解析：
  // array: 一个只读的 T类型组成的数组（只读 是为了防止在运行时修改数组）
  array: readonly T[],
  // getGroupId: 是个函数，该函数接受一个T类型的参数，并返回一个Key类型的值
  getGroupId: (item: T) => Key
  // 返回一个对象，该对象的键是 Key 类型，值是 T 类型的数组，Partial将对象键都变为可选
): Partial<Record<Key, T[]>> => {
  return array.reduce((acc, item) => {
    // 通过reduce方法遍历数组，对于每个元素，调用getGroupId函数获取其分组ID
    const groupId = getGroupId(item)
    // 然后根据分组ID在 accumulator 中创建或更新一个数组，
    if (!acc[groupId]) acc[groupId] = []
    // 并将当前元素添加到该数组中，最后返回accumulator。
    acc[groupId].push(item)
    return acc
  }, {} as Record<Key, T[]>)
  // 使用 {} as Record<Key, T[]> 来初始化 accumulator
  // 这是 reduce的第二个参数，代表初始值 ，用来存储每次迭代的结果
}
```

::: warning 注意：
这个函数只会创建或更新分组，而不是删除分组。如果需要实现删除分组的功能，可以在 accumulator 中检查对应的分组是否为空，如果为空则删除该分组
:::

## intersects

确定两个数组是否有公共项

- 基本用法

给定两个项目数组，如果两个数组中都存在任何项目，则返回 true。

```ts
import { intersects } from 'radash'

const oceanFish = ['tuna', 'tarpon']
const lakeFish = ['bass', 'trout']

intersects(oceanFish, lakeFish) // => false

const brackishFish = ['tarpon', 'snook']

intersects(oceanFish, brackishFish) // => true
```

- 源码分析

函数的实现原理是将 listB 中的元素映射为一个键值对，然后检查 listA 中是否存在具有相同键的元素。如果存在，则两个列表相交；否则，不相交。

```ts
export const intersects = <T, K extends string | number | symbol>(
  listA: readonly T[],
  listB: readonly T[],
  // K是一个扩展类型，表示转换函数返回的类型。
  identity?: (t: T) => K
): boolean => {
  // 数组空判断，为空直接返false
  if (!listA || !listB) return false

  // 如果identity函数未定义，则使用默认的转换函数
  // 该函数将元素转换为其自身的未知类型。
  const ident = identity ?? ((x: T) => x as unknown as K)

  // 使用reduce方法将listB中的元素映射为一个键值对，生成一个字典dictB
  const dictB = listB.reduce((acc, item) => {
    acc[ident(item)] = true
    return acc
  }, {} as Record<string | number | symbol, boolean>)
  // 使用some方法检查listA中是否存在与dictB中的键相等的元素。
  // 如果存在，则两个列表相交，返回true；否则，不相交，返回false。
  return listA.some(value => dictB[ident(value)])
}
```

## iterate

迭代回调 n 次。该函数可以用于对一些数据进行迭代处理，例如对数组进行去重、排序等操作。

- 基本用法

有点像 forEach 遇到 reduce。对于运行函数 n 次以生成值很有用。 \_.iterate 函数采用计数（运行回调的次数）、回调函数和初始值。回调作为减速器运行多次，然后返回累积值。

```ts
import { iterate } from 'radash'

const value = iterate(
  4,
  (acc, idx) => {
    return acc + idx
  },
  0
) // => 10
```

- 源码解析

实现原理是使用一个循环，每次迭代都调用 func 函数，并将结果赋值给 value 变量。循环将持续进行 count 次。最后返回 value 变量

```ts
export const iterate = <T>(
  // 循环将持续进行count次
  count: number,
  // func函数应该接收两个参数：当前值（currentValue）和当前迭代次数（iteration）
  func: (currentValue: T, iteration: number) => T,
  // initValue参数是初始值
  initValue: T
) => {
  let value = initValue
  for (let i = 1; i <= count; i++) {
    value = func(value, i)
  }
  return value
}
```

## last

获取列表中的最后一项

- 基本用法

给定一个项目数组，返回最后一个项目，如果不存在项目，则返回默认值。

```ts
import { last } from 'radash'

const fish = ['marlin', 'bass', 'trout']
const lastFish = last(fish) // => 'trout'
const lastItem = last([], 'bass') // => 'bass'
```

我们平时都会写 `arr[arr.length - 1]` 那么看下 Radash 源码又有什么不一样吧？

- 源码解析

```ts
export const last = <T>(
  // readonly 不可变数组
  array: readonly T[],
  // 默认值，可选
  defaultValue: T | null | undefined = undefined
) => {
  // 这里用到了 ?. 操作符
  // 先检查array是否为null或undefined，或者是否是一个空数组
  return array?.length > 0
    ? // 如果 array 存在，则返回 array[array.length - 1]
      array[array.length - 1]
    : // 如果 array 不存在，则返回默认值
      defaultValue
  // 如果默认值不存在，则返回 undefined
}
```

使用可选类型可以避免因为检查空数组导致的错误。对比我们平时写的代码多了健全的类型判断，只要注意边界判断，大家都可以写出高质量的代码。

## max

从数组中获取最大的项

- 基本用法

给定一个项数组和一个获取每个项值的函数，返回具有最大值的项。在内部使用 \_.boil。

```ts
import { max } from 'radash'

const fish = [
  {
    name: 'Marlin',
    weight: 105,
    source: 'ocean',
  },
  {
    name: 'Bass',
    weight: 8,
    source: 'lake',
  },
  {
    name: 'Trout',
    weight: 13,
    source: 'lake',
  },
]

max(fish, f => f.weight)
// => {name: "Marlin", weight: 105, source: "ocean"}
```

## min & max

获取数组中最小 / 最大的项（由于实现基本相同，这里放一起说了）

- 基本用法

同上。给定一个项数组和一个获取每个项值的函数，返回具有最小值的项。在内部使用 \_.boil。

```ts
import { min, max } from 'radash'

const fish = [
  {
    name: 'Marlin',
    weight: 105,
    source: 'ocean',
  },
  {
    name: 'Bass',
    weight: 8,
    source: 'lake',
  },
  {
    name: 'Trout',
    weight: 13,
    source: 'lake',
  },
]

min(fish, f => f.weight)
// => {name: "Bass", weight: 8, source: "lake"}
max(fish, f => f.weight)
// => {name: "Marlin", weight: 105, source: "ocean"}
```

- 源码解析

```ts
// 这里是函数重载的运用：
// 1. 接受一个readonly [number, ...number[]]类型的数组，返回一个number类型的最小值
// 这种类型表示法通常用于表示一个不可变的整数数组
export function min(array: readonly [number, ...number[]]): number
// 2. 接受一个readonly number[]类型的数组，返回一个number类型的最小值
export function min(array: readonly number[]): number | null
// 3. 接受一个readonly T[]类型的数组和一个可选的getter函数
// 返回一个T类型的最小值。  这允许min函数处理非数字类型的数据
export function min<T>(array: readonly T[], getter: (item: T) => number): T | null
export function min<T>(array: readonly T[], getter?: (item: T) => number): T | null {
  // 尝试使用getter函数来获取数组中每个元素的值
  const get = getter ?? ((v: any) => v)
  // 如果getter未定义，则使用默认的比较函数（(a, b) => a < b）
  // 我们调用boil函数对数组进行排序，并返回排序后的第一个元素
  return boil(array, (a, b) => (get(a) < get(b) ? a : b))
}

export function max(array: readonly [number, ...number[]]): number
export function max(array: readonly number[]): number | null
export function max<T>(array: readonly T[], getter: (item: T) => number): T | null
export function max<T>(array: readonly T[], getter?: (item: T) => number): T | null {
  const get = getter ?? ((v: any) => v)
  return boil(array, (a, b) => (get(a) > get(b) ? a : b))
}
```

## merge

合并两个列表，覆盖第一个列表中的项

- 基本用法

给定两个项数组和一个标识函数，返回第一个列表中所有与第二个列表匹配的项。

> 这个函数可以用于合并两个数组，特别是当需要根据某些规则（由 matcher 函数定义）来匹配和合并数组中的元素时非常有用。例如，可以在合并用户列表时使用这个函数，根据用户名进行匹配。

```ts
import { merge } from 'radash'

const gods = [
  {
    name: 'Zeus',
    power: 92,
  },
  {
    name: 'Ra',
    power: 97,
  },
]

const newGods = [
  {
    name: 'Zeus',
    power: 100,
  },
]

merge(gods, newGods, f => f.name)
// => [{name: "Zeus" power: 100}, {name: "Ra", power: 97}]
```

> 使用 lib 经常会看到 mergeOptions 方法，原理差不多，用来合并两个对象，覆盖第一个对象中的项。

- 源码解析

```ts
export const merge = <T>(
  root: readonly T[],
  // root和others都是只读的数组
  others: readonly T[],
  // matcher是一个函数，用于比较两个对象的相似性
  matcher: (item: T) => any
) => {
  // 边界、非空判断：这里至少保证该方法返回一个空数组
  if (!others && !root) return []
  if (!others) return root
  if (!root) return []
  if (!matcher) return root

  // reduce方法中的函数会遍历root数组中的每个元素，
  // 并将其与others数组中的每个元素进行比较。
  return root.reduce((acc, r) => {
    const matched = others.find(o => matcher(r) === matcher(o))
    // 如果找到了匹配的元素，则将其添加到结果数组中；
    if (matched) acc.push(matched)
    // 否则，将当前元素添加到结果数组中。
    else acc.push(r)

    // 最后，返回合并后的结果数组。
    return acc
  }, [] as T[])
}
```
