# flex-wrap

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap>

CSS 的 flex-wrap 属性指定 flex 元素单行显示还是多行显示。如果允许换行，这个属性允许你控制行的堆叠方向。

## 语法

```css
flex-wrap: nowrap; /* Default value */
flex-wrap: wrap;
flex-wrap: wrap-reverse;

/* Global values */
flex-wrap: inherit;
flex-wrap: initial;
flex-wrap: revert;
flex-wrap: unset;
```

flex-wrap 属性接受以下取值：

- nowrap

flex 的元素被摆放到到一行，这可能导致 flex 容器溢出。cross-start 会根据 flex-direction 的值等价于 start 或 before。为该属性的默认值。

- wrap

flex 元素 被打断到多个行中。cross-start 会根据 flex-direction 的值等价于 start 或 before。cross-end 为确定的 cross-start 的另一端。

- wrap-reverse

和 wrap 的行为一样，但是 cross-start 和 cross-end 互换。

## 用法

| Class             | Properties               |
| ----------------- | ------------------------ |
| flex-wrap         | flex-wrap: wrap;         |
| flex-wrap-reverse | flex-wrap: wrap-reverse; |
| flex-nowrap       | flex-wrap: nowrap;       |
