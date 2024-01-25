# text-overflow

text-overflow CSS 属性用于确定如何提示用户存在隐藏的溢出内容。其形式可以是裁剪、显示一个省略号（“…”）或显示一个自定义字符串。

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-overflow>

text-overflow 属性只对那些在块级元素溢出的内容有效，但是必须要与块级元素内联（inline）方向一致（举个反例：文本无法在盒子的下方溢出）。

```css
text-overflow: clip;
text-overflow: ellipsis ellipsis;
text-overflow: ellipsis ' [..]';

/* Global values */
text-overflow: inherit;
text-overflow: initial;
text-overflow: revert;
text-overflow: revert-layer;
text-overflow: unset;
```

- clip

默认值。这个关键字会在内容区域的极限处截断文本，因此可能会在单词的中间发生截断。如果你的目标浏览器支持 text-overflow: ''，为了能在两个单词过渡处截断，你可以使用一个空字符串值（''）作为 text-overflow 属性的值。

- ellipsis

这个关键字会用一个省略号（'…'、U+2026 HORIZONTAL ELLIPSIS）来表示被截断的文本。这个省略号被添加在内容区域中，因此会减少显示的文本。如果空间太小以至于连省略号都容纳不下，那么这个省略号也会被截断。

# Text Overflow

<https://www.tailwindcss.cn/docs/text-overflow>

## 用法

| Class         | Properties                                                      |
| ------------- | --------------------------------------------------------------- |
| truncate      | overflow: hidden; text-overflow: ellipsis; white-space: nowrap; |
| text-ellipsis | text-overflow: ellipsis;                                        |
| text-clip     | text-overflow: clip;                                            |
