# align-content

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-content>

CSS 的 align-content 属性设置了浏览器如何沿着弹性盒子布局的纵轴和网格布局的主轴在内容项之间和周围分配空间。

## 语法

```css
/* 基本位置对齐 */
/*align-content 不采用左右值 */
align-content: center; /* 将项目放置在中点 */
align-content: start; /* 最先放置项目 */
align-content: end; /* 最后放置项目 */
align-content: flex-start; /* 从起始点开始放置 flex 元素 */
align-content: flex-end; /* 从终止点开始放置 flex 元素 */

/* 默认对齐 */
align-content: normal;

/*基线对齐*/
align-content: baseline;
align-content: first baseline;
align-content: last baseline;

/* 分布式对齐 */
align-content: space-between; /* 均匀分布项目
                                 第一项与起始点齐平，
                                 最后一项与终止点齐平 */
align-content: space-around; /* 均匀分布项目
                                 项目在两端有一半大小的空间*/
align-content: space-evenly; /* 均匀分布项目
                                 项目周围有相等的空间 */
align-content: stretch; /* 均匀分布项目
                                 拉伸‘自动’ - 大小的项目以充满容器 */

/* 溢出对齐 */
align-content: safe center;
align-content: unsafe center;

/* 全局属性 */
align-content: inherit; /* 继承 */
align-content: initial; /* 初始值 */
align-content: unset; /* 未设置 */
```

## 用法

| Class            | Properties                    |
| ---------------- | ----------------------------- |
| content-normal   | align-content: normal;        |
| content-center   | align-content: center;        |
| content-start    | align-content: flex-start;    |
| content-end      | align-content: flex-end;      |
| content-between  | align-content: space-between; |
| content-around   | align-content: space-around;  |
| content-evenly   | align-content: space-evenly;  |
| content-baseline | align-content: baseline;      |
| content-stretch  | align-content: stretch;       |
