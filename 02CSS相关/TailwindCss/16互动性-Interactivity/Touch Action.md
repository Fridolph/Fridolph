# touch-action

CSS 属性 touch-action 用于设置触摸屏用户如何操纵元素的区域 (例如，浏览器内置的缩放功能)。

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action>

- auto 当触控事件发生在元素上时，由浏览器来决定进行哪些操作，比如对 viewport 进行平滑、缩放等。

- none 当触控事件发生在元素上时，不进行任何操作。

- pan-x 启用单指水平平移手势。可以与 pan-y、pan-up、pan-down 和／或 pinch-zoom 组合使用。

- pan-y 启用单指垂直平移手势。可以与 pan-x 、pan-left、pan-right 和／或 pinch-zoom 组合使用。

- manipulation 浏览器只允许进行滚动和持续缩放操作。任何其他被 auto 值支持的行为不被支持。启用平移和缩小缩放手势，但禁用其他非标准手势，例如双击以进行缩放。禁用双击可缩放功能可减少浏览器在用户点击屏幕时延迟生成点击事件的需要。这是“pan-x pan-y pinch-zoom”（为了兼容性本身仍然有效）的别名。

- pan-left, pan-right,pan-up,pan-down 实验性启用以指定方向滚动开始的单指手势。一旦滚动开始，方向可能仍然相反。请注意，滚动“向上”（pan-up）意味着用户正在将其手指向下拖动到屏幕表面上，同样 pan-left 表示用户将其手指向右拖动。多个方向可以组合，除非有更简单的表示（例如，“pan-left pan-right”无效，因为“pan-x”更简单，而“pan-left pan-down”有效）。

- pinch-zoom 启用多手指平移和缩放页面。这可以与任何平移值组合。

## Touch Action

<https://www.tailwindcss.cn/docs/touch-action>

| Class              | Properties                  |
| ------------------ | --------------------------- |
| touch-auto         | touch-action: auto;         |
| touch-none         | touch-action: none;         |
| touch-pan-x        | touch-action: pan-x;        |
| touch-pan-left     | touch-action: pan-left;     |
| touch-pan-right    | touch-action: pan-right;    |
| touch-pan-y        | touch-action: pan-y;        |
| touch-pan-up       | touch-action: pan-up;       |
| touch-pan-down     | touch-action: pan-down;     |
| touch-pinch-zoom   | touch-action: pinch-zoom;   |
| touch-manipulation | touch-action: manipulation; |
