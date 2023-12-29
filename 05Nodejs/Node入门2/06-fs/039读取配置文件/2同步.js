var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json').toString());

doThisThing(config);

/**
 * 使用同步方法的一个特点是，一旦有错误发生， 它将会抛出异常
 * 
 * 这和异步方法不同，异步方法把error对象作为回调的第一个参数：
 */

fs.readFile('./some-file', (err, data) => {
  if (err) {
    console.error(err);
  }
});

