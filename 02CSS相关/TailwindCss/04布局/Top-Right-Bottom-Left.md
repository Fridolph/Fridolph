# Top-Right-Bottom-Left

用于控制定位元素的放置的实用程序。

## 用法

| Class       | Properties                                  |
| ----------- | ------------------------------------------- |
| inset-0     | inset:0px;                                  |
| inset-x-0   | left:0px; right:0px;                        |
| inset-y-0   | top:0px; bottom:0px;                        |
| start-0     | inset-inline-start:0px;                     |
| end-0       | inset-inline-end:0px;                       |
| top-0       | top:0px;                                    |
| right-0     | right:0px;                                  |
| bottom-0    | bottom: 0px;                                |
| left-0      | left: 0px;                                  |
| inset-px    | inset: 1px;                                 |
| inset-x-px  | left: 1px; right: 1px;                      |
| inset-y-px  | top: 1px; bottom: 1px;                      |
| start-px    | inset-inline-start: 1px;                    |
| end-px      | inset-inline-end: 1px;                      |
| top-px      | top: 1px;                                   |
| right-px    | right: 1px;                                 |
| bottom-px   | bottom: 1px;                                |
| left-px     | left: 1px;                                  |
| inset-0.5   | inset: 0.125rem; `2px`                      |
| inset-x-0.5 | left: 0.125rem; right: 0.125rem; `2px`      |
| inset-y-0.5 | top: 0.125rem;`2px` bottom: 0.125rem; `2px` |
| start-0.5   | inset-inline-start: 0.125rem; `2px`         |
| end-0.5     | inset-inline-end: 0.125rem; `2px`           |
| top-0.5     | top: 0.125rem; `2px`                        |
| right-0.5   | right: 0.125rem; `2px`                      |
| bottom-0.5  | bottom: 0.125rem; `2px`                     |
| left-0.5    | left: 0.125rem; `2px`                       |
| inset-1     | inset: 0.25rem; `4px`                       |
| inset-auto  | inset:auto;                                 |
| inset-full  | inset: 100%;                                |

> 关于大小的，默认是这个尺寸，可在配置里自定义，但最好建议添加新值，别覆盖默认值，否则容易引起冲突

- 0.5 = 2px
- 1 = 4px
- full 一般看到 full 都代表 100%
- 1/3 新写法，代表百分比 33%
- 2/3 同上 66%
- 1/4 同上 25%
- 2/4 同上 50%
- 3/4 同上 75%
- 注：一般百分比的不会定义太多，不确定就查下文档
- x-full x 轴方向的 一般 left right 这种
- y-full y 轴方向的，同上，一般 top bottom

### 使用负值

要使用负的上/右/下/左值，请在类名前面加上破折号以将其转换为负值。

```html
<div class="relative h-32 w-32 ...">
  <div class="absolute h-14 w-14 -left-4 -top-4 ..."></div>
</div>
```

### 使用逻辑属性

使用 start-_ 和 end-_ 实用程序设置 inset-inline-start 和 inset-inline-end 逻辑属性，它们根据文本方向映射到左侧或右侧。

```html
<div dir="ltr">
  <div class="relative h-32 w-32 ...">
    <div class="absolute h-14 w-14 top-0 start-0 ..."></div>
  </div>
  <div>
    <div dir="rtl">
      <div class="relative h-32 w-32 ...">
        <div class="absolute h-14 w-14 top-0 start-0 ..."></div>
      </div>
      <div></div>
    </div>
  </div>
</div>
```

## inset

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/inset>

CSS 属性 inset 为简写属性，对应于 top、right、bottom 和 left 属性。其与 margin 简写属性具有相同的多值语法。

理解的话，类似 padding

### 语法

```css
/* 长度值 */

/* 应用于所有边 */
inset: 10px;
/* 上下 | 左右 */
inset: 4px 8px;
/* 上 | 左右 | 下 */
inset: 5px 15px 10px;
/* 上 | 右 | 下 | 左 */
inset: 2.4em 3em 3em 3em;

/* 包含块的宽度（左或右）或高度（上或下）的百分比 */
inset: 10% 5% 5% 5%;

/* 关键词值 */
inset: auto;

/* 全局值 */
inset: inherit;
inset: initial;
inset: revert;
inset: revert-layer;
inset: unset;
```

## inset-inline-start

CSS 属性 inset-inline-start 定义了元素的逻辑行首偏移，并根据元素的书写模式、行内方向和文本朝向对应至实体偏移。根据 writing-mode、direction 和 text-orientation 所定义的值，此属性对应于 top、right、bottom 或 left 属性。

### 语法

```css
/* 长度值 */
inset-inline-start: 3px;
inset-inline-start: 2.4em;

/* 包含块的宽度或高度的百分比 */
inset-inline-start: 10%;

/* 关键词值 */
inset-inline-start: auto;

/* 全局值 */
inset-inline-start: inherit;
inset-inline-start: initial;
inset-inline-start: revert;
inset-inline-start: revert-layer;
inset-inline-start: unset;
```

> inset-inline-start 和 inset-inline-end 的简写属性为 inset-inline
