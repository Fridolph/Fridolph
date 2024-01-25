# Width

用于设置元素宽度的实用程序。

<https://www.tailwindcss.cn/docs/width>

## 用法

| Class    | Properties          |
| -------- | ------------------- |
| w-0      | width: 0px;         |
| w-px     | width: 1px;         |
| w-0.5    | width: 0.125rem;    |
| w-1      | width: 0.25rem;     |
| w-1.5    | width: 0.375rem;    |
| w-2      | width: 0.5rem;      |
| w-2.5    | width: 0.625rem;    |
| w-3      | width: 0.75rem;     |
| w-3.5    | width: 0.875rem;    |
| w-4      | width: 1rem;        |
| w-5      | width: 1.25rem;     |
| w-6      | width: 1.5rem;      |
| w-7      | width: 1.75rem;     |
| w-8      | width: 2rem;        |
| w-9      | width: 2.25rem;     |
| w-10     | width: 2.5rem;      |
| w-11     | width: 2.75rem;     |
| w-12     | width: 3rem;        |
| w-14     | width: 3.5rem;      |
| w-16     | width: 4rem;        |
| w-20     | width: 5rem;        |
| w-24     | width: 6rem;        |
| w-28     | width: 7rem;        |
| w-32     | width: 8rem;        |
| w-36     | width: 9rem;        |
| w-40     | width: 10rem;       |
| w-44     | width: 11rem;       |
| w-48     | width: 12rem;       |
| w-52     | width: 13rem;       |
| w-56     | width: 14rem;       |
| w-60     | width: 15rem;       |
| w-64     | width: 16rem;       |
| w-72     | width: 18rem;       |
| w-80     | width: 20rem;       |
| w-96     | width: 24rem;       |
| w-auto   | width: auto;        |
| w-1/2    | width: 50%;         |
| w-1/3    | width: 33.333333%;  |
| w-2/3    | width: 66.666667%;  |
| w-1/4    | width: 25%;         |
| w-2/4    | width: 50%;         |
| w-3/4    | width: 75%;         |
| w-1/5    | width: 20%;         |
| w-2/5    | width: 40%;         |
| w-3/5    | width: 60%;         |
| w-4/5    | width: 80%;         |
| w-1/6    | width: 16.666667%;  |
| w-2/6    | width: 33.333333%;  |
| w-3/6    | width: 50%;         |
| w-4/6    | width: 66.666667%;  |
| w-5/6    | width: 83.333333%;  |
| w-1/12   | width: 8.333333%;   |
| w-2/12   | width: 16.666667%;  |
| w-3/12   | width: 25%;         |
| w-4/12   | width: 33.333333%;  |
| w-5/12   | width: 41.666667%;  |
| w-6/12   | width: 50%;         |
| w-7/12   | width: 58.333333%;  |
| w-8/12   | width: 66.666667%;  |
| w-9/12   | width: 75%;         |
| w-10/12  | width: 83.333333%;  |
| w-11/12  | width: 91.666667%;  |
| w-full   | width: 100%;        |
| w-screen | width: 100vw;       |
| w-svw    | width: 100svw;      |
| w-lvw    | width: 100lvw;      |
| w-dvw    | width: 100dvw;      |
| w-min    | width: min-content; |
| w-max    | width: max-content; |
| w-fit    | width: fit-content; |

> 关于大小的，默认是这个尺寸，可在配置里自定义，但最好建议添加新值，别覆盖默认值，否则容易引起冲突

- 0.5 = 2px
- 1 = 4px
- full 一般看到 full 都代表 100%
- 1/3 新写法，代表百分比 33%
- 2/3 同上 66%
- 1/4 同上 25%
- 2/4 同上 50%
- 3/4 同上 75%
- 注：一般百分比的不会定义太多，不确定就查下文档
- x-full x 轴方向的 一般 left right 这种
- y-full y 轴方向的，同上，一般 top bottom

## 绝对长度单位

<https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units>

以下都是绝对长度单位——它们与其他任何东西都没有关系，通常被认为总是相同的大小。

| 单位 | 名称         | 等价换算                 |
| ---- | ------------ | ------------------------ |
| cm   | 厘米         | 1cm = 37.8px = 25.2/64in |
| mm   | 毫米         | 1mm = 1/10th of 1cm      |
| Q    | 四分之一毫米 | 1Q = 1/40th of 1cm       |
| in   | 英寸         | 1in = 2.54cm = 96px      |
| pc   | 派卡         | 1pc = 1/6th of 1in       |
| pt   | 点           | 1pt = 1/72th of 1in      |
| px   | 像素         | 1px = 1/96th of 1in      |

## 相对长度单位

相对长度单位相对于其他一些东西，比如父元素的字体大小，或者视图端口的大小。使用相对单位的好处是，经过一些仔细的规划，你可以使文本或其他元素的大小与页面上的其他内容相对应。下表列出了 web 开发中一些最有用的单位。

| 单位 | 相对于 |
| --- | --- |
| em | 在 font-size 中使用是相对于父元素的字体大小，在其他属性中使用是相对于自身的字体大小，如 width。 |
| ex | 字符“x”的高度。 |
| ch | 数字“0”的宽度。 |
| rem | 根元素的字体大小。 |
| lh | 元素的行高。 |
| rlh | 根元素的行高。当用于根元素的 font-size 或 line-height 属性时，它指的是这些属性的初始值。 |
| vw | 视口宽度的 1%。 |
| vh | 视口高度的 1%。 |
| vmin | 视口较小尺寸的 1%。 |
| vmax | 视口大尺寸的 1%。 |
| vb | 在根元素的块向上，初始包含块的尺寸的 1%。 |
| vi | 在根元素的行向上，初始包含块的尺寸的 1%。 |
| svw、svh | 分别为视口较小尺寸的宽度和高度的 1%。 |
| lvw、lvh | 分别为视口大尺寸的宽度和高度的 1%。 |
| dvw、dvh | 分别为动态视口的宽度和高度的 1%。 |

## 其他注解

### min-content

min-content 是一个 CSS 的尺寸关键字，表示的是内容的最小宽度。对于文本内容而言，这意味着内容会利用所有软换行的机会，变得尽可能的小，大小不会超过最长单词的宽度。

```css
/* 作为长度使用 */
width: min-content;
inline-size: min-content;
height: min-content;
block-size: min-content;

/* 在 grid track 中使用 */
grid-template-columns: 200px 1fr min-content;

/* 全局值 */
min-content: inherit;
min-content: initial;
min-content: revert;
min-content: revert-layer;
min-content: unset;
```

### max-content

max-content 尺寸关键字代表了内容的最大宽度或最大高度。对于文本内容而言，这意味着内容即便溢出也不会被换行。

```css
/* 作为长度使用 */
width: max-content;
inline-size: max-content;
height: max-content;
block-size: max-content;

/* 在 grid track 中使用 */
grid-template-columns: 200px 1fr max-content;

/* 全局值 */
max-content: inherit;
max-content: initial;
max-content: revert;
max-content: revert-layer;
max-content: unset;
```

### fit-content

fit-content 行为类似于 fit-content(stretch)，实际上这意味着盒子会使用可用的空间，但永远不会超过 max-content。

fit-content 属性可以用于设置元素的 width、height、min-width、min-height、max-width 和 max-height，此时最大和最小尺寸将基于元素的内容尺寸计算。

```css
width: fit-content;
block-size: fit-content;
```
