# grid-template-columns

grid-template-columns 该属性是基于网格列的维度，去定义网格线的名称和网格轨道的尺寸大小。

## 语法

```css
/* Keyword value */
grid-template-columns: none;

/* <track-list> values */
grid-template-columns: 100px 1fr;
grid-template-columns: [linename] 100px;
grid-template-columns: [linename1] 100px [linename2 linename3];
grid-template-columns: minmax(100px, 1fr);
grid-template-columns: fit-content(40%);
grid-template-columns: repeat(3, 200px);

/* <auto-track-list> values */
grid-template-columns: 200px repeat(auto-fill, 100px) 300px;
grid-template-columns:
  minmax(100px, max-content)
  repeat(auto-fill, 200px) 20%;
grid-template-columns:
  [linename1] 100px [linename2]
  repeat(auto-fit, [linename3 linename4] 300px)
  100px;
grid-template-columns:
  [linename1 linename2] 100px
  repeat(auto-fit, [linename1] 300px) [linename3];

/* Global values */
grid-template-columns: inherit;
grid-template-columns: initial;
grid-template-columns: unset;
```

## 用法

| Class             | Properties                                         |
| ----------------- | -------------------------------------------------- |
| grid-cols-1       | grid-template-columns: repeat(1, minmax(0, 1fr));  |
| grid-cols-2       | grid-template-columns: repeat(2, minmax(0, 1fr));  |
| grid-cols-3       | grid-template-columns: repeat(3, minmax(0, 1fr));  |
| grid-cols-4       | grid-template-columns: repeat(4, minmax(0, 1fr));  |
| grid-cols-5       | grid-template-columns: repeat(5, minmax(0, 1fr));  |
| grid-cols-6       | grid-template-columns: repeat(6, minmax(0, 1fr));  |
| grid-cols-7       | grid-template-columns: repeat(7, minmax(0, 1fr));  |
| grid-cols-8       | grid-template-columns: repeat(8, minmax(0, 1fr));  |
| grid-cols-9       | grid-template-columns: repeat(9, minmax(0, 1fr));  |
| grid-cols-10      | grid-template-columns: repeat(10, minmax(0, 1fr)); |
| grid-cols-11      | grid-template-columns: repeat(11, minmax(0, 1fr)); |
| grid-cols-12      | grid-template-columns: repeat(12, minmax(0, 1fr)); |
| grid-cols-none    | grid-template-columns: none;                       |
| grid-cols-subgrid | grid-template-columns: subgrid;                    |


### 指定网格中的列

使用 grid-cols-{n} 实用程序创建具有 n 个大小相等的列的网格。

```html
<div class="grid grid-cols-4 gap-4">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
</div>
```
