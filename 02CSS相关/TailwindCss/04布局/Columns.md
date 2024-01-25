## Columns

<https://www.tailwindcss.cn/docs/columns>

CSS 属性 columns 用来设置元素的列宽和列数。它是一个简写属性，可在单个方便的声明中设置 column-width (en-US) 和 column-count 属性。与所有简写属性一样，任何省略的子值都将设置为其初始值。

根据列数添加

使用 columns-{count} 实用程序设置应为元素内的内容创建的列数。列宽将自动调整以适应该数字。

## 语法

```css
/* Column width */
columns: 18em;

/* Column count */
columns: auto;
columns: 2;

/* Both column width and count */
columns: 2 auto;
columns: auto 12em;
columns: auto auto;

/* Global values */
columns: inherit;
columns: initial;
columns: unset;
```

- <'column-width'>

理想的列宽，定义为 `<length>` 或 auto 关键字。实际宽度可以更宽或更窄以适合可用空间。See column-width (en-US)。

- <'column-count'>

元素内容应分成的理想列数，定义为 `<integer>` 或 auto 关键字。如果此值和列的宽度都不是 auto ，则它仅指示允许的最大列数。请参阅 column-count 。

## 用法

| Class     | Properties  |
| --------- | ----------- |
| columns-1 | columns: 1; |
| columns-2 | columns: 2; |
| columns-3 | columns: 3; |
| columns-4 | columns: 4; |
| columns-5 | columns: 5; |
| columns-6 | columns: 6; |
| columns-7 | columns: 7; |
| columns-8 | columns: 8; |
