# Random

## draw

从列表中获取随机项目

- 基本用法

用于从数组中随机选择一个元素。使用 Math.random() 函数生成一个 0 到数组长度减 1 之间的随机索引，然后返回该索引对应的数组元素

```ts
import { draw } from 'radash'

const fish = ['marlin', 'bass', 'trout']
draw(fish) // => a random fish
```

- 源码解析

```ts
export const draw = <T>(array: readonly T[]): T | null => {
  const max = array.length
  // 首先，该函数检查数组是否为空。如果数组为空，则返回null
  if (max === 0) return null

  // 然后，使用random函数生成一个介于0（包括）和数组长度减1（不包括）之间的随机索引
  // random函数的实现细节没有给出，但通常情况下
  // 这个函数会返回一个基于随机数生成器的随机整数
  const index = random(0, max - 1)

  // 最后，返回数组中索引为生成的随机索引的元素
  return array[index]
}
```

::: warning 注意事项：

1. 确保数组 array 已经定义并且不为空，否则`array[index]`将会抛出异常
2. 函数没有处理可能的错误情况，例如当 array 为空时，直接访问 array[0]可能会导致 TypeError: Cannot read property '0' of undefined 异常。

:::

## random

该函数接受两个参数 min 和 max，并返回一个随机整数.

- 基本用法

生成一个范围内的数字。此函数旨在用于实用用途，而不是加密。

```ts
import { random } from 'radash'

random(0, 100)
// => 输出一个1到100之间的随机整数
```

- 源码解析

```ts [源码]
export const random = (min: number, max: number) => {
  // 1. 使用Math.random() 函数生成一个0到1之间的随机数
  // 2. 然后将其乘以max - min + 1，再加上min，得到一个随机整数
  // 注意max - min + 1是为了确保结果是整数，避免小数点
  return Math.floor(Math.random() * (max - min + 1) + min)
}
```

::: warning 注意事项：

1. 参数 min 必须小于等于 max。如果 min 大于 max，函数将返回 undefined。
2. 由于 Math.random() 返回的是 0 到 1 之间的随机数，所以如果需要生成一个非整数的随机数，需要先将 min 乘以一个小于 1 的小数，然后将 max 乘以一个小于 1 的大数，以确保结果是一个非整数的随机数。

:::

## shuffle

随机打乱数组

- 基本用法

这个函数可以用于对数组进行随机洗牌，特别是在某些需要随机顺序的算法中，例如排序算法的一部分。

```ts
import { shuffle } from 'radash'

const fish = [
  { name: 'Marlin', weight: 105, source: 'ocean' },
  { name: 'Salmon', weight: 22, source: 'river' },
  { name: 'Salmon', weight: 22, source: 'river' },
]

shuffle(fish)
```

- 源码解析

```ts
export const shuffle = <T>(array: readonly T[]): T[] => {
  return (
    array
      // 首先，使用.map()方法将输入数组的每个元素映射为一个包含随机数和值的对象，这样，我们得到了一个包含随机数的新数组
      .map(a => ({ rand: Math.random(), value: a }))
      // 然后，使用.sort()方法根据随机数对数组进行排序。这样，随机数小的元素将出现在数组的顶部。
      .sort((a, b) => a.rand - b.rand)
      // 最后，使用.map()方法将排序后的数组中的值映射回原始类型T。这样，我们就得到了一个随机打乱顺序的数组
      .map(a => a.value)
  )
}
```

## uid

生成唯一标识符

- 基本用法

该函数用于生成指定长度的随机唯一标识符（UID）。函数的实现原理是：使用迭代和随机数生成器来生成随机字符串。

```ts
export const uid = (length: number, specials: string = '') => {
  // 首先，定义了一个characters变量，它是一个由大小写字母和数字组成的字符串，以及可选的特殊字符
  // 这个字符串在每次调用uid函数时都会被重新创建，以确保使用相同的字符集
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + specials

  // 然后，使用iterate函数来迭代生成随机字符串
  // iterate函数的实现原理是一个accumulator（累加器）变量，它初始化为空字符串，并在每次迭代中累加新的字符
  // 最后，iterate函数返回累加器字符串
  return iterate(
    length,
    acc => {
      // 在uid函数内部，我们使用random函数来生成一个介于0（包括）和characters.length - 1（不包括）之间的随机整数
      // 然后，我们使用这个随机整数从characters字符串中提取一个字符，并将其添加到累加器字符串中
      return acc + characters.charAt(random(0, characters.length - 1))
      // 每次调用uid函数时，都会创建一个新的characters字符串，以确保生成的随机字符串是唯一的
      // 这可以通过使用Set集合来实现，但这样会引入不必要的性能开销。因此，我们使用一个字符串来存储有效的字符，并在每次迭代时重新创建。
    },
    ''
  )
}
```

> 请注意，此函数针对简单性和可用性进行了优化，而不是针对性能或安全性进行了优化。
> 如果您需要创建通用唯一或加密随机字符串，请使用专门用于该目的的包。
