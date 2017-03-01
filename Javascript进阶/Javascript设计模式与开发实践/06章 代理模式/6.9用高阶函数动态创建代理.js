/**
 * 通过传入高阶函数这种更加灵活的方式，可以为各种计算方法创建缓存代理。
 * 这些计算方法被当作参数传入一个专门用于创建缓存代理的工厂中，这样一来，
 * 我们就可以为乘法、加法、减法等创建缓存代理，代码如下：
 */

// 计算乘积
var mult = function() {
  var a = 1;
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i];
  }
  return a;
}

// 计算加和
var plus = function() {
  var a = 0;
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a + arguments[i];
  }
  return a;
}

// 创建缓存代理的工厂
var createProxyFactory = function(fn) {
  var cache = {};
  return function() {
    var args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      return cache[args];
    }
    return cache[args] = fn.apply(this, arguments);
  }
}

var proxyMult = createProxyFactory(mult),
    proxyPlus = createProxyFactory(plus);

console.log(proxyMult(1,2,3,4));
console.log(proxyMult(1,2,3,4,5));
console.log(proxyMult(1,2,3,4));
console.log(proxyPlus(1,2,3));
console.log(proxyPlus(1,2,3,4));
console.log(proxyPlus(1,2,3));