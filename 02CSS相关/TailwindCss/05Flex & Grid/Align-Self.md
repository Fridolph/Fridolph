# align-self

CSS 属性 align-self 会对齐当前 grid 或 flex 行中的元素，并覆盖已有的 align-items 的值。In Grid, it aligns the item inside the grid area. 在 Flexbox 中，会按照 cross axis（当前 flex 元素排列方向的垂直方向）进行排列。

## 语法

```css
/* Keyword values */
align-self: auto;
align-self: normal;

/* Positional alignment */
/* align-self does not take left and right values */
align-self: center; /* Put the item around the center */
align-self: start; /* Put the item at the start */
align-self: end; /* Put the item at the end */
align-self: self-start; /* Align the item flush at the start */
align-self: self-end; /* Align the item flush at the end */
align-self: flex-start; /* Put the flex item at the start */
align-self: flex-end; /* Put the flex item at the end */

/* Baseline alignment */
align-self: baseline;
align-self: first baseline;
align-self: last baseline;
align-self: stretch; /* Stretch 'auto'-sized items to fit the container */

/* Overflow alignment */
align-self: safe center;
align-self: unsafe center;

/* Global values */
align-self: inherit;
align-self: initial;
align-self: unset;
```

## 用法

| Class         | Properties              |
| ------------- | ----------------------- |
| self-auto     | align-self: auto;       |
| self-start    | align-self: flex-start; |
| self-end      | align-self: flex-end;   |
| self-center   | align-self: center;     |
| self-stretch  | align-self: stretch;    |
| self-baseline | align-self: baseline;   |
