# Margin

用于控制元素边距的实用程序。

<https://www.tailwindcss.cn/docs/margin>

## 用法

| Class  | Properties                                     |
| ------ | ---------------------------------------------- |
| m-0    | margin: 0px;                                   |
| mx-0   | margin-left: 0px; margin-right: 0px;           |
| my-0   | margin-top: 0px; margin-bottom: 0px;           |
| ms-0   | margin-inline-start: 0px;                      |
| me-0   | margin-inline-end: 0px;                        |
| mt-0   | margin-top: 0px;                               |
| mr-0   | margin-right: 0px;                             |
| mb-0   | margin-bottom: 0px;                            |
| ml-0   | margin-left: 0px;                              |
| m-px   | margin: 1px;                                   |
| mx-px  | margin-left: 1px; margin-right: 1px;           |
| my-px  | margin-top: 1px; margin-bottom: 1px;           |
| ms-px  | margin-inline-start: 1px;                      |
| me-px  | margin-inline-end: 1px;                        |
| mt-px  | margin-top: 1px;                               |
| mr-px  | margin-right: 1px;                             |
| mb-px  | margin-bottom: 1px;                            |
| ml-px  | margin-left: 1px;                              |
| m-0.5  | margin: 0.125rem;                              |
| mx-0.5 | margin-left: 0.125rem; margin-right: 0.125rem; |
| my-0.5 | margin-top: 0.125rem; margin-bottom: 0.125rem; |
| ms-0.5 | margin-inline-start: 0.125rem;                 |
| me-0.5 | margin-inline-end: 0.125rem;                   |
| mt-0.5 | margin-top: 0.125rem;                          |
| mr-0.5 | margin-right: 0.125rem;                        |
| mb-0.5 | margin-bottom: 0.125rem;                       |
| ml-0.5 | margin-left: 0.125rem;                         |
| m-1    | margin: 0.25rem;                               |
| mx-1   | margin-left: 0.25rem; margin-right: 0.25rem;   |
| my-1   | margin-top: 0.25rem; margin-bottom: 0.25rem;   |
| ms-1   | margin-inline-start: 0.25rem;                  |
| me-1   | margin-inline-end: 0.25rem;                    |
| mt-1   | margin-top: 0.25rem;                           |
| mr-1   | margin-right: 0.25rem;                         |
| mb-1   | margin-bottom: 0.25rem;                        |
| ml-1   | margin-left: 0.25rem;                          |


### tailwind.config.js

您可以通过编辑 tailwind.config.js 文件中的 theme.padding 或 theme.extend.padding 来自定义填充比例。

```js
module.exports = {
  theme: {
    extend: {
      margin: {
        '5px': '5px',
      }
    }
  }
}
```

## 其他一些注解

### margin-inline-start

margin-inline-start CSS 属性定义元素的逻辑行首外边距，根据元素的书写模式、行内方向和文本朝向映射为实体的外边距。它根据 writing-mode、direction 和 text-orientation 属性的值对应于 margin-top、margin-right、margin-bottom 或 margin-left 属性。

### margin-inline-end

margin-inline-end CSS 属性定义元素的逻辑行末外边距，根据元素的书写模式、行内方向和文本朝向映射为实体外边距。换句话说，它根据 writing-mode、direction 和 text-orientation 属性的值对应于 margin-top、margin-right、margin-bottom 或 margin-left 属性。
