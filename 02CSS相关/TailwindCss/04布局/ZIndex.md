# z-index

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index>

CSS z-index 属性设置定位元素及其后代元素或 flex 项目的 Z 轴顺序。z-index 较大的重叠元素会覆盖较小的元素。

对于定位盒子（即 position 属性值非 static 的盒子），z-index 属性会指定：

1. 盒子在当前层叠上下文中的层叠等级。
2. 盒子是否会创建局部层叠上下文。

## 语法

```css
/* 关键字值 */
z-index: auto;

/* 整数值 */
z-index: 0;
z-index: 3;
z-index: 289;
z-index: -1; /* 使用负值降低优先级 */

/* 全局值 */
z-index: inherit;
z-index: initial;
z-index: unset;
```

- auto 盒子不会创建一个新的局部层叠上下文。盒子在当前层叠上下文的层叠等级是 0。

- `<integer>` 盒子在当前层叠上下文的层叠等级就是 `<integer>` 的值。盒子还会创建一个局部层叠上下文。这意味着该元素的后代元素不会和该元素的外部元素比较 z-index。

## 用法

| Class  | Properties     |
| ------ | -------------- |
| z-0    | z-index: 0;    |
| z-10   | z-index: 10;   |
| z-20   | z-index: 20;   |
| z-30   | z-index: 30;   |
| z-40   | z-index: 40;   |
| z-50   | z-index: 50;   |
| z-auto | z-index: auto; |

### 自定义

内置提供得值很少，我们可在配置文件中自定义

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      zIndex: {
        100: '100',
        1000: '1000',
      },
    },
  },
}
```

### 任意值

如果您需要使用一次性 z-index 值，而该值在主题中包含没有意义，请使用方括号使用任意值动态生成属性。

```html
<div class="z-[100]">
  <!-- ... -->
</div>
```
