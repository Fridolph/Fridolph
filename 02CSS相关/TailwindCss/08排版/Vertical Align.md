# vertical-align

CSS 的属性 vertical-align 用来指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式。

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align>

vertical-align 属性可被用于两种环境：

使行内元素盒模型与其行内元素容器垂直对齐。例如，用于垂直对齐一行文本内的图片`<img>`：垂直对齐表格单元内容。

## vertical-align 属性指定为下面列出的值之一

### 行内元素的值 - 相对父元素的值

这些值使元素相对其父元素垂直对齐：

- baseline 使元素的基线与父元素的基线对齐。HTML 规范没有详细说明部分可替换元素的基线，如`<textarea>`，这意味着这些元素使用此值的表现因浏览器而异。

- sub 使元素的基线与父元素的下标基线对齐。

- super 使元素的基线与父元素的上标基线对齐。

- text-top 使元素的顶部与父元素的字体顶部对齐。

- text-bottom 使元素的底部与父元素的字体底部对齐。

- middle 使元素的中部与父元素的基线加上父元素 x-height（译注：x 高度）的一半对齐。

- `<length>` 使元素的基线对齐到父元素的基线之上的给定长度。可以是负数。

- `<percentage>` 使元素的基线对齐到父元素的基线之上的给定百分比，该百分比是line-height属性的百分比。可以是负数。

### 相对行的值

下列值使元素相对整行垂直对齐：

- top 使元素及其后代元素的顶部与整行的顶部对齐。

- bottom 使元素及其后代元素的底部与整行的底部对齐。

没有基线的元素，使用外边距的下边缘替代。

### 表格单元格的值

- baseline (以及 sub, super, text-top, text-bottom, `<length>`, `<percentage>`)
使单元格的基线，与该行中所有以基线对齐的其他单元格的基线对齐。

- top 使单元格内边距的上边缘与该行顶部对齐。

- middle 使单元格内边距盒模型在该行内居中对齐。

- bottom 使单元格内边距的下边缘与该行底部对齐。

# Vertical Align

<https://www.tailwindcss.cn/docs/vertical-align>

## 用法

| Class          | Properties                           |
| -------------- | ------------------------------------ |
| align-baseline | vertical-align: baseline;            |
| align-top      | vertical-align: top;                 |
| align-middle   | vertical-align: middle;              |
| align-bottom   | vertical-align: bottom;              |
| align-text     | -top vertical-align: text-top;       |
| align-text     | -bottom vertical-align: text-bottom; |
| align-sub      | vertical-align: sub;                 |
| align-super    | vertical-align: super;               |
