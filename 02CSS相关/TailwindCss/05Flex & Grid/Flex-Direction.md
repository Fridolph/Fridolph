# Flex Direction

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-direction>

CSS flex-direction 属性指定了内部元素是如何在 flex 容器中布局的，定义了主轴的方向 (正方向或反方向)。

## 语法

```css
/* The direction text is laid out in a line */
flex-direction: row;

/* Like <row>, but reversed */
flex-direction: row-reverse;

/* The direction in which lines of text are stacked */
flex-direction: column;

/* Like <column>, but reversed */
flex-direction: column-reverse;

/* Global values */
flex-direction: inherit;
flex-direction: initial;
flex-direction: unset;
```

接受以下取值：

- row

flex 容器的主轴被定义为与文本方向相同。主轴起点和主轴终点与内容方向相同。

- row-reverse

表现和 row 相同，但是置换了主轴起点和主轴终点

- column

flex 容器的主轴和块轴相同。主轴起点与主轴终点和书写模式的前后点相同

- column-reverse

表现和 column 相同，但是置换了主轴起点和主轴终点

## 用法

| Class            | Properties                      |
| ---------------- | ------------------------------- |
| flex-row         | flex-direction: row;            |
| flex-row-reverse | flex-direction: row-reverse;    |
| flex-col         | flex-direction: column;         |
| flex-col-reverse | flex-direction: column-reverse; |
