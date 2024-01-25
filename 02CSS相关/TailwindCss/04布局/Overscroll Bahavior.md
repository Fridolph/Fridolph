# Overscroll Behavior

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/overscroll-behavior>

overscroll-behavior CSS 属性是 overscroll-behavior-x 和 overscroll-behavior-y 属性的合并写法，让你可以控制浏览器过度滚动时的表现——也就是滚动到边界。

## 语法

> overscroll-behavior 属性可以使用下面列表中的一或两个关键字指定。使用两个关键字来指定 overscroll-behavior 分别在 x 和 y 轴的值。只用一个值的话，x 和 y 轴都被指定为该值。

- auto 默认效果

- contain 设置这个值后，默认的滚动边界行为不变（“触底”效果或者刷新），但是临近的滚动区域不会被滚动链影响到，比如对话框后方的页面不会滚动。

- none 临近滚动区域不受到滚动链影响，而且默认的滚动到边界的表现也被阻止。

```css
/* 关键字的值 */
overscroll-behavior: auto; /* 默认 */
overscroll-behavior: contain;
overscroll-behavior: none;

/* 使用 2 个值 */
overscroll-behavior: auto contain;

/* Global values */
overflow: inherit;
overflow: initial;
overflow: unset;
```

## 用法

| Class                | Properties                      |
| -------------------- | ------------------------------- |
| overscroll-auto      | overscroll-behavior: auto;      |
| overscroll-contain   | overscroll-behavior: contain;   |
| overscroll-none      | overscroll-behavior: none;      |
| overscroll-y-auto    | overscroll-behavior-y: auto;    |
| overscroll-y-contain | overscroll-behavior-y: contain; |
| overscroll-y-none    | overscroll-behavior-y: none;    |
| overscroll-x-auto    | overscroll-behavior-x: auto;    |
| overscroll-x-contain | overscroll-behavior-x: contain; |
| overscroll-x-none    | overscroll-behavior-x: none;    |


### 防止父级过度滚动

使用 overscroll-contain 可以防止目标区域中的滚动触发父元素中的滚动，但在支持它的操作系统中滚动超过容器末尾时保留“反弹”效果。

```html
<div class="overscroll-contain ...">Well, let me tell you something, ...</div>
```

### 使用默认的过度滚动行为

使用 overscroll-auto 使用户可以在到达主滚动区域的边界时继续滚动父滚动区域。

```html
<div class="overscroll-auto ...">Well, let me tell you something, ...</div>
```
