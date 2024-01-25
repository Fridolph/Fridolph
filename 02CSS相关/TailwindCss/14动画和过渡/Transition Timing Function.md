# Transition Timing Function

<https://www.tailwindcss.cn/docs/transition-timing-function>

## 用法

| Class       | Properties                                                |
| ----------- | --------------------------------------------------------- |
| ease-linear | transition-timing-function: linear;                       |
| ease-in     | transition-timing-function:cubic-bezier(0.4, 0, 1, 1);    |
| ease-out    | transition-timing-function: cubic-bezier(0, 0, 0.2, 1);   |
| ease-in-out | transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); |

### 控制缓和曲线

使用 ease-{timing}实用程序来控制元素的缓动曲线。

```html
<button class="ease-in duration-300 ...">Button A</button>
<button class="ease-out duration-300 ...">Button B</button>
<button class="ease-in-out duration-300 ...">Button C</button>
```

### 定制您的主题

默认情况下，Tailwind 提供四个通用转换计时函数实用程序。您可以通过编辑 tailwind.config.js 文件中的 theme.transitionTimingFunction 或 theme.extend.transitionTimingFunction 来自定义这些值。

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
}
```

### 任意值

如果您需要使用一次性转换计时函数值，而该值在主题中包含没有意义，请使用方括号使用任意值动态生成属性。

```html
<div class="ease-[cubic-bezier(0.95,0.05,0.795,0.035)]">
  <!-- ... -->
</div>
```
