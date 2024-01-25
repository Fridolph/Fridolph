# Rotate

<https://www.tailwindcss.cn/docs/rotate>

## 用法

| Class      | Properties                 |
| ---------- | -------------------------- |
| rotate-0   | transform: rotate(0deg);   |
| rotate-1   | transform: rotate(1deg);   |
| rotate-2   | transform: rotate(2deg);   |
| rotate-3   | transform: rotate(3deg);   |
| rotate-6   | transform: rotate(6deg);   |
| rotate-12  | transform: rotate(12deg);  |
| rotate-45  | transform: rotate(45deg);  |
| rotate-90  | transform: rotate(90deg);  |
| rotate-180 | transform: rotate(180deg); |

### 旋转元素

使用 rotate-{angle}实用程序来旋转元素。

```html
<img class="rotate-0 ..." />
<img class="rotate-45 ..." />
<img class="rotate-90 ..." />
<img class="rotate-180 ..." />
```

### 使用负值

要使用负旋转值，请在类名称前面加上破折号以将其转换为负值。

```html
<img class="-rotate-45 ..." />
```

### 删除变换

要一次删除元素上的所有转换，请使用 transform-none 实用程序：

```html
<div class="scale-75 translate-x-4 skew-y-3 md:transform-none">
  <!-- ... -->
</div>
```

### 硬件加速

如果您的过渡在由 GPU 而不是 CPU 渲染时表现更好，您可以通过添加 Transform-gpu 实用程序来强制硬件加速：

```html
<div class="rotate-45 transform-gpu">
  <!-- ... -->
</div>
```

如果您需要有条件地撤消此操作，请使用 transform-cpu 将事情强制返回 CPU。

### 任意值

如果您需要使用一次性旋转值，而该旋转值在您的主题中没有意义，请使用方括号使用任意值动态生成属性。

```html
<div class="rotate-[17deg]">
  <!-- ... -->
</div>
```
