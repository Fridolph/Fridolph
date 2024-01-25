# background-clip

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip>

background-clip 设置元素的背景（背景图片或颜色）是否延伸到边框、内边距盒子、内容盒子下面。

如果没有设置背景图片（background-image）或背景颜色（background-color），那么这个属性只有在边框（ border）被设置为非固实（soild）、透明或半透明时才能看到视觉效果（与 border-style 或 border-image 有关），否则，本属性产生的样式变化会被边框覆盖。

## 语法

```css
/* Keyword values */
background-clip: border-box;
background-clip: padding-box;
background-clip: content-box;
background-clip: text;

/* Global values */
background-clip: inherit;
background-clip: initial;
background-clip: unset;
```

- border-box 背景延伸至边框外沿（但是在边框下层）。

- padding-box 背景延伸至内边距（padding）外沿。不会绘制到边框处。

- content-box 背景被裁剪至内容区（content box）外沿。

- text 实验性. 背景被裁剪成文字的前景色。

# Background Clip

## 用法

| Class           | Properties                    |
| --------------- | ----------------------------- |
| bg-clip-border  | background-clip: border-box;  |
| bg-clip-padding | background-clip: padding-box; |
| bg-clip-content | background-clip: content-box; |
| bg-clip-text    | background-clip: text;        |
