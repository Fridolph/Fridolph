1. CSS样式选择器的优先级
计算权重确定
!important
内联样式
后写的优先级高

2. 雪碧图的作用
减少HTTP请求数 提高加载性能
有一些情况下可以减少图片大小

3. 自定义字体的使用场景
宣传/品牌/banner等固定文案
字体图标

4. base64的使用
用于减少HTTP请求
使用于小图片
体积为原图的4/3

5. 伪元素和伪类的区别
伪类表状态
伪类是真的有元素
前者单冒号，后者双冒号

6. 美化checkbox
label[for] 和id
隐藏原生input
:checked + label

---

1. position: absolute / fixed 有什么区别
前者相对最近的absolute / relative 定位
后者相对于屏幕 viewport 定位

2. display: inline-block 间隙
字符间距
消灭字符或消灭间距

3. 清除浮动
```css
.clear::after {
  content: '';
  display: table;
  clear: both;
}
```
让盒子负责自己的布局
overflow: hidden

4. 适配移动端
viewport
rem viewport media query
设计上 隐藏 折行 自适应

---

1. 用一个div画xxx
box-shadow 无限投影
::before
::after

2. 如何产生不占空间的边框
box-shaodw
outline

3. CSS3动画怎么写？
定义keyframes
animation: animation-name duration timing-function delay iteration-count direcetion; 
animation默认: 动画名 持续时间 次数;

4. CSS动画的实现方式
transition
keyframes animation

5. 过渡动画和关键帧动画的区别
过渡动画需要有状态变化
关键帧动画不需要变化
关键帧动画能精细控制
