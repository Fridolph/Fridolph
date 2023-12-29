var stream = require('stream');
var util = require('util');
var express = require('express');
var app = express();

// 继承于stream.Readable来创建一个可读流，并且调用父类的构造函数
util.inherits(StatStream, stream.Readable);

function StatStream(limit) {
  stream.Readable.call(this);
  this.limit = limit;
}

StatStream.prototype._read = function(size) {
  if (this.limit === 0) {
    // Done
    this.push();
  } else {
    // 用一些数据来响应请求，这里是发送一个表示Node进程内存用量的字符串
    this.push(util.inspect(process.memoryUsage()));
    this.push('n');
    this.limit--;
  }
};

app.get('/', (req, res) => {
  var statStream = new StatStream(10);

  // 使用标准的readable.pipe(writable)模式来把数据返回给浏览器
  statStream.pipe(res);
});

app.listen(3000);

/**
 * 自定义可读流、统计流、继承自stream.Readable并且实现了_read方法，用来发送内存使用量
 * 当你想要创建一个可读流的时候必须要实现_read方法。当向浏览器响应数据时，
 * 流可以直接使用管道传给res对象，不需要额外工作
 * 
 */