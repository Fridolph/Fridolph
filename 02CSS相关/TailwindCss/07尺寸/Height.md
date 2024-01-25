# Height

<https://www.tailwindcss.cn/docs/height>

## 用法

| Class    | Properties           |
| -------- | -------------------- |
| h-0      | height: 0px;         |
| h-px     | height: 1px;         |
| h-0.5    | height: 0.125rem;    |
| h-1      | height: 0.25rem;     |
| h-1.5    | height: 0.375rem;    |
| h-2      | height: 0.5rem;      |
| h-2.5    | height: 0.625rem;    |
| h-3      | height: 0.75rem;     |
| h-3.5    | height: 0.875rem;    |
| h-4      | height: 1rem;        |
| h-5      | height: 1.25rem;     |
| h-6      | height: 1.5rem;      |
| h-7      | height: 1.75rem;     |
| h-8      | height: 2rem;        |
| h-9      | height: 2.25rem;     |
| h-10     | height: 2.5rem;      |
| h-11     | height: 2.75rem;     |
| h-12     | height: 3rem;        |
| h-14     | height: 3.5rem;      |
| h-16     | height: 4rem;        |
| h-20     | height: 5rem;        |
| h-24     | height: 6rem;        |
| h-28     | height: 7rem;        |
| h-32     | height: 8rem;        |
| h-36     | height: 9rem;        |
| h-40     | height: 10rem;       |
| h-44     | height: 11rem;       |
| h-48     | height: 12rem;       |
| h-52     | height: 13rem;       |
| h-56     | height: 14rem;       |
| h-60     | height: 15rem;       |
| h-64     | height: 16rem;       |
| h-72     | height: 18rem;       |
| h-80     | height: 20rem;       |
| h-96     | height: 24rem;       |
| h-auto   | height: auto;        |
| h-1/2    | height: 50%;         |
| h-1/3    | height: 33.333333%;  |
| h-2/3    | height: 66.666667%;  |
| h-1/4    | height: 25%;         |
| h-2/4    | height: 50%;         |
| h-3/4    | height: 75%;         |
| h-1/5    | height: 20%;         |
| h-2/5    | height: 40%;         |
| h-3/5    | height: 60%;         |
| h-4/5    | height: 80%;         |
| h-1/6    | height: 16.666667%;  |
| h-2/6    | height: 33.333333%;  |
| h-3/6    | height: 50%;         |
| h-4/6    | height: 66.666667%;  |
| h-5/6    | height: 83.333333%;  |
| h-full   | height: 100%;        |
| h-screen | height: 100vh;       |
| h-svh    | height: 100svh;      |
| h-lvh    | height: 100lvh;      |
| h-dvh    | height: 100dvh;      |
| h-min    | height: min-content; |
| h-max    | height: max-content; |
| h-fit    | height: fit-content; |

### 固定高度

使用 h-{number} 或 h-px 将元素设置为固定高度。

```html
<div class="h-96 ...">h-96</div>
<div class="h-80 ...">h-80</div>
<div class="h-64 ...">h-64</div>
<div class="h-48 ...">h-48</div>
<div class="h-40 ...">h-40</div>
<div class="h-32 ...">h-32</div>
<div class="h-24 ...">h-24</div>
```

### 全高

使用 h-full 将元素的高度设置为其父元素的 100%，只要父元素具有定义的高度。

```html
<div class="h-48">
  <div class="h-full ...">
    <!-- This element will have a height of `12rem` (h-48) -->
  </div>
</div>
```

### 动态视口高度

使用 h-dvh 使元素跨越视口的整个高度，视口的高度会随着浏览器 UI 的扩展或收缩而变化。

### 大视口高度

使用 h-lvh 将元素的高度设置为视口的最大可能高度。这与 100vh 的行为相同。

### 小视口高度

使用 h-svh 将元素的高度设置为视口的最小可能高度。

### 断点和媒体查询

您还可以使用变体修饰符来定位媒体查询，例如响应断点、深色模式、首选减少运动等。例如，使用 md:h-full 仅在中等屏幕尺寸及以上屏幕尺寸上应用 h-full 实用程序。
