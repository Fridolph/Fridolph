# scroll-behavior

当用户手动导航或者 CSSOM scrolling API 触发滚动操作时，CSS 属性 scroll-behavior 为一个滚动框指定滚动行为，其他任何的滚动，例如那些由于用户行为而产生的滚动，不受这个属性的影响。在根元素中指定这个属性时，它反而适用于视窗。

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-behavior>

```html
<html style="scroll-behavior: smooth;"></html>
```

实验了下还挺好用的，不用去写 toTop 加防抖啥的了


# Scroll Behavior

<https://www.tailwindcss.cn/docs/scroll-behavior>

## 用法

| Class         | Properties               |
| ------------- | ------------------------ |
| scroll-auto   | scroll-behavior: auto;   |
| scroll-smooth | scroll-behavior: smooth; |
