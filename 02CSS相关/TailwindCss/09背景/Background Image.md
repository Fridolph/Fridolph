# background-image

CSS background-image 属性用于为一个元素设置一个或者多个背景图像。

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-image>

在绘制时，图像以 z 方向堆叠的方式进行。先指定的图像会在之后指定的图像上面绘制。因此指定的第一个图像“最接近用户”。

然后元素的边框 border 会在它们之上被绘制，而 background-color 会在它们之下绘制。图像的绘制与盒子以及盒子的边框的关系，需要在 CSS 属性 background-clip 和 background-origin 中定义。

如果一个指定的图像无法被绘制 (比如，被指定的 URI 所表示的文件无法被加载)，浏览器会将此情况等同于其值被设为 none。

# Background Image

<https://www.tailwindcss.cn/docs/background-image>

## 用法

| Class | Properties |
| --- | --- |
| bg-none | background-image: none; |
| bg-gradient-to-t | background-image: linear-gradient(to top, var(--tw-gradient-stops)); |
| bg-gradient-to-tr | background-image: linear-gradient(to top right, var(--tw-gradient-stops)); |
| bg-gradient-to-r | background-image: linear-gradient(to right, var(--tw-gradient-stops)); |
| bg-gradient-to-br | background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); |
| bg-gradient-to-b | background-image: linear-gradient(to bottom, var(--tw-gradient-stops)); |
| bg-gradient-to-bl | background-image: linear-gradient(to bottom left, var(--tw-gradient-stops)); |
| bg-gradient-to-l | background-image: linear-gradient(to left, var(--tw-gradient-stops)); |
| bg-gradient-to-tl | background-image: linear-gradient(to top left, var(--tw-gradient-stops)); |

### 定制您的主题

默认情况下，Tailwind 包含用于在八个方向创建线性渐变背景的背景图像实用程序。您可以通过编辑 tailwind.config.js 文件的 theme.backgroundImage 部分来添加自己的背景图像：

```js
module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/img/hero-pattern.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
    },
  },
}
```

这些不仅仅必须是渐变——它们可以是您需要的任何背景图像。在主题自定义文档中了解有关自定义默认主题的更多信息。

### 任意值

如果您需要使用一次性背景图像值，而该值在主题中包含没有意义，请使用方括号使用任意值动态生成属性。

```html
<div class="bg-[url('/img/hero-pattern.svg')]">
  <!-- ... -->
</div>
```
