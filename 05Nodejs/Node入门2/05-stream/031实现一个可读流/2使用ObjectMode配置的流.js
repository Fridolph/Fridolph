var stream = require('stream');
var util = require('util');

util.inherits(MemoryStream, stream.Readable);

function MemoryStream(options) {
  options = options || {},
  options.objectMode = true;

  // 这个流应该都使用objectMode，所以在这里设置，并且把剩余的设置参数传递给stream.Readable构造函数
  stream.Readable.call(this, options);
}

MemoryStream.prototype._read = size => {
  // 调用Node内置的process.memoryUsage()方法来创建一个对象
  this.push(process.memoryUsage());
}

var memoryStream = new MemoryStream();

// 给可读流添加一个监听器来跟踪什么时候流准备好可以输出数据，然后调用stream.read()来获取最新的数据
momeryStream.on('readable', () => {
  var output = memoryStream.read();
  console.log('Type: %s, value: %j', typeof output, output);
});

/**
 * 该例中, MemoryStream示例使用数据对象，所以objectMode传递给可读构造作为一个选娘。
 * 然后process.memoryUsage被用来产生一些合适的数据。当这个类的实例发出可读，表示它已经准备好接收，
 * 之后内存使用情况的数据被记录到控制台读取。
 *
 * 当使用objectMode时，流的底层行为发生改变，用来除去内部缓冲区合并和长度检查，并且读取和写入时忽略大小参数。
 */