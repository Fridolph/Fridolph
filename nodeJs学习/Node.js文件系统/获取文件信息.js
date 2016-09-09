// 以下为通过异步模式获取文件信息的语法格式
// fs.stat(path, callback)
// path 文件路径
// callback 回调函数，带两个参数 callback, stats
// 注：stats是fs.Stats的对象
// fs.stat(path)执行后，会将stats类的实例返回给其回调函数。可以通过stats类中的提供方法判断文件的相关属性。例如判断是否为文件：


var fs = require('fs')

fs.stat('./input.txt', function (err, stats) {
    console.log(stats.isFile());    //true
})