# Skew

<https://www.tailwindcss.cn/docs/skew>

## 用法

| Class     | Properties               |
| --------- | ------------------------ |
| skew-x-0  | transform: skewX(0deg);  |
| skew-y-0  | transform: skewY(0deg);  |
| skew-x-1  | transform: skewX(1deg);  |
| skew-y-1  | transform: skewY(1deg);  |
| skew-x-2  | transform: skewX(2deg);  |
| skew-y-2  | transform: skewY(2deg);  |
| skew-x-3  | transform: skewX(3deg);  |
| skew-y-3  | transform: skewY(3deg);  |
| skew-x-6  | transform: skewX(6deg);  |
| skew-y-6  | transform: skewY(6deg);  |
| skew-x-12 | transform: skewX(12deg); |
| skew-y-12 | transform: skewY(12deg); |

### 倾斜元素

使用 skew-x-{amount} 和 skew-y-{amount} 来倾斜元素。

```html
<img class="skew-y-0 ..." />
<img class="skew-y-3 ..." />
<img class="skew-y-6 ..." />
<img class="skew-y-12 ..." />
```

### 使用负值

要使用负倾斜值，请在类名称前面加上破折号以将其转换为负值。

```html
<img class="-skew-y-6 ..." />
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

如果您需要使用一次性倾斜值，而该倾斜值在您的主题中没有意义，请使用方括号使用任意值动态生成属性。

```html
<div class="skew-y-[17deg]">
  <!-- ... -->
</div>
```
