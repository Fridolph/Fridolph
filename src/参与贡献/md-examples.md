# Markdown 扩展示例

这个页面演示了 VitePress 提供的一些内置的 Markdown 扩展。

## 语法高亮

VitePress 使用 [Shikiji](https://github.com/antfu/shikiji) 提供的语法高亮功能，还拥有额外的行高亮等功能。

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

也可以使用 // [!code highlight] 注释实现行高亮。

````md
```js
export default {
  data() {
    return {
      msg: 'Highlighted!', // [!code highlight]
    }
  },
}
```
````

````

## 自定义容器

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
````

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## 自定义标题

可以通过在容器的 "type" 之后附加文本来设置自定义标题。

**输入**

```text
::: danger STOP
危险区域，请勿继续
:::
```

```text
::: details 点我查看代码
\`\`\`js
  console.log('Hello, VitePress!')
\`\`\`
:::
```

::: danger STOP
危险区域，请勿继续
:::

::: details 点我查看代码

```js
console.log('Hello, VitePress!')
```

:::

## 代码块中聚焦

在某一行上添加 `// [!code focus]` 注释将聚焦它并模糊代码的其他部分。

此外，可以使用 `// [!code focus:<lines>]` 定义要聚焦的行数。

## 代码块中的颜色差异

在某一行添加 `// [!code --]` 或 `// [!code ++]` 注释将会为该行创建 diff，同时保留代码块的颜色。

## 高亮“错误”和“警告”

在某一行添加 `// [!code warning]` 或 `// [!code error]` 注释将会为该行相应的着色。

## 导入代码片段

可以通过下面的语法来从现有文件中导入代码片段：

```md
<<< @/filepath

此语法同时支持行高亮：
<<< @/filepath{highlightLines}

如：
<<< @/snippets/snippet.js{2}
```

## 代码组

可以像这样对多个代码块进行分组：

::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::

## 包含 markdown 文件

可以像这样在一个 markdown 文件中包含另一个 markdown 文件，甚至是内嵌的。

::: tip
也可以使用 @，它的值对应于源代码根目录，默认情况下是 VitePress 项目根目录，除非配置了 srcDir。
:::

例如，可以这样用相对路径包含 Markdown 文件：

```md
# Docs

## Basics

<!--@include: ./parts/basics.md-->
```

## 可能遇到的坑

- SSR 兼容性，在导入时访问浏览器 API 的库

<https://vitepress.dev/zh/guide/ssr-compat>

## 更多

可参考官方文档，请查看 Markdown 扩展的完整列表的文档 [full list of markdown extensions](https://vitepress.dev/guide/markdown)
