function Bomb() {
  this.message = 'Boom!';
}

Bomb.prototype.explode = function() {
  console.log(this.message);
}

var bomb = new Bomb();

var timeoutId = setTimeout(bomb.explode.bind(bomb), 1000);
// 调用clearTimeout来在运行中组织bomb的explode
clearTimeout(timeoutId);

/**
 * 回调何时执行？
 * 尽管可以制定某时执行一个回调，但Node没有那么准确。它能确保回调在一定的时间执行，但可能会有延迟
 */
