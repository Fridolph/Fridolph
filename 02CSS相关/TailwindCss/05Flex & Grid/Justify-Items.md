# justify-items

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-items>

CSS 的 justify-items 属性为所有盒中的项目定义了默认的 justify-self ，可以使这些项目以默认方式沿适当轴线对齐到每个盒子。

该属性的作用效果取决于我们使用的布局模式：

- 在块级布局中，会将其包含的项目在其行内轴上对齐；
- 绝对定位的元素中，会将其包含的项目在其行内轴上对齐，同时考虑 top、left、bottom、right 的值；
- 表格单元中，该属性被忽略（块级元素、绝对定位元素和表格布局中对齐的更多信息）；
- 弹性盒子布局中，该属性被忽略（弹性盒子中对齐的更多信息）；
- 栅格布局中，会将其栅格区域内的项目在其行内轴上对齐（栅格布局中对齐的更多信息 ；

## 语法

```css
/* Basic keywords */
justify-items: auto;
justify-items: normal;
justify-items: stretch;

/* Positional alignment */
justify-items: center; /* Pack items around the center */
justify-items: start; /* Pack items from the start */
justify-items: end; /* Pack items from the end */
justify-items: flex-start; /* Pack flex items from the start */
justify-items: flex-end; /* Pack flex items from the end */
justify-items: self-start;
justify-items: self-end;
justify-items: left; /* Pack items from the left */
justify-items: right; /* Pack items from the right */

/* Baseline alignment */
justify-items: baseline;
justify-items: first baseline;
justify-items: last baseline;

/* Overflow alignment (for positional alignment only) */
justify-items: safe center;
justify-items: unsafe center;

/* Legacy alignment */
justify-items: legacy right;
justify-items: legacy left;
justify-items: legacy center;

/* Global values */
justify-items: inherit;
justify-items: initial;
justify-items: unset;
```

此属性可以采用四种不同的形式之一：

- 关键词：关键字 normal，auto，或 stretch 任选其一
- 基线对齐：关键词 baseline ，可选 first 或 last 之一为前缀
- 位置对其：关键词 center，start，end，flex-start，flex-end，self-start，self-end，left 或 right 任选其一，可选 safe 或 unsafe 之一为前缀

## 用法

| Class                 | Properties              |
| --------------------- | ----------------------- |
| justify-items-start   | justify-items: start;   |
| justify-items-end     | justify-items: end;     |
| justify-items-center  | justify-items: center;  |
| justify-items-stretch | justify-items: stretch; |
