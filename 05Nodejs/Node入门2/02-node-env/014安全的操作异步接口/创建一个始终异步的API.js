/**
 * 该例异步地从磁盘上读取一个文件，一旦读取了文件，它会在内存中缓存这个文件。
 * 之后调用会直接返回缓存内容。当返回缓存时，通过调用process.nextTick来使接口异步地执行。
 * 这确保了在终端中的输出顺序是正确的。
 */

var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var content;

function readFileRequired(cb) {
  // 如果内容还没被读进内存，那么异步读取它
  if (!content) {
    fs.readFile(__filename, 'utf8', function(err, data) {
      content = data;
      console.log('readFileIfRequired: readFile');
      cb(err, content);
    });
  } else {
    // 如果内容已经读取好了，传递缓存的版本给回调，但是第一次使用process.nextTick来确保回调过一会儿才执行
    process.nextTick(function() {
      console.log('readFileIfRequired: cached');
      cb(null, content);
    });
  }
}

// 随后调用异步的操作来确保行为和预期的一样
readFileRequired(function(err, data) {
  console.log('1. Length:', data.length);

  readFileRequired(function(err, data2) {
    console.log('2. Length:', data2.length);
  });

  console.log('Reading file again...');
});

console.log('Reading file...');