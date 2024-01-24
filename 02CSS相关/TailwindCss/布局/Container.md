# Container

用于将元素宽度固定到当前断点的组件。

容器类设置元素的最大宽度以匹配当前断点的最小宽度。如果您更愿意针对一组固定的屏幕尺寸进行设计而不是尝试适应完全流动的视口，那么这非常有用。

请注意，与您在其他框架中使用的容器不同，Tailwind 的容器不会自动居中，也没有任何内置的水平填充。

## 用法

| Class         | Breakpoint | Properties   |
| ------------- | ---------- | ------------ |
| container     | None       | width: 100%; |
| sm:container  | sm(640px)  | width: 100%; |
| md:container  | md(768px)  | width: 100%; |
| lg:container  | lg(1024px) | width: 100%; |
| xl:container  | xl(1280px) | width: 100%; |
| 2xl:container | 2xl(1536x) | width: 100%; |

要将容器居中，请使用 mx-auto 实用程序：

```html
<div class="container mx-auto">
  <!-- ... -->
</div>
```

要添加水平填充，请使用 px-{size} 实用程序：

```html
<div class="container mx-auto px-4">
  <!-- ... -->
</div>
```

### 响应式变体

容器类还包括响应式变体，例如默认情况下的 md:container ，允许您仅在某个断点及以上处使某些东西表现得像容器：

```html
<!-- Full-width fluid until the `md` breakpoint, then lock to container -->
<div class="md:container md:mx-auto">
  <!-- ... -->
</div>
```
