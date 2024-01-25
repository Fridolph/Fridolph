# transform-origin

transform-origin CSS 属性让你更改一个元素变形的原点。

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin>

| keyword | value |
| ------- | ----- |
| left    | 0%    |
| center  | 50%   |
| right   | 100%  |
| top     | 0%    |
| bottom  | 100%  |

# Transform Origin

<https://www.tailwindcss.cn/docs/transform-origin>

## 用法

| Class               | Properties                      |
| ------------------- | ------------------------------- |
| origin-center       | transform-origin: center;       |
| origin-top          | transform-origin: top;          |
| origin-top-right    | transform-origin: top right;    |
| origin-right        | transform-origin: right;        |
| origin-bottom-right | transform-origin: bottom right; |
| origin-bottom       | transform-origin: bottom;       |
| origin-bottom-left  | transform-origin: bottom left;  |
| origin-left         | transform-origin: left;         |
| origin-top-left     | transform-origin: top left;     |

### 任意值

如果您需要使用一次性转换原点值，而该值在主题中包含没有意义，请使用方括号使用任意值动态生成属性。

```html
<div class="origin-[33%_75%]">
  <!-- ... -->
</div>
```
