# animation

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation>

CSS animation 属性是以下属性的简写

- animation-name
  - 属性指定一个或多个 @keyframes 的名称
- animation-duration
  - 属性设置动画完成一个动画周期所需的时间
- animation-timing-function
  - 属性设置动画在每个周期的持续时间内如何进行
- animation-delay
  - 属性指定从应用动画到元素开始执行动画之前等待的时间量。动画可以稍后开始、立即从开头开始或立即开始并在动画中途播放
- animation-iteration-count
  - 属性设置动画序列在停止前应播放的次数。infinite 或 设定对应次数(默认 1)
- animation-direction
  - 属性设置动画是应正向播放、反向播放还是在正向和反向之间交替播放
- animation-fill-mode
  - 设置动画在执行之前和之后如何将样式应用于其目标
- animation-play-state
  - 属性设置动画是运行还是暂停。恢复暂停的动画将从暂停时停止的位置开始播放，而不是从动画序列的开头重新开始播放。

# Animation

<https://www.tailwindcss.cn/docs/animation>

## 用法

| Class         | Properties                                                 |
| ------------- | ---------------------------------------------------------- |
| animate-none  | animation:none;                                            |
| animate-spin  | animation:spin 1s linear infinite;                         |
| animate-ping  | animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;    |
| animate-pulse | animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; |

```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
```

### Spin

添加 animate-spin 实用程序以向加载指示器等元素添加线性旋转动画。

```html
<button type="button" class="bg-indigo-500 ..." disabled>
  <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
  Processing...
</button>
```

### Ping

添加 animate-ping 实用程序，使元素像雷达 ping 或水波纹一样缩放和淡出 - 对于通知徽章等内容非常有用。

```html
<span class="relative inline-flex">
  <button
    type="button"
    class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-sky-500 bg-white dark:bg-slate-800 transition ease-in-out duration-150 cursor-not-allowed ring-1 ring-slate-900/10 dark:ring-slate-200/20"
    disabled=""
  >
    Transactions
  </button>
  <span class="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
    <span
      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
    ></span>
    <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
  </span>
</span>
```

### pulse

添加 animate-pulse 实用程序以使元素轻轻淡入和淡出 - 对于骨架加载器等内容很有用。

```html
<div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
  <div class="animate-pulse flex space-x-4">
    <div class="rounded-full bg-slate-200 h-10 w-10"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 bg-slate-200 rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 bg-slate-200 rounded col-span-2"></div>
          <div class="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div class="h-2 bg-slate-200 rounded"></div>
      </div>
    </div>
  </div>
</div>
```

### Bounce

添加 animate-bounce 实用程序以使元素上下弹跳 - 对于“向下滚动”指示器等内容很有用。

```html
<svg class="animate-bounce w-6 h-6 ..."></svg>
```

### Prefers-reduced-motion

对于用户指定他们更喜欢减少运动的情况，您可以使用`motion-safe`和`motion-reduce`有条件地应用动画和过渡：

### 定制您的主题

动画本质上往往是高度特定于项目的。我们默认包含的动画最好被视为有用的示例，我们鼓励您自定义动画以更好地满足您的需求。默认情况下，Tailwind 提供了四种不同示例动画的实用程序以及 animate-none 实用程序。您可以通过编辑 tailwind.config.js 文件中的 theme.animation 或 theme.extend.animation 来自定义这些值。

```js
module.exports = {
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
}
```

要添加新动画@keyframes，请使用主题配置的关键帧部分：

```js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
}
```

然后，您可以在主题配置的动画部分中按名称引用这些关键帧：

```js
module.exports = {
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
    },
  },
}
```

### 任意值

如果您需要使用一次性动画值，而该值在主题中包含没有意义，请使用方括号使用任意值动态生成属性。

```html
<div class="animate-[wiggle_1s_ease-in-out_infinite]">
  <!-- ... -->
</div>
```
