# word-break

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break>

CSS 属性 word-break 指定了怎样在单词内断行。

## 语法

```css
/* Keyword values */
word-break: normal;
word-break: break-all;
word-break: keep-all;
word-break: break-word; /* deprecated */

/* Global values */
word-break: inherit;
word-break: initial;
word-break: unset;
```

## 取值

- normal 使用默认的断行规则。

- break-all 对于 non-CJK (CJK 指中文/日文/韩文) 文本，可在任意字符间断行。

- keep-all CJK 文本不断行。Non-CJK 文本表现同 normal。

- break-word 已弃用他的效果是 word-break: normal 和 overflow-wrap: anywhere 的合，不论 overflow-wrap 的值是多少。

> 备注： 与 word-break: break-word 和 overflow-wrap: break-word（详见 overflow-wrap）对比，word-break: break-word 将在文本可能溢出其容器的确切位置创建一个断点。

# Word Break

## 用法

| Class        | Properties                                 |
| ------------ | ------------------------------------------ |
| break-normal | overflow-wrap: normal; word-break: normal; |
| break-words  | overflow-wrap: break-word;                 |
| break-all    | word-break: break-all;                     |
| break-keep   | word-break: keep-all;                      |
