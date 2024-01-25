# grid-template-rows

grid-template-rows 该属性是基于 网格行 的维度，去定义网格线的名称和网格轨道的尺寸大小。

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-rows>

## 用法

| Class             | Properties                                      |
| ----------------- | ----------------------------------------------- |
| grid-rows-1       | grid-template-rows: repeat(1, minmax(0, 1fr));  |
| grid-rows-2       | grid-template-rows: repeat(2, minmax(0, 1fr));  |
| grid-rows-3       | grid-template-rows: repeat(3, minmax(0, 1fr));  |
| grid-rows-4       | grid-template-rows: repeat(4, minmax(0, 1fr));  |
| grid-rows-5       | grid-template-rows: repeat(5, minmax(0, 1fr));  |
| grid-rows-6       | grid-template-rows: repeat(6, minmax(0, 1fr));  |
| grid-rows-7       | grid-template-rows: repeat(7, minmax(0, 1fr));  |
| grid-rows-8       | grid-template-rows: repeat(8, minmax(0, 1fr));  |
| grid-rows-9       | grid-template-rows: repeat(9, minmax(0, 1fr));  |
| grid-rows-10      | grid-template-rows: repeat(10, minmax(0, 1fr)); |
| grid-rows-11      | grid-template-rows: repeat(11, minmax(0, 1fr)); |
| grid-rows-12      | grid-template-rows: repeat(12, minmax(0, 1fr)); |
| grid-rows-none    | grid-template-rows: none;                       |
| grid-rows-subgrid | grid-template-rows: subgrid;                    |

### 指定网格中的行

使用 grid-rows-{n} 实用程序创建具有 n 个大小相等的行的网格。

```html
<div class="grid grid-rows-4 grid-flow-col gap-4">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
</div>
```
