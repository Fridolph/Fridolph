# Flex Basis

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis>

CSS 属性 flex-basis 指定了 flex 元素在主轴方向上的初始大小。如果不使用 box-sizing 改变盒模型的话，那么这个属性就决定了 flex 元素的内容盒（content-box）的尺寸。

> 备注： 当一个元素同时被设置了 flex-basis (除值为 auto 外) 和 width (或者在 flex-direction: column 情况下设置了 height) , flex-basis 具有更高的优先级。

## 语法

```css
/* 指定<'width'> */
flex-basis: 10em;
flex-basis: 3px;
flex-basis: auto;

/* 固有的尺寸关键词 */
flex-basis: fill;
flex-basis: max-content;
flex-basis: min-content;
flex-basis: fit-content;

/* 在 flex item 内容上的自动尺寸 */
flex-basis: content;

/* 全局数值 */
flex-basis: inherit;
flex-basis: initial;
flex-basis: unset;
```

- `<width>` width 值可以是 `<length>`; 该值也可以是一个相对于其父弹性盒容器主轴尺寸的百分数 。负值是不被允许的。默认为 auto。

- content

基于 flex 的元素的内容自动调整大小。

:::info

备注：\*\*由于最初规范中没有包括这个值，在一些早期的浏览器实现的 flex 布局中，content 值无效，可以利用设置 (width 或 height) 为 auto 达到同样的效果。

:::

## 用法

| Class   | Properties                 |
| ------- | -------------------------- |
| basis-0 | flex-basis: 0px;           |
| basis-1 | flex-basis: 0.25rem; `4px` |
| basis-2 | flex-basis: 0.5rem; `8px`  |

> 大小和 [Top-Right-Bottom-Left](../04布局/Top-Right-Bottom-Left.md) 一样。tailwind 的 基本单位1 是 4px， 1/4 这样是 百分比写法，再记住一个 0 为 0 , full是100% 就可以开始无障碍编写代码了。
