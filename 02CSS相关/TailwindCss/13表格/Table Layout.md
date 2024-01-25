# table-layout

table-layout CSS 属性定义了用于布局表格的单元格、行和列的算法。

## 语法

```css
/* 关键字值 */
table-layout: auto;
table-layout: fixed;

/* 全局值 */
table-layout: inherit;
table-layout: initial;
table-layout: revert;
table-layout: revert-layer;
table-layout: unset;
```

- auto 默认情况下，大多数浏览器使用自动表格布局算法。表格及其单元格的宽度会根据内容自动调整大小。

- fixed 表格和列的宽度是由 table 和 col 元素的宽度或第一行单元格的宽度来设置的。后续行中的单元格不会影响列的宽度。

在“fixed”布局方法下，一旦下载并分析了第一行表格，整个表格就可以被渲染出来。这可以加快渲染时间，相比于“automatic”布局方法，但是后续单元格内容可能不适合提供的列宽。单元格使用 overflow 属性来确定是否要剪裁任何溢出的内容，但仅当表格具有已知宽度时才会生效；否则，它们不会溢出到单元格之外。

# Table Layout

用于控制表布局算法的实用程序。

## 用法

| Class       | Properties           |
| ----------- | -------------------- |
| table-auto  | table-layout: auto;  |
| table-fixed | table-layout: fixed; |

### auto

使用 table-auto 允许表格自动调整列大小以适合单元格的内容。

```html
<table class="table-auto">
  <thead>
    <tr>
      <th>Song</th>
      <th>Artist</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
    </tr>
    <tr>
      <td>Witchy Woman</td>
      <td>The Eagles</td>
      <td>1972</td>
    </tr>
    <tr>
      <td>Shining Star</td>
      <td>Earth, Wind, and Fire</td>
      <td>1975</td>
    </tr>
  </tbody>
</table>
```

### fixed

使用 table-fixed 允许表格忽略内容并使用固定的列宽度。第一行的宽度将设置整个表格的列宽度。您可以手动设置某些列的宽度，其余可用宽度将在没有明确宽度的列之间平均分配。

```html
<table class="table-fixed">
  <thead>
    <tr>
      <th>Song</th>
      <th>Artist</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
    </tr>
    <tr>
      <td>Witchy Woman</td>
      <td>The Eagles</td>
      <td>1972</td>
    </tr>
    <tr>
      <td>Shining Star</td>
      <td>Earth, Wind, and Fire</td>
      <td>1975</td>
    </tr>
  </tbody>
</table>
```
