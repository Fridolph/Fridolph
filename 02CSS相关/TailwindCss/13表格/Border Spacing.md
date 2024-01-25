# border-spacing

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-spacing>

border-spacing 属性指定相邻单元格边框之间的距离（只适用于 边框分离模式 ）。相当于 HTML 中的 cellspacing 属性，但是第二个可选的值可以用来设置不同于水平间距的垂直间距。

border-spacing 值也适用于表格的外层边框上，即表格的边框和第一行的、第一列的、最后一行的、最后一列的单元格之间的间距是由表格相应的（水平的或垂直的）边框间距（border-spacing）和相应的（上，右，下或左）内边距之和。

## 语法

- length 描述单元格之间的水平和垂直距离的一个 `<length>` 值。它只在单值语法下使用。

- horizontal 描述相邻两列的单元格之间的水平距离的一个 `<length>` 值。它只在双值语法下使用。

- vertical 描述相邻两行的单元格之间的垂直距离的一个 `<length>` 值。它只在双值语法下使用。

- inherit 一个表示父元素的 border-spacing 的计算值的关键字，其父元素必须应用了 border-spacing 。

# Border Spacing

## 用法

| Class                | Properties                                           |
| -------------------- | ---------------------------------------------------- |
| border-spacing-0     | border-spacing: 0px 0px;                             |
| border-spacing-x-0   | border-spacing: 0px var(--tw-border-spacing-y);      |
| border-spacing-y-0   | border-spacing: var(--tw-border-spacing-x) 0px;      |
| border-spacing-px    | border-spacing: 1px 1px;                             |
| border-spacing-x-px  | border-spacing: 1px var(--tw-border-spacing-y);      |
| border-spacing-y-px  | border-spacing: var(--tw-border-spacing-x) 1px;      |
| border-spacing-0.5   | border-spacing: 0.125rem 0.125rem;                   |
| border-spacing-x-0.5 | border-spacing: 0.125rem var(--tw-border-spacing-y); |
| border-spacing-y-0.5 | border-spacing: var(--tw-border-spacing-x) 0.125rem; |
| border-spacing-1     | border-spacing: 0.25rem 0.25rem;                     |
| border-spacing-x-1   | border-spacing: 0.25rem var(--tw-border-spacing-y);  |
| border-spacing-y-1   | border-spacing: var(--tw-border-spacing-x) 0.25rem;  |
| border-spacing-1.5   | border-spacing: 0.375rem 0.375rem;                   |
| border-spacing-x-1.5 | border-spacing: 0.375rem var(--tw-border-spacing-y); |
| border-spacing-y-1.5 | border-spacing: var(--tw-border-spacing-x) 0.375rem; |
| border-spacing-2     | border-spacing: 0.5rem 0.5rem;                       |
| border-spacing-x-2   | border-spacing: 0.5rem var(--tw-border-spacing-y);   |
| border-spacing-y-2   | border-spacing: var(--tw-border-spacing-x) 0.5rem;   |
| border-spacing-2.5   | border-spacing: 0.625rem 0.625rem;                   |
| border-spacing-x-2.5 | border-spacing: 0.625rem var(--tw-border-spacing-y); |
| border-spacing-y-2.5 | border-spacing: var(--tw-border-spacing-x) 0.625rem; |
| border-spacing-3     | border-spacing: 0.75rem 0.75rem;                     |
| border-spacing-x-3   | border-spacing: 0.75rem var(--tw-border-spacing-y);  |
| border-spacing-y-3   | border-spacing: var(--tw-border-spacing-x) 0.75rem;  |
| border-spacing-3.5   | border-spacing: 0.875rem 0.875rem;                   |
| border-spacing-x-3.5 | border-spacing: 0.875rem var(--tw-border-spacing-y); |
| border-spacing-y-3.5 | border-spacing: var(--tw-border-spacing-x) 0.875rem; |
| border-spacing-4     | border-spacing: 1rem 1rem;                           |
| border-spacing-x-4   | border-spacing: 1rem var(--tw-border-spacing-y);     |
| border-spacing-y-4   | border-spacing: var(--tw-border-spacing-x) 1rem;     |
| border-spacing-5     | border-spacing: 1.25rem 1.25rem;                     |
| border-spacing-x-5   | border-spacing: 1.25rem var(--tw-border-spacing-y);  |
| border-spacing-y-5   | border-spacing: var(--tw-border-spacing-x) 1.25rem;  |
| border-spacing-6     | border-spacing: 1.5rem 1.5rem;                       |
| border-spacing-x-6   | border-spacing: 1.5rem var(--tw-border-spacing-y);   |
| border-spacing-y-6   | border-spacing: var(--tw-border-spacing-x) 1.5rem;   |
| border-spacing-7     | border-spacing: 1.75rem 1.75rem;                     |
| border-spacing-x-7   | border-spacing: 1.75rem var(--tw-border-spacing-y);  |
| border-spacing-y-7   | border-spacing: var(--tw-border-spacing-x) 1.75rem;  |
| border-spacing-8     | border-spacing: 2rem 2rem;                           |
| border-spacing-x-8   | border-spacing: 2rem var(--tw-border-spacing-y);     |
| border-spacing-y-8   | border-spacing: var(--tw-border-spacing-x) 2rem;     |
| border-spacing-9     | border-spacing: 2.25rem 2.25rem;                     |
| border-spacing-x-9   | border-spacing: 2.25rem var(--tw-border-spacing-y);  |
| border-spacing-y-9   | border-spacing: var(--tw-border-spacing-x) 2.25rem;  |
| border-spacing-10    | border-spacing: 2.5rem 2.5rem;                       |
| border-spacing-x-10  | border-spacing: 2.5rem var(--tw-border-spacing-y);   |
| border-spacing-y-10  | border-spacing: var(--tw-border-spacing-x) 2.5rem;   |
| border-spacing-11    | border-spacing: 2.75rem 2.75rem;                     |
| border-spacing-x-11  | border-spacing: 2.75rem var(--tw-border-spacing-y);  |
| border-spacing-y-11  | border-spacing: var(--tw-border-spacing-x) 2.75rem;  |
| border-spacing-12    | border-spacing: 3rem 3rem;                           |
| border-spacing-x-12  | border-spacing: 3rem var(--tw-border-spacing-y);     |
| border-spacing-y-12  | border-spacing: var(--tw-border-spacing-x) 3rem;     |
| border-spacing-14    | border-spacing: 3.5rem 3.5rem;                       |
| border-spacing-x-14  | border-spacing: 3.5rem var(--tw-border-spacing-y);   |
| border-spacing-y-14  | border-spacing: var(--tw-border-spacing-x) 3.5rem;   |
| border-spacing-16    | border-spacing: 4rem 4rem;                           |
| border-spacing-x-16  | border-spacing: 4rem var(--tw-border-spacing-y);     |
| border-spacing-y-16  | border-spacing: var(--tw-border-spacing-x) 4rem;     |
| border-spacing-20    | border-spacing: 5rem 5rem;                           |
| border-spacing-x-20  | border-spacing: 5rem var(--tw-border-spacing-y);     |
| border-spacing-y-20  | border-spacing: var(--tw-border-spacing-x) 5rem;     |
| border-spacing-24    | border-spacing: 6rem 6rem;                           |
| border-spacing-x-24  | border-spacing: 6rem var(--tw-border-spacing-y);     |
| border-spacing-y-24  | border-spacing: var(--tw-border-spacing-x) 6rem;     |
| border-spacing-28    | border-spacing: 7rem 7rem;                           |
| border-spacing-x-28  | border-spacing: 7rem var(--tw-border-spacing-y);     |
| border-spacing-y-28  | border-spacing: var(--tw-border-spacing-x) 7rem;     |
| border-spacing-32    | border-spacing: 8rem 8rem;                           |
| border-spacing-x-32  | border-spacing: 8rem var(--tw-border-spacing-y);     |
| border-spacing-y-32  | border-spacing: var(--tw-border-spacing-x) 8rem;     |
| border-spacing-36    | border-spacing: 9rem 9rem;                           |
| border-spacing-x-36  | border-spacing: 9rem var(--tw-border-spacing-y);     |
| border-spacing-y-36  | border-spacing: var(--tw-border-spacing-x) 9rem;     |
| border-spacing-40    | border-spacing: 10rem 10rem;                         |
| border-spacing-x-40  | border-spacing: 10rem var(--tw-border-spacing-y);    |
| border-spacing-y-40  | border-spacing: var(--tw-border-spacing-x) 10rem;    |
| border-spacing-44    | border-spacing: 11rem 11rem;                         |
| border-spacing-x-44  | border-spacing: 11rem var(--tw-border-spacing-y);    |
| border-spacing-y-44  | border-spacing: var(--tw-border-spacing-x) 11rem;    |
| border-spacing-48    | border-spacing: 12rem 12rem;                         |
| border-spacing-x-48  | border-spacing: 12rem var(--tw-border-spacing-y);    |
| border-spacing-y-48  | border-spacing: var(--tw-border-spacing-x) 12rem;    |
| border-spacing-52    | border-spacing: 13rem 13rem;                         |
| border-spacing-x-52  | border-spacing: 13rem var(--tw-border-spacing-y);    |
| border-spacing-y-52  | border-spacing: var(--tw-border-spacing-x) 13rem;    |
| border-spacing-56    | border-spacing: 14rem 14rem;                         |
| border-spacing-x-56  | border-spacing: 14rem var(--tw-border-spacing-y);    |
| border-spacing-y-56  | border-spacing: var(--tw-border-spacing-x) 14rem;    |
| border-spacing-60    | border-spacing: 15rem 15rem;                         |
| border-spacing-x-60  | border-spacing: 15rem var(--tw-border-spacing-y);    |
| border-spacing-y-60  | border-spacing: var(--tw-border-spacing-x) 15rem;    |
| border-spacing-64    | border-spacing: 16rem 16rem;                         |
| border-spacing-x-64  | border-spacing: 16rem var(--tw-border-spacing-y);    |
| border-spacing-y-64  | border-spacing: var(--tw-border-spacing-x) 16rem;    |
| border-spacing-72    | border-spacing: 18rem 18rem;                         |
| border-spacing-x-72  | border-spacing: 18rem var(--tw-border-spacing-y);    |
| border-spacing-y-72  | border-spacing: var(--tw-border-spacing-x) 18rem;    |
| border-spacing-80    | border-spacing: 20rem 20rem;                         |
| border-spacing-x-80  | border-spacing: 20rem var(--tw-border-spacing-y);    |
| border-spacing-y-80  | border-spacing: var(--tw-border-spacing-x) 20rem;    |
| border-spacing-96    | border-spacing: 24rem 24rem;                         |
| border-spacing-x-96  | border-spacing: 24rem var(--tw-border-spacing-y);    |
| border-spacing-y-96  | border-spacing: var(--tw-border-spacing-x) 24rem;    |
