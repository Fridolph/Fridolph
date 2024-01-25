# Divide Width

<https://www.tailwindcss.cn/docs/divide-width>

## 用法

| Class            | Properties                                       |
| ---------------- | ------------------------------------------------ |
| divide-x-0       | border-right-width: 0px; border-left-width: 0px; |
| divide-x-2       | border-right-width: 0px; border-left-width: 2px; |
| divide-x-4       | border-right-width: 0px; border-left-width: 4px; |
| divide-x-8       | border-right-width: 0px; border-left-width: 8px; |
| divide-x         | border-right-width: 0px; border-left-width: 1px; |
| divide-y-0       | border-top-width: 0px; border-bottom-width: 0px; |
| divide-y-2       | border-top-width: 2px; border-bottom-width: 0px; |
| divide-y-4       | border-top-width: 4px; border-bottom-width: 0px; |
| divide-y-8       | border-top-width: 8px; border-bottom-width: 0px; |
| divide-y         | border-top-width: 1px; border-bottom-width: 0px; |
| divide-y-reverse | --tw-divide-y-reverse: 1;                        |
| divide-x-reverse | --tw-divide-x-reverse: 1;                        |

这个写法是在父元素上，是对子元素生效

### 在水平子项之间添加边框

使用 divide-x-{width} 实用程序在水平元素之间添加边框。

```html
<div class="grid grid-cols-3 divide-x">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### 在堆叠的子项之间添加边框

使用 split-y-{width} 实用程序在堆叠元素之间添加边框。

```html
<div class="grid grid-cols-1 divide-y">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### 逆转子元素顺序

如果您的元素顺序相反（例如使用 flex-row-reverse 或 flex-col-reverse），请使用 divide-x-reverse 或 divide-y-reverse 实用程序来确保将边框添加到每个元素的正确一侧。

```html
<div class="flex flex-col-reverse divide-y divide-y-reverse">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### 悬停、焦点和其他状态

Tailwind 允许您使用变体修饰符有条件地在不同状态下应用实用程序类。例如，使用 hover:divide-y-8 仅在悬停时应用 divide-y-8 实用程序。

```html
<div class="divide-y divide-gray-400 hover:divide-y-8">
  <!-- ... -->
</div>
```

### 断点和媒体查询

您还可以使用变体修饰符来定位媒体查询，例如响应断点、深色模式、首选减少运动等。例如，使用 md:divide-y-8 仅在中等屏幕尺寸及以上屏幕尺寸上应用 divide-y-8 实用程序。

```html
<div class="divide-y divide-gray-400 md:divide-y-8">
  <!-- ... -->
</div>
```
