# box-sizing

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing>

CSS 中的 box-sizing 属性定义了 user agent 应该如何计算一个元素的总宽度和总高度。

- content-box

是默认值。如果你设置一个元素的宽为 100px，那么这个元素的内容区会有 100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。

- border-box

告诉浏览器：你想要设置的边框和内边距的值是包含在 width 内的。也就是说，如果你将一个元素的 width 设为 100px，那么这 100px 会包含它的 border 和 padding，内容区的实际宽度是 width 减去 (border + padding) 的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。

## Box Sizing

| Class       | Properties               |
| ----------- | ------------------------ |
| box-border  | box-sizing: border-box;  |
| box-content | box-sizing: content-box; |

```html
<div class="box-border h-32 w-32 p-4 border-4 ...">
  <!-- Including borders and padding -->
</div>

<div class="box-content h-32 w-32 p-4 border-4 ...">
  <!-- Excluding borders and padding -->
</div>

<div class="box-border hover:box-content">
  <!-- Hover, focus, and other states -->
</div>
```
