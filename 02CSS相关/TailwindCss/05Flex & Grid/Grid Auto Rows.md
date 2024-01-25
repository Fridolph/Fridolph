# grid-auto-rows

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-auto-rows>

CSS 属性 grid-auto-rows 用于指定隐式创建的行轨道大小。

如果定位到某行中的网格元素没有使用 grid-template-rows 来指定大小，则会隐式创建 grid 轨道来保存它。这可能在显示定位到超出范围的行，或者由自动放置算法创建额外的行时发生。

## 用法

| Class          | Properties                      |
| -------------- | ------------------------------- |
| auto-rows-auto | grid-auto-rows: auto;           |
| auto-rows-min  | grid-auto-rows: min-content;    |
| auto-rows-max  | grid-auto-rows: max-content;    |
| auto-rows-fr   | grid-auto-rows: minmax(0, 1fr); |
