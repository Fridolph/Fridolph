/**
 * 之前的模型其实存在两个问题：
 * 我们给每个发布对象都添加了listen和trigger方法，以及一个缓存列表clientList，这其实是一种浪费
 * 订阅者和发布者存在一定耦合，订阅者至少要知道发布者名称才能顺利订阅事件
 *
 * 结论，我们不会去具体某家楼盘，更多的是去找中介，订阅发布者之间的通信由中介来连接
 * 同样在程序中，发布订阅模式可以用一个全局的Event对象来实现，订阅者不需要了解消息来自哪个发布者。
 * Event作为一个类型“中介者”角色，把订阅者和发布者联系起来，代码如下：
 */

var Event = (function() {

  var clientList = {},
      listen,
      trigger,
      remove;

  listen = function(key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  }

  trigger = function() {
    var key = Array.prototype.shift.call(arguments),
        fns = clientList[key];
    
    if (!fns || fns.length === 0) {
      return false;
    }

    for (var i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments);
    }
  }

  remove = function(key, fn) {
    var fns = clientList[key];

    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        var _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);
        }
      }
    }
  }

  return {
    listen: listen,
    trigger: trigger,
    remove: remove
  }

})();

Event.listen('squareMeter88', price => {
  console.log(`88平方的价格是: ${price}万元`);
});

Event.trigger('squareMeter88', 20);