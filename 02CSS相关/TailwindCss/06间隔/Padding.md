# Padding

<https://www.tailwindcss.cn/docs/padding>

用于控制元素填充的实用程序。

## 用法

| Class  | Properties                                       |
| ------ | ------------------------------------------------ |
| p-0    | padding: 0px;                                    |
| px-0   | padding-left: 0px; padding-right: 0px;           |
| py-0   | padding-top: 0px; padding-bottom: 0px;           |
| ps-0   | padding-inline-start: 0px;                       |
| pe-0   | padding-inline-end: 0px;                         |
| pt-0   | padding-top: 0px;                                |
| pr-0   | padding-right: 0px;                              |
| pb-0   | padding-bottom: 0px;                             |
| pl-0   | padding-left: 0px;                               |
| p-px   | padding: 1px;                                    |
| px-px  | padding-left: 1px; padding-right: 1px;           |
| py-px  | padding-top: 1px; padding-bottom: 1px;           |
| ps-px  | padding-inline-start: 1px;                       |
| pe-px  | padding-inline-end: 1px;                         |
| pt-px  | padding-top: 1px;                                |
| pr-px  | padding-right: 1px;                              |
| pb-px  | padding-bottom: 1px;                             |
| pl-px  | padding-left: 1px;                               |
| p-0.5  | padding: 0.125rem;                               |
| px-0.5 | padding-left: 0.125rem; padding-right: 0.125rem; |
| py-0.5 | padding-top: 0.125rem; padding-bottom: 0.125rem; |
| ps-0.5 | padding-inline-start: 0.125rem;                  |
| pe-0.5 | padding-inline-end: 0.125rem;                    |
| pt-0.5 | padding-top: 0.125rem;                           |
| pr-0.5 | padding-right: 0.125rem;                         |
| pb-0.5 | padding-bottom: 0.125rem;                        |
| pl-0.5 | padding-left: 0.125rem;                          |
| p-1    | padding: 0.25rem;                                |
| px-1   | padding-left: 0.25rem; padding-right: 0.25rem;   |
| py-1   | padding-top: 0.25rem; padding-bottom: 0.25rem;   |
| ps-1   | padding-inline-start: 0.25rem;                   |
| pe-1   | padding-inline-end: 0.25rem;                     |
| pt-1   | padding-top: 0.25rem;                            |
| pr-1   | padding-right: 0.25rem;                          |
| pb-1   | padding-bottom: 0.25rem;                         |
| pl-1   | padding-left: 0.25rem;                           |

### tailwind.config.js

您可以通过编辑 tailwind.config.js 文件中的 theme.padding 或 theme.extend.padding 来自定义填充比例。

```js
module.exports = {
  theme: {
    extend: {
      padding: {
        '5px': '5px',
      }
    }
  }
}
```


## 其他一些注解

### padding-inline-start

CSS 属性 padding-inline-start 定义了元素的逻辑行首内边距，并根据元素的书写模式、行内方向和文本朝向对应至实体内边距。

### padding-inline-end

CSS 属性 padding-inline-end 定义了元素的逻辑行末内边距，并根据元素的书写模式、行内方向和文本朝向对应至实体内边距。
