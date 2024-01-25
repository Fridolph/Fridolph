# background

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/background>

是一种 CSS 简写属性，用于一次性集中定义各种背景属性，包括 color, image, origin 与 size, repeat 方式等等。

此属性是一个 简写属性，可以在一次声明中定义一个或多个属性：background-clip、background-color、background-image、background-origin、background-position、background-repeat、background-size，和 background-attachment。

background 属性被指定多个背景层时，使用逗号分隔每个背景层。

## 语法

每一层的语法如下：

在每一层中，下列的值可以出现 0 次或 1 次：

- `<attachment>`
- `<bg-image>`
- `<position>`
- `<bg-size>`
- `<repeat-style>`
- `<bg-size>` 只能紧接着 `<position>` 出现，以"/"分割，如： "center/80%".
- `<box>` 可能出现 0 次、1 次或 2 次。如果出现 1 次，它同时设定 background-origin 和 background-clip。如果出现 2 次，第一次的出现设置 background-origin，第二次的出现设置 background-clip。
- `<background-color>` 只能被包含在最后一层。

## 值

- `<attachment>` 参见 background-attachment

- `<box>` 参见 background-clip 和 background-origin

- `<background-color>` 参见 background-color

- `<bg-image>` 参见 background-image

- `<position>` 参见 background-position

- `<repeat-style>` 参见 background-repeat

- `<bg-size>` 参见 background-size。
