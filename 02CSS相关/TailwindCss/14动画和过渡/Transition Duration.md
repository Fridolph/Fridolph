# transition-duration

transition-duration 属性以秒或毫秒为单位指定过渡动画所需的时间。默认值为 0s，表示不出现过渡动画。

可以指定多个时长，每个时长会被应用到由 transition-property 指定的对应属性上。如果指定的时长个数小于属性个数，那么时长列表会重复。如果时长列表更长，那么该列表会被裁减。两种情况下，属性列表都保持不变。

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-duration>

# Transition Duration

<https://www.tailwindcss.cn/docs/transition-duration>

## 用法

| Class         | Properties                   |
| ------------- | ---------------------------- |
| duration-0    | transition-duration: 0s;     |
| duration-75   | transition-duration: 75ms;   |
| duration-100  | transition-duration: 100ms;  |
| duration-150  | transition-duration: 150ms;  |
| duration-200  | transition-duration: 200ms;  |
| duration-300  | transition-duration: 300ms;  |
| duration-500  | transition-duration: 500ms;  |
| duration-700  | transition-duration: 700ms;  |
| duration-1000 | transition-duration: 1000ms; |

### 更改过渡持续时间

使用 duration-{amount}实用程序来控制元素的转换持续时间。

```html
<button class="transition duration-150 ease-in-out ...">Button A</button>
<button class="transition duration-300 ease-in-out ...">Button B</button>
<button class="transition duration-700 ease-in-out ...">Button C</button>
```

### 悬停、焦点和其他状态

Tailwind 允许您使用变体修饰符有条件地在不同状态下应用实用程序类。例如，使用 hover:duration-150 仅在悬停时应用 duration-150 实用程序。

```html
<div class="transition duration-0 hover:duration-150">
  <!-- ... -->
</div>
```

### 断点和媒体查询

您还可以使用变体修饰符来定位媒体查询，例如响应断点、深色模式、首选减少运动等。例如，使用 md:duration-150 仅在中等屏幕尺寸及以上屏幕尺寸上应用 uration-150 实用程序。

```html
<div class="transition duration-0 md:duration-150">
  <!-- ... -->
</div>
```

### 定制您的主题

默认情况下，Tailwind 提供八个通用转换持续时间实用程序。您可以通过编辑 tailwind.config.js 文件中的 theme.transitionDuration 或 theme.extend.transitionDuration 来自定义这些值。

```js
module.exports = {
  theme: {
    extend: {
      transitionDuration: {
        ['2000']: '2000ms',
      },
    },
  },
}
```

### 任意值

如果您需要使用一次性过渡持续时间值，而该值在主题中包含没有意义，请使用方括号使用任意值动态生成属性。

```html
<div class="duration-[2000ms]">
  <!-- ... -->
</div>
```
