var fs = require('fs')

fs.readdir(process.cwd(), function(err, files) {
  console.log('');

  if (!files.length) {
    return console.log('    \033[31m no files to show\033[39m\n]]');
  }

  console.log('    Select which file or directory you want to see\n');

  // 异步控制流
  function file(i) {
    var filename = files[i];  // 先获取文件名

    // fs.stat会给出文件或者目录的元数据
    fs.stat(__dirname + '/' + filename, function(err, stat) {

      // 如果路径所代表的是目录，我们就用有别于文件的颜色标识出来
      if (stat.isDirectory()) {
        console.log('    '+ i + '    \033[36m' + filename + '/\033[39m');
      } else {
        console.log('    ' + i + '    \033[90m' + filename + '\033[39m');
      }

      // 计数器不断递增，于次同时，检查是否还有未处理的文件
      i++;

      if (i == files.length) {
        console.log('');
        process.stdout.write('    \033[33mEnter your choice: \033[39m');
        process.stdin.resume();
        process.stdin.setEncoding('utf8')
      } else {
        file(i);
      }
    });
  }

  file(0);
})