# grid-auto-columns

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-auto-columns>

CSS 属性 grid-auto-columns 指定了隐式创建的网格纵向轨道（track）的宽度。

如果一个表格项目被定位在没有使用 grid-template-columns 显式指定尺寸的列中，隐式的 grid 轨道就会被创建出来支撑它。显式地定位到超出范围的列中，或者通过自动布局算法创建额外的列，就会发生上述情况。

## 用法

| Class          | Properties                         |
| -------------- | ---------------------------------- |
| auto-cols-auto | grid-auto-columns: auto;           |
| auto-cols-min  | grid-auto-columns: min-content;    |
| auto-cols-max  | grid-auto-columns: max-content;    |
| auto-cols-fr   | grid-auto-columns: minmax(0, 1fr); |
