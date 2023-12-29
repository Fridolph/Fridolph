/* 一个用于计数的可写流 */
var Writable = require('stream').Writable;
var util = require('util');

module.exports = CountStream;

// 继承可写流
util.inherits(CountStream, Writable);

function CountStream(matchText, options) {
  Writable.call(this, options);
  this.count = 0;
  // 创建一个全局可忽略大小写的正则对象
  this.matcher = new RegExp(matchText, 'ig');
}

CountStream.prototype._write = function(chunk, encoding, cb) {
  // 把当前的输入数据转化为字符串并进行匹配
  var matches = chunk.toString().match(this.matcher);;
  if (matches) {;
    this.count += matches.length;
  }
  cb();
}

CountStream.prototype.end = function() {
  // 当输入流结束时，触发total事件
  this.emit('total', this.count);
}