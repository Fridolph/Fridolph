除了利用对象的多态性之外，还可用下面方式来编写遵守开放封闭原则的代码：

## 放置挂钩 

hook 也是分离变化的一种方式。我们在程序有可能发生变化的地方防止一个挂钩，挂钩的返回结果决定了程序的下一步走向。这样一来，原本的代码执行路径上就出现了一个分叉路口，程序未来的执行方向被埋下多种可能性。 

## 使用回调函数

在JS中，函数可作为参数传递给另一个函数（高阶函数）。策略模式、命令模式等都可以用回调函数轻松实现。

回调函数是一种特殊的挂钩，我们可以把一部分易于变化的逻辑封装在回调函数里，然后把回调函数当作参数传入一个稳定和封闭的函数中，当回调被执行，程序就可因回调内部逻辑不同，而产生不同的结果。

比如，我们通过Ajax异步请求用户信息之后要做一些事情，请求用户信息的过程是不变的，而获取到用户信息之后要做什么事情，则是可变化的：

var getUserInfo = function(callback) {
  $.ajax('http://xxx.com/getUserInfo', callback);
};

getUserInfo(function(data) {
  console.log(data.userName);
});

getUserInfo(function(data) {
  console.log(data.userId);
});


-----------------------------------------------

另外一个例子是关于Array.prototype.map的 在不支持Array.prototype.map的浏览器中，我们可以简单模拟实现一个map函数

/**
 * arrayMap函数的作用是把一个数组“映射”为另一个数组，映射的步骤是不变的，而映射的规则是可变的，于是我们把这部分规则放在回调中，传入arrayMap函数：
 */

var arrayMap = function(arr, callback) {
  var ret = [],
      value;

  for (var i = 0, length = arr.length; i < length; i++) {
    value = callback(i, arr[i]);
    ret.push(value);
  }
}

var a = arrayMap([1,2,3], function(i, n) {
  return n * 2;
});

var b = arrayMap([1,2,3], function(i, n) {
  return n * 3;
});

console.log(a);
console.log(b);