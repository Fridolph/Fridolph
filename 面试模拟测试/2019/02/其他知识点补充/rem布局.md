## rem布局进阶版

代码原理

根据设备屏幕DPR device-pixel-ratio设备像素比，动态设置html的font-size，同时根据设备dpr调整页面的缩放值，进而达到高清的效果

> 绝不是每个地方都要用rem，rem只适用于固定尺寸！

```js
(function(doc, win) {
  const docEl = doc.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function() {
    let clientWidth = docEl.clientWidth
    if (!clientWidth) return
    if (clientWidth >= 640) {
      docEl.style.fontSize = '100px'
    } else {
      docEl.style.fontSize = 100 * (clientWidth / 640) + 'px'
    }
  }
  
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
```

rem布局的核心代码，大概意思是：

如果页面宽度超过了640px，页面html的font-size恒为100px，页面中html的font-size大小为 100 *(当前页面宽度/640)

1. 为什么是640px？

对于手机屏幕来说，640px的页面宽度是一个安全的最大宽度，保证了移动端页面两边不会留白。注意这里的px是css逻辑像素，与设备的物理像素是有区别的。如iPhone 5使用的是Retina视网膜屏幕，使用2px x 2px的 device pixel 代表 1px x 1px 的 css pixel，所以设备像素数为640 x 1136px，而它的CSS逻辑像素数为320 x 568px。
如果要切移动端页面，你可以先把效果图宽度等比例缩放到640px，很好用。

2. 为什么要设置html的font-size？

rem就是根元素（即：html）的字体大小。html中的所有标签样式凡是涉及到尺寸的（如： height,width,padding,margin,font-size。甚至，left,top等）你都可以放心大胆的用rem作单位。

如果我们一开始把html的font-size设为100px呢？此时1rem = 100px，那么上面的宽55px，高37px的元素样式就可以这么设置

    width: 0.55rem;
    height: 0.37rem;