## display: none 与 visibility: hidden 的区别

联系：它们都能让元素不可见区别：

1. display:none 会让元素完全从渲染树中消失，渲染的时候不占据任何空间，visibility: hidden 不会让元素从渲染树中消失，继续占据空间，只是内容不可见
2. display:none 是非继承属性，子孙节点无法通过修改显示，visibility:hidden 是继承属性，子孙节点可通过 visibility: visible 可以让子孙节点显示
3. 修改常规流中元素的 display 属性

## display: block 与 display: inline 的区别

block 元素特点:

1. 处于常规流中，如果 width 没有设置，会自动填充满父容器
2. 可以应用在 margin / padding
3. 在没有设置高度的情况下会扩展高度以包含常规流中的子元素
4. 处于常规流中时布局时在前后元素位置之间（独占一个水平空间）
5. 忽略 vertical-align

inline 元素特点：

1. 水平方向上根据 direction 依次布局
2. 不会在元素前后进行换行
3. 受 white-space 控制
4. margin / padding 在垂直方向上无效，水平方向上有效
5. width / height 属性对非替换行内元素无效，宽度由元素内容决定, 非替换行元素的行框高由 line-height 决定，替换行内元素的行框高由 height,marign,padding,border 决定
6. 浮动或绝对定位时会转为 block
7. vertical-align 属性生效

## CSS 有哪些可继承属性

font
word-break
letter-spacing
text-align
text-rendering
word-spacing
white-space
text-indent
text-transform
text-shadow

line-height
color
visibility
cursor

## 清除浮动

1. 容器元素闭合标签前添加额外元素并设置 clear: both
2. 父元素触发块级格式上下文 BFC
3. 设置容器元素伪元素进行清理

   .clearfix {
   zoom: 1;
   }
   .clearfix: before,
   .clearfix: after {
   content: '';
   display: table;
   }

   .clearfix: after {
   clear: both;
   }

## 什么是 FOUC（Flash of Unstyled Content）？ 如何避免

用户定义样式表加载之前浏览器使用默认样式显示文档，用户样式加载渲染之后再从新显示文档，造成页面闪烁。解决方法：把样式表放到文档的 head

##　如何创建 BFC，BFC 的作用

创建规则：

1. 根元素
2. 浮动元素
3. 绝对定位元素
4. display 为 inline-block table-cell table-caption flex inline-flex 之一
5. overflow 不为 visible

作用：

* 可以包含浮动元素
* 不被浮动元素覆盖
* 赋值父子元素的 margin 折叠

## 外边距折叠

毗邻的两个或多个 margin 会合并成一个 margin，叫做外边距折叠，规则如下：

1. 两个或多个毗邻的普通流中的块元素垂直方向上的 margin 会折叠
2. 浮动元素 / inline-block 元素 / 绝对定位元素的 margin 不会和垂直方向上的其他元素的 margin 折叠
3. 创建了块级格式化上下文的元素，不会和它的子元素发生 margin 折叠
4. 元素自身的 margin-bottom 和 margin-top 相邻时也会折叠

## stacking context 布局规则

z 轴上的默认层叠顺序如下： 从下到上 --

1. 根元素的边界和背景
2. 常规流中的元素按照 html 中顺序
3. 浮动块
4. positioned 元素按照 html 中出现顺序

## 如何创建 stacking context:

1. 根元素
2. z-index 不为 auto 的定位元素
3. opacity 小于 1 的元素

## 如何水平居中一个元素

常规流 inline 元素 -> 为父元素设置 text-align: center

常规流 block 元素 -> 设置宽度 设置 margin: auto

浮动元素 -> float: left; width: 200px; position:relative; left:50%; margin-left:-100px;

1 绝对定位元素 -> 父级 position: relative; width:100px;position:absolute;left:50%;margin-left: -50px; // 或者 transform:translate(-50%, 0);

2 绝对定位元素 -> 父级 position: relative; width:200px; position:absolute;left:0;right:0; margin:0 auto;

## 如何垂直居中一个元素

单行文本
设置 line-height 为高度即可
