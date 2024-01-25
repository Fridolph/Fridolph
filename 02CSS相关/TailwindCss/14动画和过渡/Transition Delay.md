# Transition Delay

## 用法

| Class      | Properties                |
| ---------- | ------------------------- |
| delay-0    | transition-delay: 0s;     |
| delay-75   | transition-delay: 75ms;   |
| delay-100  | transition-delay: 100ms;  |
| delay-150  | transition-delay: 150ms;  |
| delay-200  | transition-delay: 200ms;  |
| delay-300  | transition-delay: 300ms;  |
| delay-500  | transition-delay: 500ms;  |
| delay-700  | transition-delay: 700ms;  |
| delay-1000 | transition-delay: 1000ms; |

### 定制您的主题

默认情况下，Tailwind 提供八个通用转换延迟实用程序。您可以通过编辑 tailwind.config.js 文件中的 theme.transitionDelay 或 theme.extend.transitionDelay 来自定义这些值。

```js
module.exports = {
  theme: {
    extend: {
      transitionDelay: {
        ['2000']: '2000ms',
      },
    },
  },
}
```

### 任意值

如果您需要使用一次性转换延迟值，而该值在主题中包含没有意义，请使用方括号使用任意值动态生成属性。

```html
<div class="delay-[2000ms]">
  <!-- ... -->
</div>
```
