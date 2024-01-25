# align-items

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items>

CSS align-items 属性设置了所有直接子元素的 align-self 值作为一个组。在 Flexbox 中，它控制子元素在交叉轴上的对齐。在 Grid 布局中，它控制了子元素在其网格区域内的块向轴上的对齐。

## 语法

```css
/* 基本关键字 */
align-items: normal;
align-items: stretch;

/* 定位对齐 */
/* align-items 不能设置为 left 和 right */
align-items: center;
align-items: start;
align-items: end;
align-items: flex-start;
align-items: flex-end;
align-items: self-start;
align-items: self-end;

/* 基线对齐 */
align-items: baseline;
align-items: first baseline;
align-items: last baseline; /* 溢出对齐（仅用于位置对齐） */
align-items: safe center;
align-items: unsafe center;

/* 全局值 */
align-items: inherit;
align-items: initial;
align-items: revert;
align-items: revert-layer;
align-items: unset;
```

## 用法

| Class          | Properties               |
| -------------- | ------------------------ |
| items-start    | align-items: flex-start; |
| items-end      | align-items: flex-end;   |
| items-center   | align-items: center;     |
| items-baseline | align-items: baseline;   |
| items-stretch  | align-items: stretch;    |
