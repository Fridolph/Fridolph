# CSS layout

布局相关

## BFC

[概念与原理 - BFC](../../概念与原理/01htmlcss/s_css_1-BFC.md)

### 什么是 BFC

Block format context——`块级格式化上下文`。 是一块独立渲染的区域，`内部元素的渲染不会影响边界以外的元素`

### 形成 BFC 的条件

::: details

- float 不是 none

- overflow 不是 visible；

- position 是 fixed 和 absolute；

- display 是 flex , inline-block 等
  :::

### BFC 的应用

主要用于`清除浮动` 及 `解决高度塌陷`，具体如下：

::: details

1. 相邻兄弟元素的 margin-bottom 和 margin-top 发生重叠，这时候我们可以设置其中一个元素为 BFC 即可解决

2. 没有内容的元素，自身的 margin-top 和 margin-bottom 发生重叠时：

- 元素设置 padding 或 border
- 给元素设置一个高度

3. 父元素的 margin-top 和子元素的 margin-top 发生重叠，他们发生重叠是因为这两个元素是相邻的

- 为父元素设置 padding-top 或 border-top 来分割他们
- 设置父元素为 BFC。 ​
- 父元素和第一个子元素之间添加一个内联元素来进行分割

4. 高度为 auto 的父元素的 margin-bottom 和最后一个子元素的 margin-bottom 发生重叠，他们发生重叠一个原因是`他们是相邻`的，另一个原因是`父元素的高度是不固定`的，解决如下：

- 为父元素设置 padding-top 或 border-top 来分割他们
- 设置父元素为 BFC
- 父元素和第一个子元素之间添加一个内联元素来进行分割
  :::


## flex

### flex 常用语法

::: details

- flex-direction 项目排列方式
- flex-wrap 是否换行
- flex-direcion
- justify-content 项目横轴对齐方式
- align-content 在项目为多行时需要加 flex-wrap:wrap，项目纵轴如何对齐（不能控制单行的盒子内位置变换）
- align-items（控制容器）项目纵轴如何对齐（能控制单行的盒子内位置变换）
- align-self（控制子项）容器子项纵轴如何对齐
  :::

### flex 是哪几个属性的缩写

::: details

- flex-grow

  设置 flex 项在容器中`分配剩余空间的相对比例`。剩余空间是 flex 容器的大小减去所有 flex 项的大小加起来的大小。如果所有的兄弟项目都有相同的 flex-grow 系数，那么所有的项目将剩余空间按相同比例分配，否则将根据不同的 flex-grow 定义的比例进行分配。

- flex-shrink

  属性指定了 flex 元素的`收缩规则`。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值

- flex-basis

  指定了 flex 元素在主轴方向上的`初始大小`。如果不使用 box-sizing 改变盒模型的话，那么这个属性就决定了 flex 元素的内容盒（content-box）的尺寸
:::
