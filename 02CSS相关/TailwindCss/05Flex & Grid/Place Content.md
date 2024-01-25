# place-content

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/place-content>

place-content 属性是 align-content 和 justify-content 的简写。使用这两个属性的值可以用于任何的布局情况。

## 语法

```css
/* Positional alignment */
/* align-content does not take left and right values */
place-content: center start;
place-content: start center;
place-content: end left;
place-content: flex-start center;
place-content: flex-end center;

/* Baseline alignment */
/* justify-content does not take baseline values */
place-content: baseline center;
place-content: first baseline space-evenly;
place-content: last baseline right;

/* Distributed alignment */
place-content: space-between space-evenly;
place-content: space-around space-evenly;
place-content: space-evenly stretch;
place-content: stretch space-evenly;

/* Global values */
place-content: inherit;
place-content: initial;
place-content: unset;
```

## 用法

| Class                  | Properties                    |
| ---------------------- | ----------------------------- |
| place-content-center   | place-content: center;        |
| place-content-start    | place-content: start;         |
| place-content-end      | place-content: end;           |
| place-content-between  | place-content: space-between; |
| place-content-around   | place-content: space-around;  |
| place-content-evenly   | place-content: space-evenly;  |
| place-content-baseline | place-content: baseline;      |
| place-content-stretch  | place-content: stretch;       |
