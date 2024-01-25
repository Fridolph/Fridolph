# Opacity

<https://www.tailwindcss.cn/docs/opacity>

## 用法

| Class       | Properties     |
| ----------- | -------------- |
| opacity-0   | opacity: 0;    |
| opacity-5   | opacity: 0.05; |
| opacity-10  | opacity: 0.1;  |
| opacity-15  | opacity: 0.15; |
| opacity-20  | opacity: 0.2;  |
| opacity-25  | opacity: 0.25; |
| opacity-30  | opacity: 0.3;  |
| opacity-35  | opacity: 0.35; |
| opacity-40  | opacity: 0.4;  |
| opacity-45  | opacity: 0.45; |
| opacity-50  | opacity: 0.5;  |
| opacity-55  | opacity: 0.55; |
| opacity-60  | opacity: 0.6;  |
| opacity-65  | opacity: 0.65; |
| opacity-70  | opacity: 0.7;  |
| opacity-75  | opacity: 0.75; |
| opacity-80  | opacity: 0.8;  |
| opacity-85  | opacity: 0.85; |
| opacity-90  | opacity: 0.9;  |
| opacity-95  | opacity: 0.95; |
| opacity-100 | opacity: 1;    |

### 更改元素的不透明度

使用 opacity-{amount} 实用程序控制元素的不透明度。

```html
<button class="bg-indigo-500 opacity-100 ..."></button>
<button class="bg-indigo-500 opacity-75 ..."></button>
<button class="bg-indigo-500 opacity-50 ..."></button>
<button class="bg-indigo-500 opacity-25 ..."></button>
```

### 悬停、焦点和其他状态

Tailwind 允许您使用变体修饰符有条件地在不同状态下应用实用程序类。例如，使用 hover:opacity-100 仅在悬停时应用 opacity-100 实用程序。

```html
<div class="opacity-50 hover:opacity-100">
  <!-- ... -->
</div>
```

### 断点和媒体查询

您还可以使用变体修饰符来定位媒体查询，例如响应断点、深色模式、首选减少运动等。例如，使用 md:opacity-100 仅在中等屏幕尺寸及以上尺寸应用 opacity-100 实用程序。

```html
<div class="opacity-50 md:opacity-100">
  <!-- ... -->
</div>
```

### 任意值

如果您需要使用一次性不透明度值，而该值在主题中包含没有意义，请使用方括号使用任意值动态生成属性。

```html
<div class="opacity-[.67]">
  <!-- ... -->
</div>
```
