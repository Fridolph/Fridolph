# Ring Color

<https://www.tailwindcss.cn/docs/ring-color>

## 用法

| Class            | Properties                         |
| ---------------- | ---------------------------------- |
| ring-inherit     | --tw-ring-color: inherit;          |
| ring-current     | --tw-ring-color: currentColor;     |
| ring-transparent | --tw-ring-color: transparent;      |
| ring-black       | --tw-ring-color: rgb(0 0 0);       |
| ring-white       | --tw-ring-color: rgb(255 255 255); |

其他颜色参考文档，写法同 color、text-color、background-color

### 任意值

如果您需要使用一次性的 ring-{color}值，而该值在主题中包含没有意义，请使用方括号使用任意值动态生成属性。

```html
<div class="ring-[#50d71e]">
  <!-- ... -->
</div>
```
