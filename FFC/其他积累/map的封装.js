Array.prototype._map = function (fn, context) {
  var temp = [];
  if (typeof fn == 'function') {
    var k = 0;
    var len = this.length;

    // 封装for循环的过程
    for (; k < len; k++) {
      temp.push(fn.call(context, this[k], k, this));
      console.log(`当前的this[k]是：${this[k]}`);
    }
  } else {
    console.log('err');
  }
  return temp;
}


var newArr = [1,2,3,4]._map(item => {
  return item + 1;
})