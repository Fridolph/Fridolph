# Size

<https://www.tailwindcss.cn/docs/size>

如果宽高相同可以用 size 来写

## 用法

| Class      | Properties                               |
| ---------- | ---------------------------------------- |
| size-0     | width: 0px; height: 0px;                 |
| size-px    | width: 1px; height: 1px;                 |
| size-0.5   | width: 0.125rem; height: 0.125rem;       |
| size-1     | width: 0.25rem; height: 0.25rem;         |
| size-1.5   | width: 0.375rem; height: 0.375rem;       |
| size-2     | width: 0.5rem; height: 0.5rem;           |
| size-2.5   | width: 0.625rem; height: 0.625rem;       |
| size-3     | width: 0.75rem; height: 0.75rem;         |
| size-3.5   | width: 0.875rem; height: 0.875rem;       |
| size-4     | width: 1rem height: 1rem;                |
| size-5     | width: 1.25rem; height: 1.25rem;         |
| size-6     | width: 1.5rem; height: 1.5rem;           |
| size-7     | width: 1.75rem; height: 1.75rem;         |
| size-8     | width: 2rem; height: 2rem;               |
| size-9     | width: 2.25rem; height: 2.25rem;         |
| size-10    | width: 2.5rem; height: 2.5rem;           |
| size-11    | width: 2.75rem; height: 2.75rem;         |
| size-12    | width: 3rem; height: 3rem;               |
| size-14    | width: 3.5rem; height: 3.5rem;           |
| size-16    | width: 4rem; height: 4rem;               |
| size-20    | width: 5rem; height: 5rem;               |
| size-24    | width: 6rem; height: 6rem;               |
| size-28    | width: 7rem; height: 7rem;               |
| size-32    | width: 8rem; height: 8rem;               |
| size-36    | width: 9rem; height: 9rem;               |
| size-40    | width: 10rem; height: 10rem;             |
| size-44    | width: 11rem; height: 11rem;             |
| size-48    | width: 12rem; height: 12rem;             |
| size-52    | width: 13rem; height: 13rem;             |
| size-56    | width: 14rem; height: 14rem;             |
| size-60    | width: 15rem; height: 15rem;             |
| size-64    | width: 16rem; height: 16rem;             |
| size-72    | width: 18rem; height: 18rem;             |
| size-80    | width: 20rem; height: 20rem;             |
| size-96    | width: 24rem; height: 24rem;             |
| size-auto  | width: auto; height: auto;               |
| size-1/2   | width: 50%; height: 50%;                 |
| size-1/3   | width: 33.333333%; height: 33.333333%;   |
| size-2/3   | width: 66.666667%; height: 66.666667%;   |
| size-1/4   | width: 25%; height: 25%;                 |
| size-2/4   | width: 50%; height: 50%;                 |
| size-3/4   | width: 75%; height: 75%;                 |
| size-1/5   | width: 20%; height: 20%;                 |
| size-2/5   | width: 40%; height: 40%;                 |
| size-3/5   | width: 60%; height: 60%;                 |
| size-4/5   | width: 80%; height: 80%;                 |
| size-1/6   | width: 16.666667%; height: 16.666667%;   |
| size-2/6   | width: 33.333333%; height: 33.333333%;   |
| size-3/6   | width: 50%; height: 50%;                 |
| size-4/6   | width: 66.666667%; height: 66.666667%;   |
| size-5/6   | width: 83.333333%; height: 83.333333%;   |
| size-1/12  | width: 8.333333%; height: 8.333333%;     |
| size-2/12  | width: 16.666667%; height: 16.666667%;   |
| size-3/12  | width: 25%; height: 25%;                 |
| size-4/12  | width: 33.333333%; height: 33.333333%;   |
| size-5/12  | width: 41.666667%; height: 41.666667%;   |
| size-6/12  | width: 50%; height: 50%;                 |
| size-7/12  | width: 58.333333%; height: 58.333333%;   |
| size-8/12  | width: 66.666667%; height: 66.666667%;   |
| size-9/12  | width: 75%; height: 75%;                 |
| size-10/12 | width: 83.333333%; height: 83.333333%;   |
| size-11/12 | width: 91.666667%; height: 91.666667%;   |
| size-full  | width: 100%; height: 100%;               |
| size-min   | width: min-content; height: min-content; |
| size-max   | width: max-content; height: max-content; |
| size-fit   | width: fit-content; height: fit-content; |

### 百分比大小

使用 size-full 将元素的宽度和高度设置为父容器宽度和高度的 100%。

```html
<div class="h-56 p-2 ...">
  <div class="size-full ...">size-full</div>
</div>
```

### 重置尺寸

如果您需要在特定条件下（例如在特定断点处）删除元素指定的宽度和高度，则 size-auto 实用程序会很有用：

```html
<div class="size-full md:size-auto">
  <!-- ... -->
</div>
```

### 悬停、焦点和其他状态

Tailwind 允许您使用变体修饰符有条件地在不同状态下应用实用程序类。例如，使用 hover:size-full 仅在悬停时应用 size-full 实用程序。

```html
<div class="size-48 hover:size-full">
  <!-- ... -->
</div>
```

### 断点和媒体查询

您还可以使用变体修饰符来定位媒体查询，例如响应断点、深色模式、首选减少运动等。例如，使用 md:size-full 仅在中等屏幕尺寸及以上屏幕尺寸上应用 size-full 实用程序。

```html
<div class="size-48 md:size-full">
  <!-- ... -->
</div>
```
