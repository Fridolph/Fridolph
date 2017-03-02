/**
 * 在8.4售楼处例子的基础上，现在A可以在多处售楼处订阅消息，在此基础上扩展，
 * 我们把发布-订阅功能提取出来，放在一个单独的对象内，代码如下：
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

salesOffices.listen('squareMeter88', price => {
  console.log(`88平方的价格是: ${price}万元`);
});
salesOffices.listen('squareMeter110', price => {
  console.log(`110平方的价格是: ${price}万元`);
});

salesOffices.trigger('squareMeter88', 20);
salesOffices.trigger('squareMeter110', 30);