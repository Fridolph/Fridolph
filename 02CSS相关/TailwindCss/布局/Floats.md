# float

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/float>

float CSS 属性指定一个元素应沿其容器的左侧或右侧放置，允许文本和内联元素环绕它。该元素从网页的正常流动（文档流）中移除，但是仍然保持部分的流动性（与绝对定位相反）。

## 语法

```css
/* Keyword values */
float: left;
float: right;
float: none;
float: inline-start;
float: inline-end;

/* Global values */
float: inherit;
float: initial;
float: revert;
float: unset;
```

## 用法

| Class       | Properties          |
| ----------- | ------------------- |
| float-start | float:inline-start; |
| float-end   | float:inline-end;   |
| float-right | float:right;        |
| float-left  | float:left;         |
| float-none  | float:none;         |

## 清除浮动

有时，你可能想要强制元素移至任何浮动元素下方。比如说，你可能希望某个段落与浮动元素保持相邻的位置，但又希望这个段落从头开始强制独占一行。请参考 clear 中的示例。
