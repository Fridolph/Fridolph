# Box Shadow Color

<https://www.tailwindcss.cn/docs/box-shadow-color>

## 用法

| Class              | Properties                       |
| ------------------ | -------------------------------- |
| shadow-inherit     | --tw-shadow-color: inherit;      |
| shadow-current     | --tw-shadow-color: currentColor; |
| shadow-transparent | --tw-shadow-color: transparent;  |
| shadow-black       | --tw-shadow-color: #000;         |
| shadow-white       | --tw-shadow-color: #fff;         |

其他颜色参考文档，同 color

### 设置框阴影颜色

使用 Shadow-{color} 实用程序更改现有框阴影的颜色。默认情况下，彩色阴影的不透明度为 100%，但您可以使用不透明度修改器进行调整。

```html
<button class="bg-cyan-500 shadow-lg shadow-cyan-500/50 ...">Subscribe</button>
<button class="bg-blue-500 shadow-lg shadow-blue-500/50 ...">Subscribe</button>
<button class="bg-indigo-500 shadow-lg shadow-indigo-500/50 ...">Subscribe</button>
```

### 在彩色背景上使用阴影

在彩色背景上使用阴影时，彩色阴影通常看起来比默认的基于黑色的阴影更自然，后者往往显得灰色且褪色。

```html
<!-- Default shadow-->
<button class="shadow-lg">Subscribe</button>

<!-- Colored shadow-->
<button class="shadow-lg shadow-indigo-500/40 ...">Subscribe</button>
```

### 悬停、焦点和其他状态

Tailwind 允许您使用变体修饰符有条件地在不同状态下应用实用程序类。例如，使用 hover:shadow-indigo-500/40 仅在悬停时应用 shadow-indigo-500/40 实用程序。

```html
<button class="shadow shadow-blue-500/40 hover:shadow-indigo-500/40">
  <!-- ... -->
</button>
```

### 断点和媒体查询

您还可以使用变体修饰符来定位媒体查询，例如响应断点、深色模式、首选减少运动等。例如，使用 md:shadow-indigo-500/40 仅在中等屏幕尺寸及以上尺寸应用 shadow-indigo-500/40 实用程序。

```html
<button class="shadow shadow-blue-500/40 md:shadow-indigo-500/40">
  <!-- ... -->
</button>
```
