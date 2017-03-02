/**
   * 除了DOM事件，我们还会经常实现一些自定义的事件
   * 这种依靠自定义事件完成的发布-订阅模式可以用于任何JS代码中
   *
   * 现在看看如何一步步实现发布-订阅模式：
   * 首先要指定好谁充当发布者
   * 然后给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者
   * 最后发布消息时，发布者会遍历这个缓存列表，依次触发里面存放的订阅者回调函数
   *
   * 另外，我们还可以往回调函数里填入一些参数，订阅者可以接收这些参数。这是很有必要的，
   * 订阅者接收到这些信息之后可以进行各自的处理
   */
  
// var salesOffices = {}; // 定义售楼处

// salesOffices.clientList = []; // 缓存列表，存放订阅者的回调函数

// salesOffices.listen = function(fn) { // 增加订阅者
//   this.clientList.push(fn); // 订阅的消息添加进缓存列表
// };

// salesOffices.trigger = function() { // 发布消息
//   for (var i = 0, fn; fn = this.clientList[i++];) {
//     fn.apply(this, arguments); // arguments是发布消息时带上的参数
//   }
// }

/**
 * 进行一下简单测试：
 */
// salesOffices.listen(function(price, squareMeter) { // 小明订阅消息
//   console.log('价格/万元 ' + price);
//   console.log('占地/平方米 ' + squareMeter);
// });
// salesOffices.listen(function(price, squareMeter) { // 小红订阅消息
//   console.log('价格/万元 ' + price);
//   console.log('平方/平方米 ' + squareMeter);
// });

// salesOffices.trigger('20', 88);
// salesOffices.trigger('30', 110);

/**
 * 修改上述代码，让订阅者只订阅自己感兴趣的消息
 */

var salesOffices = {}; // 定义售楼处

salesOffices.clientList = {}; // 缓存列表，存放订阅者的回调函数

salesOffices.listen = function(key, fn) {
  if (!this.clientList[key]) { // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
    this.clientList[key] = [];
  }
  this.clientList[key].push(fn); // 订阅的消息添加进消息缓存列表
}

salesOffices.trigger = function() { // 发布消息
  var key = Array.prototype.shift.call(arguments), // 取出消息类型
      fns = this.clientList[key];  // 取出该消息对应的回调函数的集合

  if (!fns || fns.length === 0) { // 如果没有订阅该消息，则返回
    return false;
  }

  for (var i = 0, fn; fn = fns[i++];) {
    fn.apply(this, arguments);  // arguments是发布消息时附送的参数
  }
}

salesOffices.listen('squareMeter88', price => {
  console.log(`88平方的价格是: ${price}万元`);
});
salesOffices.listen('squareMeter110', price => {
  console.log(`110平方的价格是: ${price}万元`);
});

salesOffices.trigger('squareMeter88', 20);
salesOffices.trigger('squareMeter110', 30);