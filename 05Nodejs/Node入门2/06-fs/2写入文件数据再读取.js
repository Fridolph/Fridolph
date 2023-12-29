var fs = require('fs');
var assert = require('assert');

// 1打开或者创建file.txt用于写或者读 w+
var fd = fs.openSync('./file.txt', 'w+');
// 2创建一个数据buffer用于写入
var writeBuf = new Buffer('some data to write');
// 3把buffer写入到文件中
fs.writeSync(fd, writeBuf, 0, writeBuf.length, 0);

// 4创建一个空的buffer, 大小和写入的buffer一样
var readBuf = new Buffer(writeBuf.length);
// 5使用存储在文件中的数据填充buffer
fs.readSync(fd, readBuf, 0 ,writeBuf.length, 0);
// 6断言写入的buffer和读取的buffer的数据是一致的
assert.equal(writeBuf.toString(), readBuf.toString());
// 7关闭文件
fs.closeSync(fd);

/**
 * 当要读写文件的时候，通常不需要使用这么低级别的接口，可以使用流或者大容量文件I/O
 */