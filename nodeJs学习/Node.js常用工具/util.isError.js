// 如果给定的参数 "object" 是一个错误对象返回true，否则返回false。


var util = require('util');

util.isError(new Error())
  // true
util.isError(new TypeError())
  // true
util.isError({ name: 'Error', message: 'an error occurred' })
  // false