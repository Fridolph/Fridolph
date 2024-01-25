# Break After

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/break-after>

break-after CSS 属性描述在生成的盒子之后的页面，列或区域中断行为（换句话说，如何以及是否中断）。如果没有生成的盒子，则该属性将被忽略。


用于控制列或页面在元素之后如何分隔的实用程序。

| Class                  | Properties               |
| ---------------------- | ------------------------ |
| break-after-auto       | break-after: auto;       |
| break-after-avoid      | break-after: avoid;      |
| break-after-all        | break-after: all;        |
| break-after-avoid-page | break-after: avoid-page; |
| break-after-page       | break-after: page;       |
| break-after-left       | break-after: left;       |
| break-after-right      | break-after: right;      |
| break-after-column     | break-after: column;     |


设置中断后行为

使用 break-after-{value} 实用程序来控制元素后的分栏符或分页符的行为方式。例如，使用“break-after-column”实用程序强制在元素后进行分栏。

```html
<div class="columns-2">
  <p>Well, let me tell you something, ...</p>
  <p class="break-after-column">Sure, go ahead, laugh...</p>
  <p>Maybe we can live without...</p>
  <p>Look. If you think this is...</p>
</div>
```


