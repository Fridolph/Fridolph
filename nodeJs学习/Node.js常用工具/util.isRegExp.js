// 如果给定的参数object是一个正则返回true否则返回false

var util = require('util')

util.isRegExp(/some regexp/) // true

util.isRegExp(new RegExp('another regexp')) // true

util.isRegExp({}) // false
