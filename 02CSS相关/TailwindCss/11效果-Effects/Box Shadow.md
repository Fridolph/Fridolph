# Box Shadow

<https://www.tailwindcss.cn/docs/box-shadow>

## 用法

| Class        | Properties                                                                       |
| ------------ | -------------------------------------------------------------------------------- |
| shadow-sm    | box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);                                       |
| shadow       | box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);       |
| shadow-md    | box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);    |
| shadow-lg    | box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);  |
| shadow-xl    | box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); |
| shadow-2xl   | box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);                                 |
| shadow-inner | box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);                                 |
| shadow-none  | box-shadow: 0 0 #0000;                                                           |

### 添加外部阴影

使用 shadow-sm、shadow、shadow-md、shadow-lg、shadow-xl 或 shadow-2xl 实用程序将不同大小的外部框阴影应用到元素。

```html
<div class="shadow-md ..."></div>
<div class="shadow-lg ..."></div>
<div class="shadow-xl ..."></div>
<div class="shadow-2xl ..."></div>
```

### 添加内阴影

使用 Shadow-inner 实用程序将微妙的内嵌框阴影应用到元素。这对于表单控件或井等内容很有用。

```html
<div class="shadow-inner ..."></div>
```

### 去除阴影

使用 Shadow-none 从元素中删除现有的框阴影。这最常用于删除在较小断点处应用的阴影。

```html
<div class="shadow-none ..."></div>
```
