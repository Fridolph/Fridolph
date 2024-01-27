# scroll-margin

简写属性 scroll-margin 同时设置元素的所有滚动外边距，其赋值方式较为类似 margin 属性为元素外边距赋值的方式。

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-margin>

通过滚动至示例内容两“页”之间的一点可见 scroll-margin 的效果。为 scroll-margin 指定的值决定了页面主要位于吸附口外的多少部分应保持可见。

因此 scroll-margin 值表示定义滚动吸附区域的外边距，此区域用于将此盒吸附至滚动口。滚动吸附区域的确定方法为：取变换后的边框盒，求其矩形包围盒（与滚动容器的坐标空间中的轴对齐），再加上指定的外边距。

# Scroll Margin

<https://www.tailwindcss.cn/docs/scroll-margin>

看了下文档，对于控制轮播图，水平滚动这类挺友好的

fullpage 幻灯片也能用上
