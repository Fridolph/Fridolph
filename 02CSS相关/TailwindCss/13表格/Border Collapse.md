# border-collapse

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-collapse>

border-collapse CSS 属性是用来决定表格的边框是分开的还是合并的。在分隔模式下，相邻的单元格都拥有独立的边框。在合并模式下，相邻单元格共享边框。

- 合并（collapsed）模式下，表格中相邻单元格共享边框。在这种模式下，CSS 属性 border-style 的值 inset 表现为槽，值 outset 表现为脊。

- 分隔（separated）模式是 HTML 表格的传统模式。相邻单元格都拥有不同的边框。边框之间的距离是通过 CSS 属性 border-spacing 来确定的。

# Border Collapse

用于控制表格边框是否应折叠或分离的实用程序。

## 用法

| Class           | Properties                 |
| --------------- | -------------------------- |
| border-collapse | border-collapse: collapse; |
| border-separate | border-collapse: separate; |

### Collapse

如果可能，使用 border-collapse 将相邻单元格边框合并为单个边框。请注意，这包括顶级 `<table>` 标记上的折叠边框。

```html
<table class="border-collapse border border-slate-400 ...">
  <thead>
    <tr>
      <th class="border border-slate-300 ...">State</th>
      <th class="border border-slate-300 ...">City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-slate-300 ...">Indiana</td>
      <td class="border border-slate-300 ...">Indianapolis</td>
    </tr>
    <tr>
      <td class="border border-slate-300 ...">Ohio</td>
      <td class="border border-slate-300 ...">Columbus</td>
    </tr>
    <tr>
      <td class="border border-slate-300 ...">Michigan</td>
      <td class="border border-slate-300 ...">Detroit</td>
    </tr>
  </tbody>
</table>
```

### Separate

使用 border-separate 强制每个单元格显示自己单独的边框。

```html
<table class="border-separate border border-slate-400 ...">
  <thead>
    <tr>
      <th class="border border-slate-300 ...">State</th>
      <th class="border border-slate-300 ...">City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-slate-300 ...">Indiana</td>
      <td class="border border-slate-300 ...">Indianapolis</td>
    </tr>
    <tr>
      <td class="border border-slate-300 ...">Ohio</td>
      <td class="border border-slate-300 ...">Columbus</td>
    </tr>
    <tr>
      <td class="border border-slate-300 ...">Michigan</td>
      <td class="border border-slate-300 ...">Detroit</td>
    </tr>
  </tbody>
</table>
```
