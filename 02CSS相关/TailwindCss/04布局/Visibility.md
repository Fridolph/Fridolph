# Visibility

visibility CSS 属性显示或隐藏元素而不更改文档的布局。该属性还可以隐藏 `<table>` 中的行或列。

## 语法

```css
/* 关键字值 */
visibility: visible;
visibility: hidden;
visibility: collapse;

/* 全局值 */
visibility: inherit;
visibility: initial;
visibility: revert;
visibility: revert-layer;
visibility: unset;
```

- visible 元素框可见

- hidden

元素框不可见（不绘制），但仍然影响常规的布局。如果将其子元素的 visibility 设置为 visible，则该子元素依然可见。元素无法获得焦点（例如通过 tab 索引进行键盘导航）。

- collapse

collapse 关键字对于不同的元素有不同的效果：

用于 `<table>` 行、列、列组和行组，将隐藏表格的行或列，并且不占用任何空间（与将 display: none 用于表格的行/列上的效果相当）。但是，计算其他行和列的大小时，仍会像显示折叠行或列中的单元格一样进行计算。此值允许从表中快速删除行或列，而不强制重新计算整个表的宽度和高度。折叠的弹性元素和 ruby 元素会被隐藏，它们本来将要占用的空间会被移除。对于其他元素，collapse 被视为与 hidden 相同。

## 用法

| Class     | Properties            |
| --------- | --------------------- |
| visible   | visibility: visible;  |
| invisible | visibility: hidden;   |
| collapse  | visibility: collapse; |

折叠元素

使用折叠隐藏表行、行组、列和列组，就像将它们设置为显示：无一样，但不会影响其他行和列的大小。
这使得动态切换行和列成为可能，而不影响表布局。
