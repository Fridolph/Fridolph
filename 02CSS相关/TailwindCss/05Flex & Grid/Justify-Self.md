# justify-self

CSS justify-self 属性设置单个盒子在其布局容器适当轴中的对其方式。

此属性的效果取决于我们所处的布局模式：

- 在块级布局中，它对齐一个项目在其包含块的内联轴上。
- 对于绝对定位的元素，它对齐一个项目在其包含块的内联轴上，同时计算 top，left，bottom 与 right 的值。
- 在表格布局中，这个属性被忽略（更多 关于块、绝对定位以及表格布局中的对齐方式）
- 在弹性布局中，这个属性被忽略（更多关于弹性布局中的对齐方式）
- 在栅格布局中，它对齐一个元素到该元素所在的栅格区域的内联轴上

## 语法

```css
/* 基础关键字 */
justify-self: auto;
justify-self: normal;
justify-self: stretch;

/* 位置对齐 */
justify-self: center; /* 在中间放置元素 */
justify-self: start; /* 在开始处放置元素 */
justify-self: end; /* 在结束处放置元素 */
justify-self: flex-start; /* 与 'start' 等效。注意 justify-self 在 Flexbox 布局中被忽略。 */
justify-self: flex-end; /* 与 'end' 等效。注意 justify-self 在 Flexbox 布局中被忽略。 */
justify-self: self-start;
justify-self: self-end;
justify-self: left; /* 在左侧放置元素 */
justify-self: right; /* 在右侧放置元素 */

/* 基线对齐 */
justify-self: baseline;
justify-self: first baseline;
justify-self: last baseline;

/* 溢出对齐（只对位置对齐有效果）*/
justify-self: safe center;
justify-self: unsafe center;

/* 全局关键字 */
justify-self: inherit;
justify-self: initial;
justify-self: unset;
```

## 用法

| Class                | Properties             |
| -------------------- | ---------------------- |
| justify-self-auto    | justify-self: auto;    |
| justify-self-start   | justify-self: start;   |
| justify-self-end     | justify-self: end;     |
| justify-self-center  | justify-self: center;  |
| justify-self-stretch | justify-self: stretch; |
