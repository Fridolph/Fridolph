/**
 * 先创建一个用于求乘积的函数：
 */
var mult = function() {
  var a = 1;
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i];
  }
  // console.log('计算结果', a);
  return a;
}

// mult(2, 3);
// mult(2, 3, 4);

/**
 * 现在加入缓存代理函数：
 */
var proxyMult = (function() {
  var cache = [];
  
  return function() {
    var args = Array.prototype.join.call(arguments, ',');

    if (args in cache) {
      return cache[args];
    }
    cache[args] = mult.apply(this, arguments);
    console.log('计算结果', cache[args]);
    return cache[args];
  }
})();

proxyMult(1,2,3,4);
proxyMult(1,2,3,4);
proxyMult(1,2,3,4,5);

/**
 * 当我们第二次调用proxyMult(1,2,3,4)时，本体mult函数并没有被计算，
 * proxyMult直接返回了之前缓存好的计算结果
 *
 * 通过增加缓存代理的方式, mult函数可以继续专注于自身的职责——计算乘积，缓存的功能是由代理对象实现的
 */



/**
 * 缓存代理 用于Ajax异步请求数据
 *
 * 我们常在项目中遇到分页的需求，同一页的数据理论上只需要后台去拉取一次，
 * 这些已经拉取到的数据在某个地方被缓存之后，下次再请求同一页时，便可直接使用之前的数据。
 *
 * 显然这里也可以引入缓存代理，实现方式跟计算乘积的例子差不多，不同的是，请求数据是异步操作，
 * 我们无法直接把计算结果放到代理对象的缓存中， 而是要通过回调的方式
 */