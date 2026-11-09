# String

字符串相关处理的函数

## camel

将输入字符串转换为驼峰命名法（Camel Case）

- 基本用法

给定一个字符串，以驼峰式大小写格式返回它。

```ts
import { camel } from 'radash'

camel('green fish blue fish') // => greenFishBlueFish
```

- 源码解析

```ts
export const camel = (str: string): string => {
  const parts =
    str
      // 使用正则表达式，将输入字符串中的所有大写字母转换为小写字母
      ?.replace(/([A-Z])+/g, capitalize)
      // 并将非大写字母的连续字符组合分割为数组
      ?.split(/(?=[A-Z])|[\.\-\s_]/)
      .map(x => x.toLowerCase()) ?? []

  // 函数在输入字符串为空或空字符串时返回空字符串
  if (parts.length === 0) return ''
  // 函数在输入字符串只有一个字符时，直接返回该字符（大写的）
  if (parts.length === 1) return parts[0]

  // 使用reduce方法，将遍历后的字符串数组拼接成一个完整的字符串
  return parts.reduce((acc, part) => {
    // part.charAt(0) 拿到第一个字符，通过 toUpperCase() 变成大写
    // port.slice(1) 拿到除了第一个字符以外的所有字符
    // 最后拼接起来
    return `${acc}${part.charAt(0).toUpperCase()}${part.slice(1)}`
  })
}
```

## capitalize

先将字符串转换为小写，然后将第一个字母转换为大写。

- 基本用法

给定一个字符串，返回它的第一个字母大写，所有其他字母小写。

```ts
import { capitalize } from 'radash'

capitalize('green fish blue FISH')
// => Green fish blue fish
```

- 源码解析

```ts
export const capitalize = (str: string): string => {
  // 函数在输入字符串为空或空字符串时返回空字符串
  if (!str || str.length === 0) return ''
  // 这是一个良好的实践，有助于避免在后续处理中出现错误

  const lower = str.toLowerCase()
  return lower.substring(0, 1).toUpperCase() + lower.substring(1, lower.length)
}
```

::: warning
函数在处理特殊字符时可能会产生不期望的结果，例如中文、日文、韩文等非英文字符。在这些情况下，函数可能无法正确地转换为大写开头
:::

## dash

这个函数可以将字符串转换为 dash-case 格式的字符串。

- 基本用法

给定一个字符串，以破折号格式返回它。

```ts
import { dash } from 'radash'
dash('green fish blue fish')
// => green-fish-blue-fish
```

```ts
export const dash = (str: string): string => {
  const parts =
    str
      // 匹配大写字母组成的单词（capitalize）
      // 将匹配到的单词的首字母转换为小写，并将其余字母保持原样
      ?.replace(/([A-Z])+/g, capitalize)
      // 根据正则表达式匹配到的单词和各种标点符号来分割字符串
      ?.split(/(?=[A-Z])|[\.\-\s_]/)
      // 将分割后的字符串数组中的每个字符串转换为小写
      .map(x => x.toLowerCase()) ?? []

  // 如果分割后的字符串数组为空，则返回空字符串
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]
  // 否则，使用reduce方法将字符串数组中的每个字符串连成一个字符串，每个字符串之间用连字符(-)分隔
  return parts.reduce((acc, part) => {
    return `${acc}-${part.toLowerCase()}`
  })
}
```

::: warning
函数缺乏类型检查，无法保证传入的字符串参数 str 一定是一个字符串。在实际使用中，应该确保传入的是一个字符串
:::

## pascal

将字符串转换为帕斯卡大小写

- 基本用法

以帕斯卡大小写方式格式化给定的字符串。

```ts
import { pascal } from 'radash'

pascal('hello world') // => 'HelloWorld'
pascal('va va boom') // => 'VaVaBoom'
```

- 源码解析

```ts
export const pascal = (str: string): string => {
  // 使用正则表达式/[\.\-\s_]/分割字符串，得到一个字符串数组parts
  const parts = str?.split(/[\.\-\s_]/).map(x => x.toLowerCase()) ?? []
  if (parts.length === 0) return ''
  return (
    parts
      // 遍历parts数组，对每个单词的首字母进行大写转换，其他字母进行小写转换。
      .map(str => str.charAt(0).toUpperCase() + str.slice(1))
      // 将处理后的单词连接起来，返回结果
      .join('')
  )
}
```

::: warning 注意事项：

1. 函数使用了可选链操作符 `?.` 来处理传入的 str 是否为 null 或 undefined 的情况。
2. 正则表达式/[\.\-\s_]/用于分割字符串，其中 `. 代表任意字符， `-` 代表连字符，`\_` 代表下划线。
3. 函数返回结果后，如果 parts 数组为空，则返回空字符串。

:::

## snake

这个函数可以用于将各种格式的字符串转换为下划线分隔的 camelCase 格式的字符串，常用于命名对象的属性或方法。

- 基本用法

给定一个字符串，以蛇形格式返回它。

```ts
import { snake } from 'radash'

snake('green fish blue fish')
// => green_fish_blue_fish
```

- 源码解析

```ts
export const snake = (
  str: string,
  options?: {
    splitOnNumber?: boolean
  }
): string => {
  const parts =
    str
      // 使用正则匹配大写字母组成的单词，并将这些单词转换为小写
      ?.replace(/([A-Z])+/g, capitalize)
      // 然后，使用split方法将字符串分割成一个数组
      // 并将所有的点、减号、空格和下划线替换为空格。
      .split(/(?=[A-Z])|[\.\-\s_]/)
      // 使用map方法将数组中的每个元素转换为小写
      .map(x => x.toLowerCase()) ?? []
  // 如果数组为空，则返回空字符串
  if (parts.length === 0) return ''
  // 如果数组只有一个元素，则直接返回该元素。
  if (parts.length === 1) return parts[0]

  // 使用reduce方法将数组中的元素连接成一个字符串，每个元素之间使用下划线连接。
  const result = parts.reduce((acc, part) => {
    return `${acc}_${part.toLowerCase()}`
  })
  return options?.splitOnNumber === false
    ? result
    : // 匹配一个字母后跟一个数字的情况，并将这些匹配到的字符串替换为下划线分隔的形式
      result.replace(/([A-Za-z]{1}[0-9]{1})/, val => `${val[0]!}_${val[1]!}`)
}
```

## template

给定一个字符串、一个数据对象和一个要搜索的格式表达式，返回一个字符串，其中与搜索匹配的所有元素都替换为数据对象中的匹配值。

- 基本用法

这个函数可以用于各种场景，例如在字符串模板中替换占位符，或者在邮件发送时替换用户信息。

```ts
import { template } from 'radash'

template('It is {{color}}', { color: 'blue' }) 
// => It is blue
template('It is <color>', { color: 'blue' }, /<(.+?)>/g) 
// => It is blue
```

- 源码解析

```ts
export const template = (str: string, data: Record<string, any>, regex = /\{\{(.+?)\}\}/g) => {
  // 使用Array.from()方法将match数组转换为一个新的数组，并将其作为参数传递给reduce()方法。
  // 匹配字符串str中的占位符，并将它们存储在match数组中
  return (
    Array.from(str.matchAll(regex))
      // 遍历match数组
      .reduce((acc, match) => {
        // 对于每个匹配项，将传入data[match[1]] 替换当前 match[0]
        return acc.replace(match[0], data[match[1]])
      }, str)
  )
}
```

## title

将字符串转换为标题大小写
  
- 基本用法

以标题大小写方式格式化给定的字符串

```ts
import { title } from 'radash'

title('hello world') // => 'Hello World'
title('va_va_boom') // => 'Va Va Boom'
title('root-hook') // => 'Root Hook'
title('queryItems') // => 'Query Items'
```

- 源码解析

```ts
export const title = (str: string | null | undefined): string => {
  if (!str) return ''
  return (
    str
      // 保留大小写和空格，并去除其他字符
      .split(/(?=[A-Z])|[\.\-\s_]/)
      // 使用map和filter方法过滤掉空字符串
      .map(s => s.trim())
      .filter(s => !!s)
      // 使用capitalize函数将每个单词的首字母大写
      .map(s => capitalize(s.toLowerCase()))
      // 使用join方法将剩余的字符连接成一个字符串
      .join(' ')
  )
}
```

## trim

使用正则表达式来匹配字符串的开头和结尾，并将其中的 charsToTrim 替换为空字符串。这样可以实现 trim 功能。

- 基本用法

```ts
import { trim } from 'radash'

trim('  hello ') // => hello
trim('__hello__', '_') // => hello
trim('/repos/:owner/', '/') // => repos/:owner

// Trim 还可以处理多个要修剪的字符。
trim('222__hello__111', '12_') // => hello
```

- 源码解析

```ts
export const trim = (str: string | null | undefined, charsToTrim: string = ' ') => {
  // 空校验
  if (!str) return ''
  // 字符集处理：将charsToTrim转换为一个正则表达式可识别的字符集
  // 通过replace方法将所有非字母、数字和空格的字符替换为\\加相应字符
  const toTrim = charsToTrim.replace(/[\W]{1}/g, '\\$&')
  // 使用RegExp构造函数创建一个正则表达式对象，匹配：
  // 以 toTrim 开头 或者
  // 以 toTrim 结尾 的字符串
  // g 标志表示全局搜索
  const regex = new RegExp(`^[${toTrim}]+|[${toTrim}]+$`, 'g')
  // 使用replace方法将str中的匹配项替换为空字符串
  return str.replace(regex, '')
}
```

::: warning
这个函数在处理空字符串时会返回空字符串，而不是 null 或 undefined，这与 JavaScript 的默认行为不同。这是为了保持函数的一致性
:::
