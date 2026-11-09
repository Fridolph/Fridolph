# 大屏适配方案

## 主流方案

1. vw vh

按照设计稿的尺寸，将 px 按比例计算转为 vw 和 vh

优点：

- 可以动态计算图表的宽高，字体等，灵活性较高
- 当屏幕比例跟 ui 稿不一致时，不会出现两边留白情况

缺点：

每个图表都需要单独做字体、间距、位移的适配，比较麻烦

2. scale

通过 scale 属性，根据屏幕大小，对图表进行整体的等比缩放

优点：

代码量少，适配简单 2.一次处理后不需要在各个图表中再去单独适配

缺点：

- 因为是根据 ui 稿等比缩放，当大屏跟 ui 稿的比例不一样时，会出现周边留白情况
- 当缩放比例过大时候，字体会有一点点模糊，就一点点
- 当缩放比例过大时候，事件热区会偏移。

3. rem + vw vh

首先获得 rem 的基准值；然后动态的计算 html 根元素的 font-size；最后图表中通过 vw vh 动态计算字体、间距、位移等

优点：

布局的自适应代码量少，适配简单

缺点：

- 因为是根据 ui 稿等比缩放，当大屏跟 ui 稿的比例不一样时，会出现周边留白情况
- 图表需要单个做字体、间距、位移的适配

## 方案 1 vw vh

### 实现思路

假设设计稿尺寸为 1920\*1080（做之前一定问清楚 ui 设计稿的尺寸）

即：
网页宽度=1920px
网页高度=1080px

我们都知道
网页宽度=100vw
网页宽度=100vh

所以，在 1920px\*1080px 的屏幕分辨率下

1920px = 100vw

1080px = 100vh

这样一来，以一个宽 300px 和 200px 的 div 来说，其所占的宽高，以 vw 和 vh 为单位，计算方式如下:

vwDiv = (300px / 1920px ) _ 100vw
vhDiv = (200px / 1080px ) _ 100vh

所以，就在 1920\*1080 的屏幕分辨率下，计算出了单个 div 的宽高

当屏幕放大或者缩小时，div 还是以 vw 和 vh 作为宽高的，就会自动适应不同分辨率的屏幕

### scss

```css [util.scss]
// 使用 scss 的 math 函数，https://sass-lang.com/documentation/breaking-changes/slash-div
@use 'sass:math';

// 默认设计稿的宽度
$designWidth: 1920;
// 默认设计稿的高度
$designHeight: 1080;

// px 转为 vw 的函数
@function vw($px) {
  @return math.div($px, $designWidth) * 100vw;
}

// px 转为 vh 的函数
@function vh($px) {
  @return math.div($px, $designHeight) * 100vh;
}
```

路径配置：只需在 vue.config.js (vite.config.js) 加上对该文件的引用，具体参考文档

在 vue 中使用效果：

```vue
<template>
  <div class="box"></div>
</template>

<script>
export default {
  name: 'Box',
}
</script>

<style lang="scss" scoped="scoped">
/* 
 直接使用 vw 和 vh 函数，将像素值传进去，得到的就是具体的 vw vh 单位		 
 */
.box {
  width: vw(300);
  height: vh(100);
  font-size: vh(16);
  background-color: black;
  margin-left: vw(10);
  margin-top: vh(10);
  border: vh(2) solid red;
}
</style>
```

### less

less 差不多

```css [util.less]
// 默认设计稿的宽度
@designWidth: 1920;

// 默认设计稿的高度
@designHeight: 1080;

.px2vw(@name, @px) {
  @{name}: (@px / @designWidth) * 100vw;
}

.px2vh(@name, @px) {
  @{name}: (@px / @designHeight) * 100vh;
}

.px2font(@px) {
  font-size: (@px / @designWidth) * 100vw;
}
```

```vue
<template>
  <div class="box"></div>
</template>

<script>
export default {
  name: 'Box',
}
</script>

<style lang="less" scoped="scoped">
/* 
 直接使用 vw 和 vh 函数，将像素值传进去，得到的就是具体的 vw vh单位		 
 */
.box {
  .px2vw(width, 300);
  .px2vh(height, 100);
  .px2font(16);
  .px2vw(margin-left, 300);
  .px2vh(margin-top, 100);
  background-color: black;
}
</style>
```

### 定义 js 样式处理函数

```js
// 定义设计稿的宽高
const designWidth = 1920
const designHeight = 1080

export const px2vw = _px => {
  return (_px * 100.0) / designWidth + 'vw'
}

export const px2vh = _px => {
  return (_px * 100.0) / designHeight + 'vh'
}

export const px2font = _px => {
  return (_px * 100.0) / designWidth + 'vw'
}
```

### 屏幕变化后，图表自动调整

这种使用方式有个弊端，就是屏幕尺寸发生变化后，需要手动刷新一下才能完成自适应调整
为了解决这个问题，你需要在各个图表中监听页面尺寸变化，重新调整图表，在 vue 项目中，也可以借助 element-resize-detector，最好封装个 resize 的指令，在各图表中就只要使用该指令就可以了，毕竟作为程序员，能偷懒就偷懒

安装 element-resize-detector

`npm install element-resize-detector --save`

引入工具包在组件中使用或者在单独的 js 中使用

`import resizeDetector from 'element-resize-detector'`

封装 directive

```js
// directive.js
import * as ECharts from 'echarts'
import elementResizeDetectorMaker from 'element-resize-detector'
import Vue from 'vue'
const HANDLER = '_vue_resize_handler'
function bind(el, binding) {
  el[HANDLER] = binding.value
    ? binding.value
    : () => {
        let chart = ECharts.getInstanceByDom(el)
        if (!chart) {
          return
        }
        chart.resize()
      }
  // 监听绑定的div大小变化，更新 echarts 大小
  elementResizeDetectorMaker().listenTo(el, el[HANDLER])
}
function unbind(el) {
  // window.removeEventListener("resize", el[HANDLER]);
  elementResizeDetectorMaker().removeListener(el, el[HANDLER])
  delete el[HANDLER]
}
// 自定义指令：v-chart-resize 示例：v-chart-resize="fn"
Vue.directive('chart-resize', { bind, unbind })
```

### 图表字体、间距、位移等尺寸自适应

echarts 的字体大小只支持具体数值（像素），不能用百分比或者 vw 等尺寸，一般字体不会去做自适应，当宽高比跟 ui 稿比例出入太大时，会出现文字跟图表重叠的情况

这里我们就需要封装一个工具函数，来处理图表中文字自适应了 👇

默认情况下，这里以你的设计稿是 1920\*1080 为例，即网页宽度是 1920px （做之前一定问清楚 ui 设计稿的尺寸）

把这个函数写在一个单独的工具文件 dataUtil.js 里面，在需要的时候调用

其原理是计算出当前屏幕宽度和默认设计宽度的比值，将原始的尺寸乘以该值

另外，其它 echarts 的配置项，比如间距、定位、边距也可以用该函数

1. 编写 dataUtil.js 工具函数

```js
// Echarts图表字体、间距自适应
export const fitChartSize = (size, defalteWidth = 1920) => {
  let clientWidth =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  if (!clientWidth) return size
  let scale = clientWidth / defalteWidth
  return Number((size * scale).toFixed(3))
}
```

2. 将函数挂载到原型上

```js
import { fitChartSize } from '@src/utils/dataUtil.js'
Vue.prototype.fitChartFont = fitChartSize

// vue3可以在config上挂载
app.config.globalProperties.$fitChartFont = fitChartFont
```

## 参考

[一次搞懂数据大屏适配方案 (vw vh、rem、scale)](https://juejin.cn/post/7163932925955112996?searchId=202408201407088165FF820D4BD08CC1A4)
