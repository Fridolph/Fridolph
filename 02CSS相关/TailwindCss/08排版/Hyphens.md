# hyphens

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/hyphens>

CSS 属性 hyphens 告知浏览器在换行时如何使用连字符连接单词。可以完全阻止使用连字符，也可以控制浏览器什么时候使用，或者让浏览器决定什么时候使用。

连字规则具有语言特定性。在 HTML 中，语言由 lang 属性决定，浏览器只会在当前属性存在且有合适的连字字典可用的情况使用连字进行连接。在 XML 中，必须使用 xml:lang 属性。

## 语法

```css
hyphens: none;
hyphens: manual;
hyphens: auto;

/* Global values */
hyphens: inherit;
hyphens: initial;
hyphens: unset;
```

## 取值

- none 即便单词内有建议换行点也不会在那里换行。只会在空白符处换行。

- manual 只有当单词内存在建议换行点时，才会在该位置断开单词并使用连字符换行。查看建议换行点了解详情。

- auto 浏览器可以自由地在适当的连字符点处自动断词，遵循它选择使用的任何规则。建议的断线机会（如建议断线机会中所述）应优先于尽可能自动选择断点。

> 备注： auto 的行为取决于语言是否被正确地设置，以便可以选择适当的断词规则。你必须使用 HTML 属性 lang 指定语言，以确保自动断词在你选择的语言中得到应用。

# Hyphens

<https://www.tailwindcss.cn/docs/hyphens>

## 用法

| Class          | Properties       |
| -------------- | ---------------- |
| hyphens-none   | hyphens: none;   |
| hyphens-manual | hyphens: manual; |
| hyphens-auto   | hyphens: auto;   |
