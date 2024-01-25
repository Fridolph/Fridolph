# object-fit

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit>

object-fit CSS 属性指定可替换元素（例如：`<img>` 或 `<video>`）的内容应该如何适应到其使用高度和宽度确定的框。

你可以通过使用 object-position 属性来切换被替换元素的内容对象在元素框内的对齐方式。

## 语法

```css
object-fit: contain;
object-fit: cover;
object-fit: fill;
object-fit: none;
object-fit: scale-down;
/* Global values */
object-fit: inherit;
object-fit: initial;
object-fit: revert;
object-fit: revert-layer;
object-fit: unset;
```

- contain 被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。整个对象在填充盒子的同时保留其长宽比，因此如果宽高比与框的宽高比不匹配，该对象将被添加“黑边”。

- cover 被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框。

- fill 被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。

- none 被替换的内容将保持其原有的尺寸。

- scale-down 内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。

## 用法

| Class             | Properties             |
| ----------------- | ---------------------- |
| object-contain    | object-fit: contain;   |
| object-cover      | object-fit:cover;      |
| object-fill       | object-fit:fill;       |
| object-none       | object-fit:none;       |
| object-scale-down | object-fit:scale-down; |
