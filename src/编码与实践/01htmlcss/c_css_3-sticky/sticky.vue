<template>
  <div class="sticky-wrapper">
    <h2>css 新特性 —— sticky</h2>
    <p>
      对于设置了 position: sticky
      的元素来说，本文我暂且描述成“粘性定位元素”，要满足以下条件才会产生所谓的“粘性”：
    </p>
    <div class="sticky-top">当你到达我的滚动位置时我会粘在屏幕上</div>
    <ul>
      <li>一定要设置方位属性（top/left/bottom/right）</li>
      <li>粘性定位元素（不含 margin）与其最近的一个祖先 scrolling box（含 border,padding）的距离，小于等于设定的方位属性阈值。如果没有拥有 scrolling box 的话会根据 viewport 来计算</li>
      <li>怎么判断是否达到阈值，是根据这个做判断的 scrolling box 的滚动事件确定的，言外之意即，该 scrolling box 一定可滚动（在你设定的方向属性的方向上，如你要垂直滚动时固定，就垂直方向一定要可滚动），只有滚动了监听到了才会生效（`意味着如果设置了 overflow: hidden 是不起效的`），而且，不会受到其他祖先 scrolling box 的滚动影响。</li>
      <li>父元素可视区域能容纳下粘性定位元素。一般发生在父元素不是滚动容器时。这点具体下面会说明一个情况。</li>
      <p>我们汇总以及简化下上面条件的描述：</p>
      <p>粘性定位元素要位于一个可滚动容器里，且一定要设置方向属性，该值用作与最近的一个祖先 scrolling box 的距离做比较，小于等于时生效。但是其父元素在滚动的影响下，如果可视区域容纳不下该粘性定位元素时，则粘性同样会消失。</p>
      <h2>传统实现</h2>     
      <ul>
        <li>主要是让 body 成为滚动容器，即滚动条所属的元素。</li>
        <li>left-section 和 right-section 各占页面的左右两边</li>
        <li>导航栏.nav-bar 被一个父元素 nav-bar-wrap 包裹，目的是占位！当导航栏.nav-bar 吸顶后，设置了 position: fixed，脱离了文档流，如果没有这个父元素占位，页面的内容就会往上填补这个空缺，且，吸顶效果的瞬间页面很不流畅！</li>
        <li>.right-section 设置了 position 了，成为了导航内容和导航栏的 offsetParent 了，并不是滚动容器 body 了，这个是要注意的，且 body 设置了 padding-top: 24px 了。</li>
      </ul>
      <div class="sticky-bottom">没滚动到位置时也会展示</div>
      <h2>二者结合</h2>
      <p>
        二者结合的意思是，根据浏览器是否支持sticky，来判断使用css方式的吸顶效果，还是js控制吸顶。
      </p>
      <p>不过说句实话，除非你明确知道你开发的页面是应用在哪个浏览器上（或者有这个需求），这样的话你在开发时就只写合适的那段代码就好了。</p>
      <p>但是如果你自己也不确定是应用在什么浏览器上，或者说本来是要适应大部分浏览器的话，二者结合的方案并不会省去写代码的功夫，就是说两个实现方式都要写，还要写判断，实际用哪个方式。这样做意义仅仅是，能使用css的就用css尽量减少dom操作，是性能上的优化。如果你没有这个追求的话，其实完全可以写传统的。</p>      
    </ul>
  </div>
</template>

<style scoped>
.sticky-wrapper {
  padding: 20px;
  background-color: #fff;
  height: 300px;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
  border: 1px dashed #dde;
}
.sticky-top {
  position: sticky;
  top: 0px;
  z-index: 10;
  background-color: pink;
  padding: 10px;
  font-size: 20px;
  opacity: 0.8;
}
.sticky-bottom {
  position: sticky;
  bottom: -20px;
  z-index: 10;
  background-color: yellowgreen;
  padding: 10px;
  font-size: 20px;
  opacity: 0.8;
}
</style>
