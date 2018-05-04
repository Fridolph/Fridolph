# 知识点梳理

* 选择器的权重和优先级
* 盒模型
* 盒子大小计算
* margin 的重叠计算
* 浮动float
* 浮动布局概念
* 清理浮动
* 定位position
* 文档流概念
* 定位分类
* fixed 定位特点
* 绝对定位计算方式
* flex布局
* 如何实现居中对齐？
* 理解语义化
* CSS3 动画
* 重绘和回流

---

## css选择器权重和优先级

1. 内联样式 1000
2. ID选择器 100
3. 类、伪类、属性选择器 10
4. 元素和伪元素选择器 1

> 注意：通用选择器*、子选择器>、相邻选择器+不在这四等级中，它们的权重为0。

权重越大优先级越高，相同权重优先级遵循后定义覆盖先定义

## 盒模型

CSS盒子 = 内容 + border + padding + margin

纵向margin折叠

### 浮动

其涉及初衷是用于图片的文字环绕效果的。

特点：

1. 被设置float的元素会脱离文档流
2. float具有包裹性
3. 清除空格

> 手写清除浮动

```css
.clearfix::after {
  content: '';
  display: table;
  clear: both;
}
```

### 定位

### flex

> 实现水平居中

> 实现垂直居中

## 理解语义化

> 如何理解HTML语义化

所谓语义就是为了更易读懂：

* 让人更易读懂 - 读代码、写代码
* 让机器更易读懂 - 浏览器、搜索引擎

## CSS3动画

定义 `@keyframes`

* animation-name对应到动画名称，animation-duration是动画时长
* animation-timing-function：规定动画的速度曲线。默认是ease
* animation-delay：规定动画何时开始。默认是 0
* animation-iteration-count：规定动画被播放的次数。默认是 1
* animation-direction：规定动画是否在下一周期逆向地播放。默认是normal
* animation-play-state ：规定动画是否正在运行或暂停。默认是running
* animation-fill-mode：规定动画执行之前和之后如何给动画的目标应用，默认是none，保留在最后一帧可以用forwards

> CSS的transition和animation有何区别

首先transition和animation都可以做动效，从语义上讲，transition指过渡，由一个状态过渡到另一个状态；而animation是动画。

## 回流和重绘

* 重绘 指当页面元素不脱离文档流，而简单地进行样式变化，比如修改颜色、北京等，浏览器重新绘制样式

* 回流：指处于文档流中的DOM尺寸大小、位置或者某些属性发生变化时，导致浏览器重新渲染部分或全部文档

相比下，回流要比重绘消耗性能开支更大。
