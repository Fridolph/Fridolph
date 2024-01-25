# Clear

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/clear>

clear CSS 属性指定一个元素是否必须移动 (清除浮动后) 到在它之前的浮动元素下面。clear 属性适用于浮动和非浮动元素

当应用于非浮动块时，它将非浮动块的边框边界移动到所有相关浮动元素外边界的下方。这个非浮动块的顶部外边距会折叠。

另一方面，两个浮动元素的垂直外边距将不会折叠。当应用于浮动元素时，它将底部元素的外边界边缘移动到所有相关的浮动元素外边界边缘的下方。这会影响后面浮动元素的布局，因为后面的浮动元素的位置无法高于它之前的元素。

要被清除的相关浮动元素指的是在相同块级格式化上下文中的前置浮动。

```css
/* Keyword values */
clear: none;
clear: left;
clear: right;
clear: both;
clear: inline-start;
clear: inline-end;

/* Global values */
clear: inherit;
clear: initial;
clear: unset;
```

- none 元素不会被向下移动以清除浮动

- left 元素被向下移动以清除左浮动

- right 元素被向下移动以清除右浮动

- both 元素被向下移动以清除左右浮动

- inline-start 元素被向下移动以清除其包含块的起始侧浮动，即 ltr 时清除左浮动，rtl 时清除右浮动

- inline-end 元素被向下移动以清除其包含块的结束侧浮动，即 ltr 时清除右浮动，rtl 时清除左浮动

## 用法

| Class       | Properties          |
| ----------- | ------------------- |
| clear-start | clear:inline-start; |
| clear-end   | clear:inline-end;   |
| clear-left  | clear:left;         |
| clear-right | clear:right;        |
| clear-both  | clear:both;         |
| clear-none  | clear:none;         |
