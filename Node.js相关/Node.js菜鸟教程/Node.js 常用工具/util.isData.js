// 如果给定的参数 "object" 是一个日期返回true，否则返回false。

var util = require('util');

util.isDate(new Date())
  // true
util.isDate(Date())
  // false (without 'new' returns a String)
util.isDate({})
  // false