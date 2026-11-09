# BFC 块级格式化上下文

## 定义

块级格式化上下文（Block Formatting Context，简称 BFC）。

- （MDN）它是 Web 页面的可视 CSS 渲染的一部分，是`块级盒子的布局过程发生的区域`，也是`浮动元素与其他元素交互的区域`。

- （W3C）BFC 它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，当涉及到可视化布局时，Block Formatting Context 提供了一个环境，HTML 在这个环境中按照一定的规则进行布局。

简单来说就是，BFC 是`一个完全独立的空间`（布局环境），**让空间里的子元素不会影响到外面的布局**。

## 会创建块格式化上下文的方式

- 文档的根元素（`<html>`）。
- 浮动元素（即 float 值不为 none 的元素）。
- 绝对定位元素（position 值为 absolute 或 fixed 的元素）。
- 行内块元素（display 值为 inline-block 的元素）。
- 表格单元格（display 值为 table-cell，HTML 表格单元格默认值）。
- 表格标题（display 值为 table-caption，HTML 表格标题默认值）。
- 匿名表格单元格元素（display 值为 table（HTML 表格默认值）、table-row（表格行默认值）、table-row-group（表格体默认值）、table-header-group（表格头部默认值）、table-footer-group（表格尾部默认值）或 inline-table）。
- overflow 值不为 visible 或 clip 的块级元素。
- display 值为 flow-root 的元素。
- contain 值为 layout、content 或 paint 的元素。
- 弹性元素（display 值为 flex 或 inline-flex 元素的直接子元素），如果它们本身既不是弹性、网格也不是表格容器。
- 网格元素（display 值为 grid 或 inline-grid 元素的直接子元素），如果它们本身既不是弹性、网格也不是表格容器。
- 多列容器（column-count 或 column-width (en-US) 值不为 auto，且含有 column-count: 1 的元素）。
- column-span 值为 all 的元素始终会创建一个新的格式化上下文，即使该元素没有包裹在一个多列容器中（规范变更、Chrome bug）

## BFC 的规则

- BFC 就是一个块级元素，块级元素会在垂直方向一个接一个的排列
- BFC 就是页面中的一个隔离的独立容器，容器里的标签不会影响到外部标签
- 垂直方向的距离由 margin 决定， 属于同一个 BFC 的两个相邻的标签外边距会发生重叠
- 计算 BFC 的高度时，浮动元素也参与计算

## BFC 解决了什么

通常，我们会为定位和清除浮动创建新的 BFC，而不是更改布局，因为它将`影响布局`。

- 包含内部浮动。
- 排除外部浮动。
- 阻止外边距重叠。

**包含内部浮动**

### 1. 解决高度塌陷

> 使用 float 布局时元素会脱离文档流，使得容器高度没有被撑开。

为解决此问题可以给 container 触发 BFC，上面我们所说到的触发 BFC 属性都可以设置

### 2. 解决 margin 边距重叠

> 区块的上下外边距有时会合并（折叠）为单个边距，其大小为两个边距中的最大值（或如果它们相等，则仅为其中一个），这种行为称为外边距折叠。

::: tip 注意
有设定浮动和绝对定位的元素不会发生外边距折叠。
:::

## 有三种情况会形成外边距折叠

### 1. 相邻的兄弟元素

相邻的同级元素之间的外边距会被折叠（除非后面的元素需要清除之前的浮动）。

### 2. 没有内容将父元素和后代元素分开

如果没有设定边框（border）、内边距（padding）、行级（inline）内容，也没有创建区块格式化上下文或间隙来分隔块级元素的上边距（margin-top）与其内一个或多个子代块级元素的上边距（margin-top）

或者没有设定边框、内边距、行级内容、高度（height）或最小高度（min-height）来分隔块级元素的下边距（margin-bottom）与其内部的一个或多个后代后代块元素的下边距（margin-bottom），则会出现这些外边距的折叠，重叠部分最终会溢出到父代元素的外面。

### 3. 空的区块

如果块级元素没有设定边框、内边距、行级内容、高度（height）、最小高度（min-height）来分隔块级元素的上边距（margin-top）及其下边距（margin-bottom），则会出现其上下外边距的折叠。

::: warning 一些需要注意的地方：

- 上述情况的组合会产生更复杂的（超过两个外边距的）外边距折叠。
- 即使某一外边距为 0，这些规则仍然适用。因此就算父元素的外边距是 0，第一个或最后一个子元素的外边距仍然会（根据上述规则）“溢出”到父元素的外面。
- 如果包含负边距，折叠后的外边距的值为最大的正边距与最小（绝对值最大）的负边距的和。
- 如果所有的外边距都为负值，折叠后的外边距的值为最小（绝对值最大）的负边距的值。这一规则适用于相邻元素和嵌套元素。
- 外边距折叠仅与垂直方向有关。
- display 设置为 flex 或 grid 的容器中不会发生外边距折叠。
  
:::

因为`正常文档流`中建立的 BFC `不与`元素`本身所在的`块格式化上下文中的`任何浮动`的`外边距重叠`

## 自测

[学习自测：CSS 基础](../../学习自测/01htmlcss/q_css_1-base.md)

## 参考

- [掌握外边距折叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)
- [区块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Block_formatting_context)
- [面试官：请说说什么是 BFC？大白话讲清楚](https://juejin.cn/post/6950082193632788493)
