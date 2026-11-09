# Object

## assign

递归地将两个对象合并在一起

- 基本用法

将两个对象递归地合并为一个新对象，并从右到左应用值。递归仅适用于子对象属性。

```ts
import { assign } from 'radash'

const ra = {
  name: 'Ra',
  power: 100,
}

assign(ra, { name: 'Loki' })
// => { name: Loki, power: 100 }
```

- 源码解析

它使用了 TypeScript 的泛型来确保合并后的对象类型与输入对象的类型一致

```ts
// 这行代码定义了一个泛型 X，它表示一个对象类型，该对象可以包含字符串、符号或数字类型的键，并且每个键对应的值可以是任意类型
export const assign = <X extends Record<string | symbol | number, any>>(
  initial: X,
  override: X
): X => {
  // 如果 initial 或 override 其中一个为 null 或 undefined，则返回另一个参数，
  // 如果两个参数都为 null 或 undefined，则返回一个空对象
  if (!initial || !override) return initial ?? override ?? {}

  // 合并对象的逻辑：
  // 1. 使用扩展运算符 { ...initial, ...override } 将两个对象合并成一个新对象
  // 2. 使用 Object.entries 方法将合并后的对象转换为一个键值对数组
  // 3. 使用 reduce 方法遍历键值对数组，将每个键值对合并到累加器对象 acc 中
  return Object.entries({ ...initial, ...override }).reduce((acc, [key, value]) => {
    return {
      ...acc,
      // 对于每个键值对，如果 initial 对象中对应的值是一个对象，则递归调用 assign 函数进行合并；否则直接使用 value
      [key]: (() => {
        if (isObject(initial[key])) return assign(initial[key], value)
        // if (isArray(value)) return value.map(x => assign)
        return value
      })(),
    }
  }, {} as X)
}
```

## clone

clone 函数的主要用途是深度克隆一个对象，包括其所有属性和嵌套对象。这对于需要创建对象副本的场景非常有用，比如在函数参数传递时避免修改原始对象，或者在对象复制时保留对象的引用关系

- 基本用法

创建给定对象/值的浅副本。

```ts
import { clone } from 'radash'

const ra = {
  name: 'Ra',
  power: 100,
}

const gods = [ra]

clone(ra) // => copy of ra
clone(gods) // => copy of gods
```

- 源码解析

```ts
export const clone = <T>(obj: T): T => {
  // 1. 判断是否为原始值
  if (isPrimitive(obj)) {
    return obj
  }

  // 2. 处理函数
  // 如果对象是一个函数，则使用 bind 方法将其绑定到一个空对象上，并返回这个新的函数。
  // 这是因为函数对象不能直接通过赋值来克隆，需要通过 bind 方法创建一个新的函数对象
  if (typeof obj === 'function') {
    return obj.bind({})
  }

  // 3. 创建新对象
  const newObj = new ((obj as object).constructor as { new (): T })()

  // 4. 复制属性：
  Object.getOwnPropertyNames(obj).forEach(prop => {
    // 使用 Object.getOwnPropertyNames 获取原对象的所有属性名，然后遍历这些属性名，将原对象上的属性值复制到新对象上。这里使用了 any 类型绕过 TypeScript 的类型检查，因为原始值已经在前面处理过了
    ;(newObj as any)[prop] = (obj as any)[prop]
  })

  return newObj
}
```

## construct

从关键路径和值构建对象

- 基本用法

这个函数的主要用途是将一个对象的结构保持不变，但将其键值对转换到一个新的对象中。这在需要创建对象的深拷贝，或者需要将对象的结构重新组织时非常有用

```ts
import { construct } from 'radash'

const flat = {
  name: 'ra',
  power: 100,
  'friend.name': 'loki',
  'friend.power': 80,
  'enemies.0.name': 'hathor',
  'enemies.0.power': 12,
}

construct(flat)
// {
//   name: 'ra',
//   power: 100,
//   friend: {
//     name: 'loki',
//     power: 80
//   },
//   enemies: [
//     {
//       name: 'hathor',
//       power: 12
//     }
//   ]
// }
```

- 源码解析

```ts
// 泛型定义：<TObject extends object>
// 表示construct函数接受一个泛型参数TObject，该参数必须是一个对象类型
export const construct = <TObject extends object>(obj: TObject): object => {
  // 参数检查：函数首先检查传入的obj是否为null或undefined。如果是，则返回一个空对象{}
  if (!obj) return {}
  // 键值对转换：如果obj不为空，函数使用Object.keys(obj)获取obj的所有键，然后使用reduce方法遍历这些键
  return Object.keys(obj).reduce((acc, path) => {
    // 递归设置值：在reduce的回调函数中，使用set函数（假设set是一个已定义的函数）将obj中对应键的值设置到累加器对象acc中。set函数的职责是将值递归地设置到累加器对象的指定路径上
    return set(acc, path, (obj as any)[path])
    // 返回结果：最终，reduce返回累加器对象acc，即转换后的新对象
  }, {})
}
```

## crush

将深层对象展平为单一维度

- 基本用法

和 construct 反过来

```ts
import { crush } from 'radash'

const ra = {
  name: 'ra',
  power: 100,
  friend: {
    name: 'loki',
    power: 80,
  },
  enemies: [
    {
      name: 'hathor',
      power: 12,
    },
  ],
}

crush(ra)
// {
//   name: 'ra',
//   power: 100,
//   'friend.name': 'loki',
//   'friend.power': 80,
//   'enemies.0.name': 'hathor',
//   'enemies.0.power': 12
// }
```

- 源码解析

```ts
export const crush = <TValue extends object>(value: TValue): object => {
  if (!value) return {}
  return objectify(
    keys(value),
    k => k,
    k => get(value, k)
  )
}
```

## get

使用深层路径获取任何属性或子属性。这个函数可以用于从嵌套对象中获取值，而不必担心路径中的某个键不存在。例如，你可以使用它来从 JSON 数据中提取嵌套的属性值。

- 基本用法

给定任何值和一个选择函数来获取所需的属性，返回所需的值，如果找不到所需的值，则返回默认值。

```ts
import { get } from 'radash'

const fish = {
  name: 'Bass',
  weight: 8,
  sizes: [
    {
      maturity: 'adult',
      range: [7, 18],
      unit: 'inches',
    },
  ],
}

get(fish, 'sizes[0].range[1]') // 18
get(fish, 'sizes.0.range.1') // 18
get(fish, 'foo', 'default') // 'default'
```

- 源码解析

```ts
export const get = <TDefault = unknown>(
  value: any,
  path: string,
  defaultValue?: TDefault
): TDefault => {
  // 使用正则表达式将路径字符串分割成多个段，这些段是路径中的键。
  // 例如，路径 "a.b[0].c" 会被分割成 ["a", "b", "0", "c"]
  const segments = path.split(/[\.\[\]]/g)
  let current: any = value
  // 然后遍历路径段
  for (const key of segments) {
    // 为 null或undefined 返回默认值
    if (current === null) return defaultValue as TDefault
    if (current === undefined) return defaultValue as TDefault
    // 去除键中的引号，如果去除引号后的键为空字符串，则跳过该段。
    const dequoted = key.replace(/['"]/g, '')
    if (dequoted.trim() === '') continue
    // 使用当前键从 current 对象中获取嵌套值。
    current = current[dequoted]
  }
  // 如果最终 current 为 undefined，则返回默认值；否则返回 current
  if (current === undefined) return defaultValue as TDefault
  return current
}
```
