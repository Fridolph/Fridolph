# flex-grow

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow>

CSS 属性 flex-grow CSS 设置 flex 项 主尺寸 的 flex 增长系数。

## 语法

```css
/* <number> 值 */
flex-grow: 3;
flex-grow: 0.6;

/* 全局值 */
flex-grow: inherit;
flex-grow: initial;
flex-grow: revert;
flex-grow: unset;
```

这个属性规定了 flex-grow 项在 flex 容器中分配剩余空间的相对比例。 主尺寸是项的宽度或高度，这取决于 flex-direction 值。

剩余空间是 flex 容器的大小减去所有 flex 项的大小加起来的大小。如果所有的兄弟项目都有相同的 flex-grow 系数，那么所有的项目将剩余空间按相同比例分配，否则将根据不同的 flex-grow 定义的比例进行分配。

flex-grow 与其他的 flex 属性 flex-shrink 和 flex-basis 一起使用，通常使用 flex 速记来定义，以确保所有的值都被设置。

## 用法

| Class  | Properties    |
| ------ | ------------- |
| grow   | flex-grow: 1; |
| grow-0 | flex-grow: 0; |
