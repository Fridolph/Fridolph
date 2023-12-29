/* 操作命令行参数 */

// 该对象表可用参数
var args = {
  '-h': displayHelp,
  '-r': readFile
};

function displayHelp() {
  console.log('Argument processor: ', args);
}

function readFile(file) {
  console.log('Reading: ', file);
  // 使用管道把文件发送到标准输出流
  require('fs').createReadStream(file).pipe(process.stdout);
}

// 调用从参数模型中匹配到的方法，并通过对完整的参数列表进行分隔来有效支持来自命令行标记的选项传递
if (process.argv.length > 0) {
  process.argv.forEach(function(arg, index) {
    args[arg].apply(this, process.argv.slice(index + 1));
  });
}