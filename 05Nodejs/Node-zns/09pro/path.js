var path = require('path')

var str = 'E:\\git\\Fridolph\\README.md';

var obj = path.parse(str)

console.log(obj);

// basename 全名
// extname 扩展名
// dir 文件目录
// name 文件名的部分不包含扩展名