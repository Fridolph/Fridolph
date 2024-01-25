# background-position

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position>

background-position CSS 属性为每一个背景图片设置初始位置。这个位置是相对于由 background-origin 定义的位置图层的。

## 语法

### 一个值的语法： 值可能是：

- 关键字 center，用来居中背景图片。
- 关键字 top、left、bottom、right 中的一个。用来指定把这个项目（原文为 item）放在哪一个边界。另一个维度被设置成 50%，所以这个项目（原文为 item）被放在指定边界的中间位置。
- `<length>` 或 `<percentage>`。指定相对于左边界的 x 坐标，y 坐标被设置成 50%。

### 两个值的语法： 一个定义 x 坐标，另一个定义 y 坐标。每个值可以是：

- 关键字 top、left、bottom、right 中的一个。如果这里给出 left 或 right，那么这个值定义 x 轴位置，另一个值定义 y 轴位置。如果这里给出 top 或 bottom，那么这个值定义 y 轴位置，另一个值定义 x 轴位置。

- `<length>` 或 `<percentage>`。如果另一个值是 left 或 right，则该值定义相对于顶部边界的 Y。如果另一个值是 top 或 bottom，则该值定义相对于左边界的 X。如果两个值都是 `<length>` 或 `<percentage>` 值，则第一个定义 X，第二个定义 Y。

- 注意：如果一个值是 top 或 bottom，那么另一个值不可能是 top 或 bottom。如果一个值是 left 或 right，那么另一个值不可能是 left 或 right。也就是说，例如，top top 和 left right 是无效的。

- 排序：配对关键字时，位置并不重要，因为浏览器可以重新排序，写成 top left 或 left top 其产生的效果是相同的。使用 `<length>` 或 `<percentage>` 与关键字配对时顺序非常重要，定义 X 的值放在前面，然后是定义 Y 的值， right 20px 和 20px right 的效果是不相同的，前者有效但后者无效。left 20% 或 20% bottom 是有效的，因为 X 和 Y 值已明确定义且位置正确。

- 默认值是 left top 或者 0% 0%。

# Background Position

<https://www.tailwindcss.cn/docs/background-position>

## 用法

| Class           | Properties                         |
| --------------- | ---------------------------------- |
| bg-bottom       | background-position: bottom;       |
| bg-center       | background-position: center;       |
| bg-left         | background-position: left;         |
| bg-left-bottom  | background-position: left bottom;  |
| bg-left-top     | background-position: left top;     |
| bg-right        | background-position: right;        |
| bg-right-bottom | background-position: right bottom; |
| bg-right-top    | background-position: right top;    |
| bg-top          | background-position: top;          |

