/**
 * 单一职责原则（SRP）的职责被定义为“引起变化的原因”。
 * 如果我们有两个动机去改写一个方法，那么这个方法就具有两个职责。
 * 每个职责都是变化的一个轴线，如果一个方法承担了过多的职责，
 * 那么在需求的变迁过程中，需要改写这个方法的可能性就越大。
 *
 * SRP原则的体现为：一个对象（方法）只做一件事情
 */

// 1.代理模式
// 通过增加虚拟代理方式，把预加载图片的职责放到代理对象中，而本体仅负责往页面添加img标签，这也是它最原始的职责。
var myImage = (function() {
  var imgNode = document.createElement('div');
  document.body.appendChild(imgNode);
  
  return {
    setSrc: function(src) {
      imgNode.src = src;
    }
  }
})();
// proxyImage负责预加载图片，并在预加载完成之后把请求交给本体myImage
var proxyImage = (function() {
  var img = new Image;
  img.onload = function() {
    myImage.setSrc(this.src);
  }
  return {
    setSrc: function(src) {
      myImage.setSrc('占位图地址');
      img.src = src;
    }
  }
})();

proxyImage.setSrc('真实图地址');
/**
 * 把添加img标签的功能和预加载图片的职责分开放到两个对象中，这两个对象各自都只有一个被修改的动机。
 * 在它们各自发生改变的时候，也不会影响另外的对象。
 */