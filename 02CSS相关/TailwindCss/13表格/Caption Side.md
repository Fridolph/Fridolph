# caption-side

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/caption-side>

CSS 中 caption-side 属性会将表格的标题（`<caption>`）放到规定的位置。但是具体显示的位置与表格的 writing-mode 属性值有关。

## 语法

```css
/* 方向值 */
caption-side: top;
caption-side: bottom;

/* 逻辑值 */
caption-side: block-start;
caption-side: block-end;
caption-side: inline-start;
caption-side: inline-end;

/* 全局值 */
caption-side: inherit;
caption-side: initial;
caption-side: revert;
caption-side: revert-layer;
caption-side: unset;
```

- top 标题盒应置于表格上方。

- bottom 标题盒应置于表格下方。

- block-start 标题盒应置于表格的块首一侧。

- block-end 标题盒应置于表格的块末一侧。

- inline-start 标题盒应置于表格的行首一侧。

- inline-end 标题盒应置于表格的行末一侧。

# Caption Side

<https://www.tailwindcss.cn/docs/caption-side>

## 用法

| Class          | Properties            |
| -------------- | --------------------- |
| caption-top    | caption-side: top;    |
| caption-bottom | caption-side: bottom; |
