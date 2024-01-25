# blur()

blur() CSS 方法将高斯模糊应用于输出图片。结果为 `<filter-function>`.

# Blur

<https://www.tailwindcss.cn/docs/blur>

## 用法

| Class     | Properties          |
| --------- | ------------------- |
| blur-none | filter: blur(0);    |
| blur-sm   | filter: blur(4px);  |
| blur      | filter: blur(8px);  |
| blur-md   | filter: blur(12px); |
| blur-lg   | filter: blur(16px); |
| blur-xl   | filter: blur(24px); |
| blur-2xl  | filter: blur(40px); |
| blur-3xl  | filter: blur(64px); |

### 模糊元素

使用 blur-{amount?} 实用程序来模糊元素。

```html
<div class="blur-none ...">
  <!-- ... -->
</div>
<div class="blur-sm ...">
  <!-- ... -->
</div>
<div class="blur-lg ...">
  <!-- ... -->
</div>
<div class="blur-2xl ...">
  <!-- ... -->
</div>
```

### 移除过滤器

要一次删除元素上的所有过滤器，请使用 filter-none 实用程序：

```html
<div class="blur-md invert brightness-150 md:filter-none">
  <!-- ... -->
</div>
```

### 悬停、焦点和其他状态

Tailwind 允许您使用变体修饰符有条件地在不同状态下应用实用程序类。例如，使用 hover:blur-lg 仅在悬停时应用 blur-lg 实用程序。

```html
<div class="blur hover:blur-lg">
  <!-- ... -->
</div>
```

### 断点和媒体查询

您还可以使用变体修饰符来定位媒体查询，例如响应断点、深色模式、首选减少运动等。例如，使用 md:blur-lg 仅在中等屏幕尺寸及以上尺寸应用模糊-lg 实用程序。

```html
<div class="blur md:blur-lg">
  <!-- ... -->
</div>
```

### 任意值

如果您需要使用一次性模糊值，而该值在主题中包含没有意义，请使用方括号使用任意值动态生成属性。

```html
<div class="blur-[2px]">
  <!-- ... -->
</div>
```
