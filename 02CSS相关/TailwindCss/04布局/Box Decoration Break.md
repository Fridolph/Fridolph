# Box Decoration Break

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-decoration-break>

box-decoration-break 属性用来定义当元素跨多行、多列或多页时，元素的片段应如何呈现。

- slice

元素被按照盒子被切割前的原始样式渲染，之后，针对每个行/列/页面将此假设框渲染成片段。请注意，假设框对于每个片段可以是不同的，因为如果中断发生在行内方向，则它使用自己的高度，如果中断发生在块方向，则它使用自己的宽度。有关详细信息，请参阅 CSS 规范。

- clone

每个框片段与指定的边框、填充和边距独立呈现。border-radius、border-image、box-shadow 独立地应用于每个片段，每个片段的背景也是独立绘制的，这意味着使用 background-repeat: no-repeat 的背景图片仍然可能重复多次。

## Box Decoration Break

| Class                | Properties                   |
| -------------------- | ---------------------------- |
| box-decoration-clone | box-decoration-break: clone; |
| box-decoration-slice | box-decoration-break: slice; |
