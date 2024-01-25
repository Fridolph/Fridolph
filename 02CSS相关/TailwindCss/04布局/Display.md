# Display

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/display>

CSS display 属性设置元素是否被视为块或者内联元素以及用于子元素的布局，例如流式布局、网格布局或弹性布局。

形式上，display 属性设置元素的内部和外部的显示类型。外部类型设置元素参与流式布局；内部类型设置子元素的布局。一些 display 值在它们自己的单独规范中完整定义；例如，在 CSS 弹性盒模型的规范中，定义了声明 display: flex 时会发生的细节。

## 语法

```css
/* precomposed values */
display: block;
display: inline;
display: inline-block;
display: flex;
display: inline-flex;
display: grid;
display: inline-grid;
display: flow-root;

/* box generation */
display: none;
display: contents;

/* two-value syntax */
display: block flow;
display: inline flow;
display: inline flow-root;
display: block flex;
display: inline flex;
display: block grid;
display: inline grid;
display: block flow-root;

/* other values */
display: table;
display: table-row; /* all table elements have an equivalent CSS display value */
display: list-item;

/* Global values */
display: inherit;
display: initial;
display: revert;
display: revert-layer;
display: unset;
```

## 用法

| Class              | Properties                   |
| ------------------ | ---------------------------- |
| block              | display:block;               |
| inline-block       | display:inline-block;        |
| inline             | display:inline;              |
| flex               | display:flex;                |
| inline-flex        | display:inline-flex;         |
| table              | display:table;               |
| inline-table       | display:inline-table;        |
| table-caption      | display:table-caption;       |
| table-cell         | display:table-cell;          |
| table-column       | display: table-column;       |
| table-column-group | display: table-column-group; |
| table-footer-group | display: table-footer-group; |
| table-header-group | display: table-header-group; |
| table-row-group    | display: table-row-group;    |
| table-row          | display: table-row;          |
| flow-root          | display:table-roww;          |
| grid               | display:grid;                |
| inline-grid        | display:inline-grid;         |
| contents           | display:contents;            |
| list-item          | display:list-item;           |
| hidden             | display:none;                |

## Flow Root

使用 flow-root 创建具有自己的块格式化上下文的块级元素。

## Grid

```html
<div class="relative rounded-xl overflow-auto p-8">
  <div
    class="grid grid-cols-3 grid-rows-3 gap-4 font-mono text-white text-sm font-bold leading-6 bg-stripes-fuchsia rounded-lg text-center"
  >
    <div class="p-4 bg-fuchsia-500 shadow-lg rounded-lg">01</div>
    <div class="p-4 bg-fuchsia-500 shadow-lg rounded-lg">02</div>
    <div class="p-4 bg-fuchsia-500 shadow-lg rounded-lg">03</div>
    <div class="p-4 bg-fuchsia-500 shadow-lg rounded-lg">04</div>
    <div class="p-4 bg-fuchsia-500 shadow-lg rounded-lg">05</div>
    <div class="p-4 bg-fuchsia-500 shadow-lg rounded-lg">06</div>
    <div class="p-4 bg-fuchsia-500 shadow-lg rounded-lg">07</div>
    <div class="p-4 bg-fuchsia-500 shadow-lg rounded-lg">08</div>
    <div class="p-4 bg-fuchsia-500 shadow-lg rounded-lg">09</div>
  </div>
</div>
```
