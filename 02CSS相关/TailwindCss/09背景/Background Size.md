# background-size

background-size 设置背景图片大小。图片可以保有其原有的尺寸，或者拉伸到新的尺寸，或者在保持其原有比例的同时缩放到元素的可用空间的尺寸。

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size>

## 语法

```css
/* 关键字 */
background-size: cover
background-size: contain

/* 一个值：这个值指定图片的宽度，图片的高度隐式的为 auto */
background-size: 50%
background-size: 3em
background-size: 12px
background-size: auto

/* 两个值 */
/* 第一个值指定图片的宽度，第二个值指定图片的高度 */
background-size: 50% auto
background-size: 3em 25%
background-size: auto 6px
background-size: auto auto

/* 逗号分隔的多个值：设置多重背景 */
background-size: auto, auto     /* 不同于 background-size: auto auto */
background-size: 50%, 25%, 25%
background-size: 6px, auto, contain

/* 全局属性 */
background-size: inherit;
background-size: initial;
background-size: unset;

```

单张图片的背景大小可以使用以下三种方法中的一种来规定：

使用关键词 contain 使用关键词 cover 设定宽度和高度值当通过宽度和高度值来设定尺寸时，你可以提供一或者两个数值：

如果仅有一个数值被给定，这个数值将作为宽度值大小，高度值将被设定为 auto。如果有两个数值被给定，第一个将作为宽度值大小，第二个作为高度值大小。每个值可以是`<length>`, 是 `<percentage>`, 或者 auto.

# Background Size

<https://www.tailwindcss.cn/docs/background-size>

## 用法

| Class      | Properties                |
| ---------- | ------------------------- |
| bg-auto    | background-size: auto;    |
| bg-cover   | background-size: cover;   |
| bg-contain | background-size: contain; |

### 任意值

如果您需要使用一次性背景大小值，而该值在主题中包含没有意义，请使用方括号使用任意值动态生成属性。

```html
<div class="bg-[length:200px_100px]">
  <!-- ... -->
</div>
```
