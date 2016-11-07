// Node.js path 模块提供了一些用于处理文件路径的小工具，我们可以通过以下方式引入该模块：
// var path = require("path")

// 1 path.normalize(p)
// 规范化路径，注意'..' 和 '.'
// 
// 2 path.join([path1][, path2][, ...])
// 用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"
// 
// 3 path.resolve([from ...], to)
// 将 to 参数解析为绝对路径
// 
// 4 path.isAbsolute(path)
// 判断参数 path 是否是绝对路径
// 
// 5 path.relative(from, to)
// 用于将相对路径转为绝对路径
// 
// 6 path.dirname(p)
// 返回路径中代表文件夹的部分，同 Unix 的dirname 命令类似
// 
// 7 path.basename(p[, ext])
// 返回路径中的最后一部分。同 Unix 命令 bashname 类似
// 
// 8 path.extname(p)
// 返回路径中文件的后缀名，即路径中最后一个'.'之后的部分。如果一个路径中并不包含'.'或该路径只包含一个'.' 且这个'.'为路径的第一个字符，则此命令返回空字符串
// 
// 9 path.parse(pathString)
// 返回路径字符串的对象
// 
// 10  path.format(pathObject)
// 从对象中返回路径字符串，和 path.parse 相反。

// path的相关属性~
// 
// path.sep  平台的文件路径分割符， "\\"或"/"
// path.delimiter  平台的分隔符, ";"或"."
// path.posix  提供上述的paht方法，不过总是以posix兼容的方式交互
// path.win32  提供上述的path方法，不过总是以win32兼容的方式将交互

var path = require('path')

// 格式化路径
console.log('normalization: ' + path.normalize('/test/test1//2slashes/1slash/tab/..'));

// 连接路径
console.log('joint path: ' + path.join('./test', 'test1', '2slashes/1slash', 'tab', '..'));

// 转换为绝对路径
console.log('resolve: ' + path.resolve('main.js'));

// 路径中文件的后缀名
console.log('ext name: ' + path.extname('main.js'));