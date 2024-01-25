# Line Clamp

|<https://www.tailwindcss.cn/docs/line-clamp>|

## 用法

| Class | Properties |
| --- | --- |
| line-clamp-1 | overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; |
| line-clamp-2 | overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; |
| line-clamp-3 | overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; |
| line-clamp-4 | overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4; |
| line-clamp-5 | overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 5; |
| line-clamp-6 | overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 6; |
| line-clamp-none | overflow: visible; display: block; -webkit-box-orient: horizontal; -webkit-line-clamp: none; |

## -webkit-line-clamp

-webkit-line-clamp CSS 属性可以把块容器中的内容限制为指定的行数。

它只有在 display 属性设置成 -webkit-box 或者 -webkit-inline-box 并且 box-orient 属性设置成 vertical 时才有效果。

在大部分情况下，也需要设置 overflow 属性为 hidden，否则，里面的内容不会被裁减，并且在内容显示为指定行数后还会显示省略号。

当应用于锚（anchor）元素时，截断可以发生在文本中间，而不必在末尾。

```css
/* 关键词值 */
-webkit-line-clamp: none;

/* 整数值 */
-webkit-line-clamp: 3;
-webkit-line-clamp: 10;

/* 全局值 */
-webkit-line-clamp: inherit;
-webkit-line-clamp: initial;
-webkit-line-clamp: revert;
-webkit-line-clamp: revert-layer;
-webkit-line-clamp: unset;
```

## box-orient

这是原始的 css 弹性布局草案的一个属性，已经被最新的标准替代。查看 flexbox (en-US) 了解现行标准。

box-orient CSS 属性用来设置一个元素是水平还是垂直布局其内容。

```css
/* Keyword values */
box-orient: horizontal;
box-orient: vertical;
box-orient: inline-axis;
box-orient: block-axis;

/* Global values */
box-orient: inherit;
box-orient: initial;
box-orient: unset;
```
