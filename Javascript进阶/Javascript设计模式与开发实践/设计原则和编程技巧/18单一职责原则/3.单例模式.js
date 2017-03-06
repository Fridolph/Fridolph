// 惰性单例:
var createLoginLayer = (function() {
  var div;
  return function() {
    if (div) {
      div = document.createElement('div');
      div.innerHTML = '我是登录浮窗';
      div.style.display = 'none';
      document.body.appendChild(div);
    }
    return div;
  }
});

/**
 * 现在我们把管理单例的职责和创建登录浮窗的职责分别封装在两个方法里，这两个方法可以独立变化而互不影响
 * 当它们连接在一起的时候，就完成了创建唯一登录浮窗的功能，代码如下：
 */
var getSingle = function(fn) { // 获取单例
  var result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  }
};

var getSingle = function(fn) { // 获取单例
  var result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  }
};

var createSingleLoginLayer = getSingle(createLoginLayer);

var loginLayer1 = createSingleLoginLayer();
var loginLayer2 = createSingleLoginLayer();

console.log(loginLayer1 === loginLayer2);  // true