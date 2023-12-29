function Bomb() {
  this.message = 'Boom!';
}

Bomb.prototype.explode = function() {
  console.log(this.message);
}

var bomb = new Bomb();

setTimeout(bomb.explode.bind(bomb), 1000);

/**
 * 通过第爱哦用.bind可以确保这个方法绑定到正确的对象上，这样它可以访问这个对象的内部属性
 *
 * 绑定确保了该方法内的代码可以访问对象的内部属性，否则setTimeout会导致与this绑定到全局对象运行。
 * 绑定方法相比创建一个新的匿名函数更具有可读性。
 *
 * 要取消将被执行的函数u,xuyao保存setTimeout函数执行返回的timeoutId, 
 * 然后通过调用clearTimeout(timeoutId)来取消
 */