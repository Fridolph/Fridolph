# box-shadow

用于创建带有盒子阴影的轮廓环的实用程序。

<https://www.tailwindcss.cn/docs/ring-width>

CSS box-shadow 属性用于在元素的框架上添加阴影效果。你可以在同一个元素上设置多个阴影效果，并用逗号将他们分隔开。该属性可设置的值包括阴影的 X 轴偏移量、Y 轴偏移量、模糊半径、扩散半径和颜色。

你几乎可以在任何元素上使用 box-shadow 来添加阴影效果。如果元素同时设置了 border-radius 属性，那么阴影也会有圆角效果。多个阴影在 z 轴上的顺序和多个 text shadows 规则相同 (第一个阴影在最上面)。

Box-shadow generator 是一个允许你生成 box-shadow 的交互式工具。

```css
/* x 偏移量 | y 偏移量 | 阴影颜色 */
box-shadow: 60px -16px teal;

/* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影颜色 */
box-shadow: 10px 5px 5px black;

/* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

/* 插页 (阴影向内) | x 偏移量 | y 偏移量 | 阴影颜色 */
box-shadow: inset 5em 1em gold;

/* 任意数量的阴影，以逗号分隔 */
box-shadow: 3px 3px red, -1em 0 0.4em olive;

/* 全局关键字 */
box-shadow: inherit;
box-shadow: initial;
box-shadow: unset;
```

向元素添加单个 box-shadow 效果时使用以下规则：

- 当给出两个、三个或四个 `<length>`值时。
  - 如果只给出两个值，那么这两个值将会被当作 `<offset-x>` `<offset-y>` 来解释。
  - 如果给出了第三个值，那么第三个值将会被当作`<blur-radius>`解释。
  - 如果给出了第四个值，那么第四个值将会被当作`<spread-radius>`来解释。
- 可选，inset 关键字。
- 可选，`<color>`值。

若要对同一个元素添加多个阴影效果，请使用逗号将每个阴影规则分隔开。

# Ring Width

<https://www.tailwindcss.cn/docs/ring-width>

## 用法

| Class | Properties |
| --- | --- |
| ring-0 | box-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color); |
| ring-1 | box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color); |
| ring-2 | box-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color); |
| ring | box-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color); |
| ring-4 | box-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color); |
| ring-8 | box-shadow: var(--tw-ring-inset) 0 0 0 calc(8px + var(--tw-ring-offset-width)) var(--tw-ring-color); |
| ring-inset | --tw-ring-inset: inset; |
