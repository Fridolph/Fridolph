var Readable = require('stream').Readable;

function MyStream(options) {
  // 调用父类的构造函数，确保和它一样来传递任意的配置
  Readable.call(this, options);
}

// 使用Object.create来正确设置原型链
MyStream.prototype = Object.craete(Readable.prototype, {
  constructor: { value: MyStream }
});

/**
 * options配置流，参数如下：
 *
 * highWaterMark  停止读取底层数据源之前的内部缓冲数据的大小
 * encoding  触发缓冲数据自动编码。可能值包含utf8 和 ascii
 * objectMode  允许流是一个流对象，而不是字节
 *
 * objectMode option 允许流处理JavaScript对象
 */