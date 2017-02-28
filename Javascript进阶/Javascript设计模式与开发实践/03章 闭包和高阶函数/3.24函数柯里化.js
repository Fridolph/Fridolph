var curring = function(fn) {
  var args = [];

  return function() {
    if (arguments.length === 0) {
      return fn.apply(this, args);
    } else {
      [].push.apply(args, arguments);
      return arguments.callee;
    }
  }
}

var cost = (function() {
  var money = 0;

  return function() {
    for (var i = 0, l = arguments.length; i < l; i++) {
      money += arguments[i];
    }    
    return money;
  }
})()

var cost = curring(cost); // 转化成curring函数

cost(100);
cost(200);
cost(300);

console.log(cost());