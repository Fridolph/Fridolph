# object-position

CSS 属性 object-position 规定了可替换元素的内容，在这里我们称其为对象（即 object-position 中的 object）在其内容框中的位置。可替换元素的内容框中未被对象所覆盖的部分，则会显示该元素的背景。

你还可以使用 object-fit 属性来改变可替换元素的对象的内在的大小（即它看上去的大小）的调整方式，借助拉伸与缩放等使对象更好地适应元素的内容框。

## 语法

```css
/* 关键字值 */
object-position: top;
object-position: bottom;
object-position: left;
object-position: right;
object-position: center;

/* <percentage> 值 */
object-position: 25% 75%;

/* <length> 值 */
object-position: 0 0;
object-position: 1cm 2cm;
object-position: 10ch 8em;

/* 边缘偏移值 */
object-position: bottom 10px right 20px;
object-position: right 3em bottom 10px;
object-position: top 0 right 10px;

/* 全局关键字 */
object-position: inherit;
object-position: initial;
object-position: revert;
object-position: revert-layer;
object-position: unset;
```

## 用法

<https://www.tailwindcss.cn/docs/object-position>

控制替换元素的内容如何放置在其容器中的实用程序。

| Class               | Properties                    |
| ------------------- | ----------------------------- |
| object-bottom       | object-position:bottom;       |
| object-center       | object-position:center;       |
| object-left         | object-position:left;         |
| object-left-bottom  | object-position:left bottom;  |
| object-left-top     | object-position: left top;    |
| object-right        | object-position:right;        |
| object-right-bottom | object-position:right bottom; |
| object-right-top    | object-position: right top;   |
| object-top          | object-position: top;         |
