# Flex

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex>

flex CSS 简写属性设置了弹性项目如何增大或缩小以适应其弹性容器中可用的空间。

此属性是以下 CSS 属性的简写：

- flex-grow
- flex-shrink
- flex-basis

## 语法

```css
/* 关键字值 */
flex: auto;
flex: initial;
flex: none;

/* 单值，无单位数字：flex-grow
flex-basis 此时等于 0。 */
flex: 2;

/* 单值，宽度/高度：flex-basis */
flex: 10em;
flex: 30px;
flex: min-content;

/* 双值：flex-grow | flex-basis */
flex: 1 30px;

/* 双值：flex-grow | flex-shrink */
flex: 2 2;

/* 三值：flex-grow | flex-shrink | flex-basis */
flex: 2 2 10%;

/* 全局值 */
flex: inherit;
flex: initial;
flex: revert;
flex: revert-layer;
flex: unset;
```

可以使用一个，两个或三个值来指定 flex 属性。

单值语法：值必须是以下之一：

- 一个 `<flex-grow>` 的有效值：此时简写会扩展为 flex: `<flex-grow>` 1 0。
- 一个 `<flex-basis>` 的有效值：此时简写会扩展为 flex: 1 1 `<flex-basis>`。
- 关键字 none 或者全局关键字之一。

双值语法：

- 第一个值必须是一个 flex-grow 的有效值。
- 第二个值必须是以下之一：
  - 一个 flex-shrink 的有效值：此时简写会扩展为 flex: `<flex-grow>` `<flex-shrink>` 0。
  - 一个 flex-basis 的有效值：此时简写会扩展为 flex: `<flex-grow>` 1 `<flex-basis>`。

三值语法：值必须按照以下顺序指定：

- 一个 flex-grow 的有效值。
- 一个 flex-shrink 的有效值。
- 一个 flex-basis 的有效值。

## 取值

- initial

元素会根据自身宽高设置尺寸。它会缩短自身以适应 flex 容器，但不会伸长并吸收 flex 容器中的额外自由空间来适应 flex 容器。相当于将属性设置为"flex: 0 1 auto"。

- auto

元素会根据自身的宽度与高度来确定尺寸，但是会伸长并吸收 flex 容器中额外的自由空间，也会缩短自身来适应 flex 容器。这相当于将属性设置为 "flex: 1 1 auto".

- none

元素会根据自身宽高来设置尺寸。它是完全非弹性的：既不会缩短，也不会伸长来适应 flex 容器。相当于将属性设置为"flex: 0 0 auto"。

- <'flex-grow'>

定义 flex 项目的 flex-grow 。负值无效。省略时默认值为 1。 (初始值为 0)

- <'flex-shrink'>

定义 flex 元素的 flex-shrink 。负值无效。省略时默认值为 1。 (初始值为 1)

- <'flex-basis'>

定义 flex 元素的 flex-basis 属性。若值为 0，则必须加上单位，以免被视作伸缩性。省略时默认值为 0。(初始值为 auto)

## 用法

| Class        | Properties      |
| ------------ | --------------- |
| flex-1       | flex: 1 1 0%;   |
| flex-auto    | flex: 1 1 auto; |
| flex-initial | flex: 0 1 auto; |
| flex-none    | flex: none;     |
