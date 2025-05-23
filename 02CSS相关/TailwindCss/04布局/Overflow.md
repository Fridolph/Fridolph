# overflow

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow>

overflow 是 CSS 的简写属性，其设置了元素溢出时所需的行为——即当元素的内容太大而无法适应它的块级格式化上下文时。

## 语法

```css
/* Keyword values */
overflow: visible;
overflow: hidden;
overflow: clip;
overflow: scroll;
overflow: auto;
overflow: hidden visible;

/* Global values */
overflow: inherit;
overflow: initial;
overflow: revert;
overflow: revert-layer;
overflow: unset;
```

从下面列表中指定一个或者两个关键字来作为 overflow 属性。如果指定两个关键字，第一个关键字用于 overflow-x，第二个关键字用于 overflow-y。否则，overflow-x 和 overflow-y 设置为相同的属性值。

- visible

内容不能被裁减并且可能渲染到边距盒（padding）的外部。

- hidden

如果需要，内容将被裁减以适应边距（padding）盒。不提供滚动条，也不支持允许用户滚动（例如通过拖拽或者使用滚轮）。内容可以以编程的方式滚动（例如，通过设置 scrollLeft 等属性的值或 scrollTo() 方法）, 因此该元素仍然是一个滚动的容器。

- clip

类似于 hidden，内容将以元素的边距（padding）盒进行裁剪。clip 和 hidden 之间的区别是 clip 关键字禁止所有滚动，包括以编程方式的滚动。该盒子不是一个滚动的容器，并且不会启动新的格式化上下文。如果你希望开启一个新的格式化上下文，你可以使用 display: flow-root 来这样做。

- scroll

如果需要，内容将被裁减以适应边距（padding）盒。无论是否实际裁剪了任何内容，浏览器总是显示滚动条，以防止滚动条在内容改变时出现或者消失。打印机可能会打印溢出的内容。

- auto

取决于用户代理。如果内容适应边距（padding）盒，它看起来与 visible 相同，但是仍然建立了一个新的块级格式化上下文。如果内容溢出，则浏览器提供滚动条。

## 用法

| Class             | Properties         |
| ----------------- | ------------------ |
| overflow-auto     | overflow:auto;     |
| overflow-hidden   | overflow:hidden;   |
| overfloww-clip    | overflow:clip;     |
| overflow-visible  | overflow:visible;  |
| overflow-scroll   | overflow:scroll;   |
| overflow-x-auto   | overflow-x:auto;   |
| overflow-y-auto   | overflow-y:auto;   |
| overflow-x-hidden | overflow-x:hidden; |
