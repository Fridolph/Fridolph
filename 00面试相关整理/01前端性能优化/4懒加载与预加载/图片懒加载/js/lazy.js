/**
 * 步骤一： 首先获取页面上需要懒加载的图片元素
 */

//首先规定所有懒加载的元素都必须拥有lazy-element这个样式类名称
var lazyElementClassName = 'lazy-img';

// 其次，需要加载的图片地址src值存放在另一个data-src属性中
// 当脚本确定该图片需要被加载时，将从data-src属性中
// 取得图片地址并赋值给src属性来完成加载
// 所以一个基本的懒加载标签应为：
// <img class="lazy-img" data-src="./demo.jpg" />

var srcAttrName = 'data-src';

// 通过getElementByClassName 方法去的页面上所有懒加载元素
// 请注意，通过getElementsByClassName获取的--
// DOM元素的数据类型为HTMLCollection
// 虽然类似于数组可以被遍历，但是该数据类型
// 不存在数组中用于操作元素的方法， 
// 因为我们希望当一个懒加载元素完成加载后
// 就不再进行检测，踢出队列中
// 所以使用 Array.prototype.slice.call 方法
// 将HTMLCollection转化为数据结构

var elements = Array.prototype.slice.call(
  document.getElementsByClassName(lazyElementClassName)
);

/**
 * 步骤二：检测元素是否在可视区域内
 * 注意，这里只检测元素的纵向位置是否在可视区域内
 * 可能出现元素纵向坐标在可视区域内，
 * 但横向仍然在屏幕之外，此时，仍然不可见
 * 但因为横向检测与纵向检测的原理一致，就不重复了
 */

// 检测元素是否在可视区域内
function checkElementIsInViewport(elem) {
  // IE8及以下并不支持window.innerHeight
  // 所以要通过其他方式取得视口大小
  var viewportHeight = window.innerHeight ||
                       document.documentElement.clientHeight ||
                       document.body.clientHeight;
  var elemPos = elem.getBoundingClientRect();

  if (elemPos.top && elemPos.top > 0 
                  && elemPos.top <= viewportHeight) {
    return true;
  }
  return false;
}

// 该函数用于获取页面元素距页面顶部
// （非浏览器顶部，非视口顶部）的距离
function getElemOffsetTop(el) {
  var top = el.offsetTop;

  // offsetParent兼容性好
  var parent = el.offsetParent;

  while (parent) {
    top += parent.offsetTop || 0;
    parent = parent.offsetParent;
  }
  return top;
}

function CheckElementIsInviewport(elem) {
  var viewportHeight = window.innerHeight ||
                       document.documentElement.clientHeight ||
                       document.body.clientHeight;

  // getBoundingClientRect返回距离文档左上角的上下左右值
  if (elem.getBoundingClientRect) {
    var elemPos = elem.getBoundingClientRect();

    if (elemPos && elemPos.top > 0
                && elemPos.top <= viewportHeight) {
      return true;
    }
    return false;
    //如果用户浏览器不支持getBoundingClientRect
  } else {
    var scrollY = window.pageYOffset ||
                  window.scrollY ||
                  document.documentElement.scrollTop ||
                  document.body.scrollTop;
    var offsetTop = getElemOffsetTop(elem);

    if(offsetTop > scrollY && offsetTop < scrollY + viewportHeight) {
      return true;
    }
    return false;
  }
}

// 加载图片
function loadElement(elem) {
  var srcURL = elem.getAttribute(srcAttrName);
  elem.src = srcURL;
}

// 调度函数
function checkAvailable(){
  for (var i=0; i<elements.length; i++) {
    var el = elements[i];

    // 一旦检测发现进入可视区域 
    if (checkElementIsInViewport(el)) {
      // 则加载图片
      loadElement(el);

      // 并将该元素提出队列
      elements.splice(i--, i);
    }
  }
}

// 绑定至滚动函数中

window.onscroll = function() {
  checkAvailable();
}
