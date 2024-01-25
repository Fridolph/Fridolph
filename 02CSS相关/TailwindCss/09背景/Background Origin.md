# background-origin

background-origin 规定了指定背景图片 background-image 属性的原点位置的背景相对区域。

> 注意：当使用 background-attachment 为 fixed 时，该属性将被忽略不起作用。备注： 假如 background 简写中没有设置该值，那么在 background 简写值后指定 background-origin，那么后面的值就会覆盖简写值，其实说白了，就是后出现的值会覆盖前面的值。

## 语法

```css
background-origin: border-box;
background-origin: padding-box;
background-origin: content-box;
background-origin: inherit;
```

- border-box 背景图片的摆放以 border 区域为参考

- padding-box 背景图片的摆放以 padding 区域为参考

- content-box 背景图片的摆放以 content 区域为参考

# Background Origin

<https://www.tailwindcss.cn/docs/background-origin>

## 用法

| Class             | Properties                     |
| ----------------- | ------------------------------ |
| bg-origin-border  | background-origin:border-box;  |
| bg-origin-padding | background-origin:padding-box; |
| bg-origin-content | background-origin:content-box; |
