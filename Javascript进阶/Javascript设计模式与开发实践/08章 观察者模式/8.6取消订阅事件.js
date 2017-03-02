/**
 * 有时，我们也需要取消订阅事件，比如不想买房了，避免再收到垃圾信息
 * 现在我们给event对象增加remove方法
 */

var event = {
  clientList: [],
  listen: function(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);  // 订阅的消息添加进缓存列表
  },
  trigger: function() {
    var key = Array.prototype.shift.call(arguments),
        fns = this.clientList[key];

    if (!fns || fns.length === 0) { // 如果没有绑定对应的消息
      return false;
    }

    for (var i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments);  // arguments是trigger时带上的参数
    }
  }  
};

event.remove = function(key, fn) {
  var fns = this.clientList[key];

  if (!fns) { // 如果key对应的消息没有被人订阅，则直接返回
    return false;
  }
  if (!fn) { // 如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
    fns && (fns.length = 0);
  } else {
    for (var l = fns.length - 1; l >= 0; l--) { // 反向遍历订阅的回调函数列表
      var _fn = fns[l];
      if (_fn === fn) {
        fns.splice(l, 1);  // 删除订阅者的回调函数
      }
    }
  }
};
/**
 * 再定义一个installEvent函数，该函数可以给所有的对象都动态安装发布-订阅功能：
 */
var installEvent = function(obj) {
  for (var i in event) {
    obj[i] = event[i];
  }
}
/**
 * 测试，业务逻辑部分
 * 给售楼处对象salesOffices动态增加发布-订阅功能：
 */
var salesOffices = {};
installEvent(salesOffices);

salesOffices.listen('squareMeter88', fn1 = function(price) {
  console.log(`88平方的价格是: ${price}万元`);
});
salesOffices.listen('squareMeter110', fn2 = function(price) {
  console.log(`110平方的价格是: ${price}万元`);
});

salesOffices.remove('squareMeter88', fn1);
salesOffices.trigger('squareMeter88', 20);