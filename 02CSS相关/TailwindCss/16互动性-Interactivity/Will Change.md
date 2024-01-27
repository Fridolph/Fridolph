# will-change

CSS 属性 will-change 为 web 开发者提供了一种告知浏览器该元素会有哪些变化的方法，这样浏览器可以在元素属性真正发生变化之前提前做好对应的优化准备工作。这种优化可以将一部分复杂的计算工作提前准备好，使页面的反应更为快速灵敏。

> 警告：will-change 应该被视为最后的应对手段，用于解决现有的性能问题。不应该被用来预测性能问题。

想要用好该属性很棘手，文档里很详细，这里不帖，想明白一定要看文档

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change>

取值

- auto 表示没有特别指定哪些属性会变化，浏览器需要自己去猜，然后使用浏览器经常使用的一些常规方法优化。

- `<animateable-feature>` 可以是以下值：

  - scroll-position 表示开发者希望在不久后改变滚动条的位置或者使之产生动画。

  - contents 表示开发者希望在不久后改变元素内容中的某些东西，或者使它们产生动画。

- `<custom-ident>`

该属性表示开发者期望在不久的将来对元素上给定名称的属性进行动画或更改。如果给定的属性是一个缩写，它表示对缩写展开的所有属性的期望。它不能是以下任何值：unset、initial、inherit、will-change、auto、scroll-position 或 contents。规范没有定义特定值的行为，但是 transform 通常被用作合成层提示。在给定特定的 CSS 属性标识时，Chrome 目前会执行两个操作：建立新的合成层或新的层叠上下文。

## Will Change

用于优化即将发生变化的元素的动画的实用程序。

<https://www.tailwindcss.cn/docs/will-change>

| Class                 | Properties                    |
| --------------------- | ----------------------------- |
| will-change-auto      | will-change: auto;            |
| will-change-scroll    | will-change: scroll-position; |
| will-change-contents  | will-change: contents;        |
| will-change-transform | will-change: transform;       |
