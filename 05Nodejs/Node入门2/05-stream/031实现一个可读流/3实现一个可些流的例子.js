// 1使用通常的继承模式来创建一个新的可写流类
var stream = require('stream');

GreenStream.prototype = Object.create(stream.Writable.prototype, {
  constructor: {value: GreenStream}
});

function GreenStream(options) {
  stream.Writable.call(this, options);
}

GreenStream.prototype._write = (chunk, encoding, callback) => {
  // 使用ANSI编码序列来给数据块添加绿色文本的标识
  process.stdout.write('u001b[32m' + chunk + 'u001b[39m');
  // 当文本已经被发送到标准输出流时执行回调
  callback();
}

// 使用管道从输入到输出来把文本转换为绿色文本
process.stdin.pipe(new GreenStream());