# aspect-radio

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/aspect-ratio>

CSS 属性 aspect-ratio 为盒子规定了首选纵横比，这个纵横比可以用于计算 auto 尺寸以及其他布局函数。

- auto
具有固有纵横比的可替换元素将使用此纵横比，否则盒子无首选纵横比。涉及固有纵横比的尺寸计算始终使用内容盒的尺寸。

- `<ratio>`
盒子的首选纵横比为指定的 width / height 比率。如果省略 height 和前面的斜杠字符，则 height 默认为 1。涉及首选纵横比的尺寸计算使用由 box-sizing 所指定的盒子的尺寸。

```css
aspect-ratio: 1 / 1;
aspect-ratio: 16 / 9;
aspect-ratio: 0.5;
```

## 用法

| Class         | Property              |
| ------------- | --------------------- |
| aspect-auto   | aspect-radio: auto;   |
| aspect-square | aspect-radio: 1 / 1;  |
| aspect-video  | aspect-radio: 16 / 9; |

## hover focus

TW 使您可以使用变体修饰符有条件地在不同状态下应用实用程序类。例如，使用悬停：仅在悬停方面应用方面方向实用程序。

```html
<iframe class="w-full aspect-video hover:aspect-square" src="https://www.youtube.com"></iframe>
```
