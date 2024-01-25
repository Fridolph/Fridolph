# font-smooth

## 语法

```css
/* 关键字值 */
font-smooth: auto;
font-smooth: never;
font-smooth: always;

/* <length> 值 */
font-smooth: 2em;

/* 全局值 */
font-smooth: inherit;
font-smooth: initial;
font-smooth: revert;
font-smooth: revert-layer;
font-smooth: unset;
```

- auto——由浏览器决定（如果可用，则使用亚像素抗锯齿；这是默认值）。
- none——关闭字体平滑；显示带有锯齿边缘的文本。
- antialiased——在像素（而不是亚像素）级别平滑字体。对于深色背景上的浅色文本，从亚像素渲染切换为抗锯齿渲染可以使其看起来更清晰。
- subpixel-antialiased——在大多数非视网膜显示器上，这将会提供最清晰的文本。

# Font Smoothing

| Class                | Properties                                                              |
| -------------------- | ----------------------------------------------------------------------- |
| antialiased          | -webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale; |
| subpixel-antialiased | -webkit-font-smoothing: auto; -moz-osx-font-smoothing: auto;            |
