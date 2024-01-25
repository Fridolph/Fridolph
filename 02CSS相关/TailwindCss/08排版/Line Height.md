# Line Height

<https://www.tailwindcss.cn/docs/line-height>

## 用法

| Class           | Properties            |
| --------------- | --------------------- |
| leading-3       | line-height: .75rem;  |
| leading-4       | line-height: 1rem;    |
| leading-5       | line-height: 1.25rem; |
| leading-6       | line-height: 1.5rem;  |
| leading-7       | line-height: 1.75rem; |
| leading-8       | line-height: 2rem;    |
| leading-9       | line-height: 2.25rem; |
| leading-10      | line-height: 2.5rem;  |
| leading-none    | line-height: 1;       |
| leading-tight   | line-height: 1.25;    |
| leading-snug    | line-height: 1.375;   |
| leading-normal  | line-height: 1.5;     |
| leading-relaxed | line-height: 1.625;   |
| leading-loose   | line-height: 2;       |

### 相对行高

使用 leading-none、leading-tight、leading-snug、leading-normal、leading-relaxed 和 leading-loose 实用程序根据元素当前的字体大小为元素提供相对行高。

### 固定行高

使用 leading-{size} 实用程序为元素提供固定的行高，而不管当前的字体大小如何。当您需要非常精确地控制元素的最终大小时，这些非常有用。

### 断点和媒体查询

您还可以使用变体修饰符来定位媒体查询，例如响应断点、深色模式、首选减少运动等。例如，使用 md:leading-loose 仅 ​​ 在中等屏幕尺寸及以上尺寸应用 leading-loose 实用程序。

```html
<p class="leading-none md:leading-loose">
  <!-- ... -->
</p>
```

### 覆盖默认行高

值得注意的是，默认情况下，Tailwind 的字体大小实用程序各自设置自己的默认行高。这意味着任何时候您使用响应式字体大小实用程序（例如 sm:text-xl）时，您为较小断点设置的任何显式行高都将被覆盖。
