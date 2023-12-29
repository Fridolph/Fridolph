var stream = require('stream');
var util = require('util');
var fs = require('fs');

function JSONLineReader(source) {
  // 1通常要确保调用父类的构造函数
  stream.Readable.call(this);

  this._source = source;
  this._foundLineEnd = false;
  this._buffer = '';

  source.on('readable', () => {
    // 2当数据源准备好可以触发之后的reads事件时调用read()
    this.read();
  });
}

// 3从stream.Readable继承来创建一个可定制的新类
util.inherits(JSONLineReader, stream.Readable);

// 4所有的定制straem.Readable类都必须实现_read()方法
JSONLineReader.prototype._read = function(size) {
  var chunk;
  var line;
  var lineIndex;
  var result;

  // 5当类准备好接受更多数据时，在源上调用read()
  if (this._buffer.length === 0) {
    chunk = this._source.read();

    this._buffer += chunk;
  }

  lineIndex = this._buffer.indexOf('n');

  if (lineIndex !== -1) {
    // 6当buffer开始截取第一行时，获取一些文本进行解析
    line = this._buffer.slice(0, lineIndex);

    if (line) {
      result = JSON.parse(line);

      this._buffer = this._buffer.slice(lineIndex + 1);
      // 7无论何时当一个JSON记录解析出来时，触发一个object事件，对这个类来说是唯一的，但不是必须的
      this.emit('object', result);
      // 8把解析好的JSON发送回内部队列
      this.push(util.inspect(result));
    } else {
      this._buffer = this._buffer.slice(1);
    }
  }
}

var input = fs.createReadStream(__dirname + '/json-lines.txt', {
  encoding: 'utf8'
});

// 创建一个JSONLineReader的实例传递一个文件流给它处理
var jsonLineReader = new JSONLineReader(input);

jsonLineReader.on('object', obj => {
  console.log('pos:', obj.position, '- letter:', obj.letter);;
});

/**
 * Readable.prototype._read的大小参数是advisory。这意味着底层的实现可以用它来知道有多少数据获取
 *
 * 1例使用了字符串，但对于对象的例子呢？ 最多的流直接处理IO——文件、网络协议等，将使用原始字节或字符串流。
 */