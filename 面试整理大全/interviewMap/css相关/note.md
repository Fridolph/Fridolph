## CSS盒模型

W3C标准

content-box = width + height

IE 标准

border-box = width + height + padding + border

> 获取宽高的方式

```js
// 屏幕分辨率
window.screen.height / window.screen.width

// 屏幕工作区 高度和宽度 去掉状态栏
window.screen.availHeight / window.screen.availdWidth

// 页面渲染后的结果
window.getComputedStykle(dom).width / window.getComputedStykle(dom).height

// 根据元素在视窗的绝对位置来获取宽高
dom.getBoundingClientRect().width / dom.getBoundingClientRect().height

// 最常用 兼容性最好的
dom.offsetWidth / dom.offsetHeight
```

## BFC

Block Format Context 块级格式化上下文. 一块独立的渲染区域，其内部和外部的元素不会相互影响

- 内部的box会在垂直方向，一个接一个的放置
- 每个元素的margin box的左边，与包含块border box的左边相接触（对于从做往右的格式化，否则相反）
- box垂直方向的距离由margin决定，属于同一个bfc的两个相邻box的margin会发生重叠
- bfc的区域不会与浮动区域的box重叠
- bfc是一个页面上的独立的容器，外面的元素不会影响bfc里的元素，反过来，里面的也不会影响外面的
- 计算bfc高度的时候，浮动元素也会参与计算
