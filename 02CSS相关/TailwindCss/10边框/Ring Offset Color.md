# Ring Offset Color

<https://www.tailwindcss.cn/docs/ring-offset-color>

## 用法

| Class | Properties |
| --- | --- |
| ring-offset-inherit | --tw-ring-offset-color: inherit; box-shadow: 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color), var(--tw-ring-shadow); |
| ring-offset-current | --tw-ring-offset-color: currentColor; box-shadow: 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color), var(--tw-ring-shadow); |
| ring-offset-transparent | --tw-ring-offset-color: transparent; box-shadow: 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color), var(--tw-ring-shadow); |
| ring-offset-black | --tw-ring-offset-color: #000; box-shadow: 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color), var(--tw-ring-shadow); |
| ring-offset-white | --tw-ring-offset-color: #fff; box-shadow: 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color), var(--tw-ring-shadow); |

### 任意值

如果您需要使用一次性的 ring-offset-{color}值，而该值在主题中包含没有意义，请使用方括号使用任意值动态生成属性。

```html
<div class="ring-offset-[#50d71e]">
  <!-- ... -->
</div>
```
