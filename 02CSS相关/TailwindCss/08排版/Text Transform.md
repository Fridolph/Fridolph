# text-transform

text-transform CSS 属性指定如何将元素的文本大写。它可以用于使文本显示为全大写或全小写，也可单独对每一个单词进行操作。

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-transform>

```css
/* 关键字值 */
text-transform: none;
text-transform: capitalize;
text-transform: uppercase;
text-transform: lowercase;
text-transform: full-width;
text-transform: full-size-kana;

/* 全局值 */
text-transform: inherit;
text-transform: initial;
text-transform: revert;
text-transform: revert-layer;
text-transform: unset;

```

## 取值

- uppercase 这个关键字强制所有字符被转换为大写。

- lowercase 这个关键字强制所有字符被转换为小写。

- none 这个关键字阻止所有字符的大小写被转换。

- full-width 是一个关键字，它强制将字符（主要是表意文字和拉丁文字））--写在一个正方形内，使它们能够在通常的东亚文字（如中文或日文）中对齐。

- full-size-kana 通常用于 `<ruby>` 注释文本，该关键字将所有小假名字符转换为等效的全尺寸假名，以补偿在 ruby 中通常使用的小字体的可读性问题。

# Text Transform

<https://www.tailwindcss.cn/docs/text-transform>

## 用法

| Class       | Properties                  |
| ----------- | --------------------------- |
| uppercase   | text-transform: uppercase;  |
| lowercase   | text-transform: lowercase;  |
| capitalize  | text-transform: capitalize; |
| normal-case | text-transform: none;       |
