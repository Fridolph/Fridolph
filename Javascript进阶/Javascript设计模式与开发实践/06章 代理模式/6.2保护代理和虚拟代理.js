var Flower = function() {};

var xiaoming = {
  sendFlower: function(target) {
    var flower = new Flower();
    target.receiveFlower(flower);
  }
}

var B = {
  receiveFlower: function(flower) {
    A.listenGoodMood(function() {  // 监听A的好心情
      var flower = new Flower();   // 延迟创建flower对象
      A.receiveFlower(flower);
    })
  }
}

var A = {
  receiveFlower: function(flower) {
    console.log('收到花 ' + flower);
  },
  listenGoodMood: function(fn) {
    setTimeout(function() { // 假设10秒之后A的心情变好
      fn();
    }, 5000)
  }
}

xiaoming.sendFlower(B);
/**
 * 保护代理用于控制不同权限的对象对目标对象的访问。
 * 但在JS中并不易实现保护代理，因此我们无法判断谁访问了某个对象。
 * 而虚拟代理是最常用的一种代理模式
 */