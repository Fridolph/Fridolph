# Divide Color

## 用法

| Class                  | Properties                      |
| ---------------------- | ------------------------------- |
| divide-inherit > +     | border-color: inherit;          |
| divide-current > +     | border-color: currentColor;     |
| divide-transparent > + | border-color: transparent;      |
| divide-black > +       | border-color: rgb(0 0 0);       |
| divide-white > +       | border-color: rgb(255 255 255); |

### 设置分割颜色

使用 divide-{color}实用程序控制元素之间的边框颜色。

```html
<div class="divide-y divide-blue-200">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### 改变不透明度

使用颜色不透明度修改器控制分割颜色的不透明度。

```html
<div class="divide-y-4 divide-slate-400/25 ...">
  <!-- ... -->
</div>
```

### 悬停、焦点和其他状态

Tailwind 允许您使用变体修饰符有条件地在不同状态下应用实用程序类。例如，使用 hover:divide-pink-400 仅在悬停时应用 divide-pink-400 实用程序。

```html
<div class="divide-y divide-teal-400 hover:divide-pink-400">
  <!-- ... -->
</div>
```

### 断点和媒体查询

您还可以使用变体修饰符来定位媒体查询，例如响应断点、深色模式、首选减少运动等。例如，使用 md:divide-pink-400 仅在中等屏幕尺寸及以上屏幕尺寸上应用 divide-pink-400 实用程序。

```html
<div class="divide-y divide-teal-400 md:divide-pink-400">
  <!-- ... -->
</div>
```
