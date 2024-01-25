# text-wrap

文本包装 CSS 属性控制元素内部的文本如何包装。不同的值提供：

- 印刷的改进，例如跨标题跨越更平衡的线长度
- 一种完全关闭文本包装的方法。

<https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap>

## 语法

```css
/* Keyword values */
text-wrap: wrap;
text-wrap: nowrap;
text-wrap: balance;
text-wrap: pretty;
text-wrap: stable;

/* Global values */
text-wrap: inherit;
text-wrap: initial;
text-wrap: revert;
text-wrap: revert-layer;
text-wrap: unset;
```

- wrap

文本在适当的字符处换行（例如空格，在使用空格分隔符的英语等语言中），以最大限度地减少溢出。这是默认值。

- nowrap

文本不会跨行换行。它将溢出其包含元素，而不是换行。

- blance

文本的换行方式最能平衡每行的字符数，从而提高布局质量和易读性。由于对字符进行计数并在多行中平衡它们的计算成本很高，因此仅跨有限行数的文本块支持此值（Chromium 为 6 行，Firefox 为 10 行）。

- pretty

其行为与换行相同，只是用户代理将使用较慢的算法，该算法有利于更好的布局而不是速度。这适用于正文副本，其中良好的排版比性能更受青睐（例如，当孤儿数量应保持在最低限度时）。

- stable

其行为与换行相同，只不过当用户编辑内容时，他们正在编辑的行之前的行保持静态，而不是整个文本块重新换行。

# Text Wrap

<https://www.tailwindcss.cn/docs/text-wrap>

## 用法

| Class        | Properties          |
| ------------ | ------------------- |
| text-wrap    | text-wrap: wrap;    |
| text-nowrap  | text-wrap: nowrap;  |
| text-balance | text-wrap: balance; |
| text-pretty  | text-wrap: pretty;  |
