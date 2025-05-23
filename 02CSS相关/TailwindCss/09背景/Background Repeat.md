# background-repeat

background-repeat CSS 属性定义背景图像的重复方式。背景图像可以沿着水平轴，垂直轴，两个轴重复，或者根本不重复。

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-repeat>

默认情况下，重复的图像被剪裁为元素的大小，但它们可以缩放 (使用 round) 或者均匀地分布 (使用 space).

## 语法

## 值

单值语法是完整的双值语法的简写：

| 单值      | 等价于双值          |
| --------- | ------------------- |
| repeat-x  | repeat no-repeat    |
| repeat-y  | no-repeat repeat    |
| repeat    | repeat repeat       |
| space     | space space         |
| round     | round round         |
| no-repeat | no-repeat no-repeat |

在双值语法中，第一个值表示水平重复行为，第二个值表示垂直重复行为。下面是关于每一个值是怎么工作的具体说明：

| 值 | 描述 |
| --- | --- |
| repeat | 图像会按需重复来覆盖整个背景图片所在的区域。最后一个图像会被裁剪，如果它的大小不合适的话。 |
| space | 图像会尽可能得重复，但是不会裁剪。第一个和最后一个图像会被固定在元素 (element) 的相应的边上，同时空白会均匀地分布在图像之间。background-position 属性会被忽视，除非只有一个图像能被无裁剪地显示。只在一种情况下裁剪会发生，那就是图像太大了以至于没有足够的空间来完整显示一个图像。 |
| round | 随着允许的空间在尺寸上的增长，被重复的图像将会伸展 (没有空隙), 直到有足够的空间来添加一个图像。当下一个图像被添加后，所有的当前的图像会被压缩来腾出空间。例如，一个图像原始大小是 260px, 重复三次之后，可能会被伸展到 300px, 直到另一个图像被加进来。这样他们就可能被压缩到 225px.译者注：关键是浏览器怎么计算什么时候应该添加一个图像进来，而不是继续伸展。 |
| no-repeat 图像不会被重复 (因为背景图像所在的区域将可能没有完全被覆盖). 那个没有被重复的背景图像的位置是由 background-position 属性来决定。 |

# Background Repeat

<https://www.tailwindcss.cn/docs/background-repeat>

## 用法

| Class           | Properties                    |
| --------------- | ----------------------------- |
| bg-repeat       | background-repeat: repeat;    |
| bg-no-repeat    | background-repeat: no-repeat; |
| bg-repeat-x     | background-repeat: repeat-x;  |
| bg-repeat-y     | background-repeat: repeat-y;  |
| bg-repeat-round | background-repeat: round;     |
| bg-repeat-space | background-repeat: space;     |
