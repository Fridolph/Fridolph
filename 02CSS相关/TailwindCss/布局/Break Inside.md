# Break Inside

用于控制列或页面在元素内的分隔方式的实用程序。

## Setting the break-inside behavior

使用 break-inside-{value} 实用程序来控制分栏符或分页符在元素内的行为方式。例如，使用 break-inside-avoid-column 实用程序来避免元素内出现列分隔符。

```html
<div class="columns-2">
  <p>Well, let me tell you something, ...</p>
  <p class="break-inside-avoid-column">Sure, go ahead, laugh...</p>
  <p>Maybe we can live without...</p>
  <p>Look. If you think this is...</p>
</div>
```
