# transition

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition>

transition CSS 属性是 transition-property、transition-duration、transition-timing-function 和 transition-delay 的一个简写属性

## 语法

```css
/* property name | duration | timing function | delay */
transition: margin-right 4s ease-in-out 1s;

/* Apply to all changed properties */
transition: all 0.5s ease-out;
```

# Transition Property

<https://www.tailwindcss.cn/docs/transition-property>

## 用法

- transition-none
  - transition-property: none;
- transition-all
  - transition-property: all;
  - transition-timing-funciton: cubic-bezier(0.4, 0, 0.2, 1);
  - transition-duration: 150ms;
- transition
  - transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  - transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  - transition-duration: 150ms;
- transition-colors
  - transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  - transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  - transition-duration: 150ms;
- transition-opacity
  - transition-property: opacity;
  - transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  - transition-duration: 150ms;
- transition-shadow
  - transition-property: box-shadow;
  - transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  - transition-duration: 150ms;
- transition-transform
  - transition-property: transform;
  - transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  - transition-duration: 150ms;

### 控制过渡属性

使用 transition-{properties}实用程序来指定哪些属性在更改时应进行转换。

```html
<button
  class="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ..."
>
  Save Changes
</button>
```

### Prefers-reduced-motion

对于用户指定他们更喜欢减少运动的情况，您可以使用运动安全和运动减少变体有条件地应用动画和过渡：

```html
<button
  class="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none ..."
>
  Hover me
</button>
```

### 断点和媒体查询

您还可以使用变体修饰符来定位媒体查询，例如响应断点、深色模式、首选减少运动等。例如，使用 md:transition-all 仅在中等屏幕尺寸及以上屏幕尺寸上应用 transition-all 实用程序。

```html
<div class="md:transition-all">
  <!-- ... -->
</div>
```

### 定制您的主题

默认情况下，Tailwind 为七种常见属性组合提供转换属性实用程序。您可以通过编辑 tailwind.config.js 文件中的 theme.transitionProperty 或 theme.extend.transitionProperty 来自定义这些值。

```js
module.exports = {
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
    },
  },
}
```

### 任意值

如果您需要使用一次性转换属性值，而该值在主题中包含没有意义，请使用方括号使用任意值动态生成属性。

```html
<div class="transition-[height]">
  <!-- ... -->
</div>
```
