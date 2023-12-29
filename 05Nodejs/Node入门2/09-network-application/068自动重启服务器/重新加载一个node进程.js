var fs = require('fs');
var exec = require('child_process').exec;

function watch() {
  // 开启web服务器进程
  var child = exec('node test.js');
  // 使用fs.watch监测文件修改
  var watcher = fs.watch(__dirname + '/test.js', event => {
    console.log('File changed, reloading...');
    // 当文件修改时，关闭web服务器
    child.kill();
    // 关闭检测器
    watcher.close();
    // 递归调用监测器函数来再次开启服务
    watch();
  });
}

watch();