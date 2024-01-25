# white-space

CSS white-space 属性用于设置如何处理元素内的空白字符。

这个属性指定了两件事：

- 空白字符是否合并，以及如何合并。
- 是否换行，以及如何换行。

> 备注： 要使单词可以在其内部被截断，请使用 overflow-wrap、word-break 或 hyphens 代替。

## 语法

```css
/* 单个关键字值 */
white-space: normal;
white-space: nowrap;
white-space: pre;
white-space: pre-wrap;
white-space: pre-line;
white-space: break-spaces;

/* white-space-collapse 和 text-wrap 简写值 */
white-space: collapse balance;
white-space: preserve nowrap;

/* 全局值 */
white-space: inherit;
white-space: initial;
white-space: revert;
white-space: revert-layer;
white-space: unset;
```

## 取值

- normal 连续的空白符会被合并。源码中的换行符会被当作空白符来处理。并根据填充行框盒子的需要来换行。

- nowrap 和 normal 一样合并空白符，但阻止源码中的文本换行。

- pre 连续的空白符会被保留。仅在遇到换行符或 `<br>` 元素时才会换行。

- pre-wrap 连续的空白符会被保留。在遇到换行符或 `<br>` 元素时，或者根据填充行框盒子的需要换行。

- pre-line 连续的空白符会被合并。在遇到换行符或 `<br>` 元素时，或者根据填充行框盒子的需要换行。

- break-spaces 与 pre-wrap 的行为相同，

# Whitespace

## 用法

| Class                   | Properties                 |
| ----------------------- | -------------------------- |
| whitespace-normal       | white-space: normal;       |
| whitespace-nowrap       | white-space: nowrap;       |
| whitespace-pre          | white-space: pre;          |
| whitespace-pre-line     | white-space: pre-line;     |
| whitespace-pre-wrap     | white-space: pre-wrap;     |
| whitespace-break-spaces | white-space: break-spaces; |
