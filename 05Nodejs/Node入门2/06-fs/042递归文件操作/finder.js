var fs = require('fs');
var join = require('path').join;

// 1接收一个正则用来从一开始的路径进行文件搜索
exports.findSync = function(nameRe, startPath) {
  // 2存储匹配项的集合
  var results = [];

  function finder(path) {
    // 3获取文件列表（包括目录）
    var files = fs.readdirSync(path);

    for (var i = 0; i < files.length; i++) {
      // 4获取当前文件的路径
      var fpath = join(path, files[i]);
      // 5获取当前文件的状态
      var stats = fs.statSync(fpath);

      // 6如果它是一个文件目录，继续使用新的路径调用finder
      if (stats.isDirectory()) {
        finder(fpath);
      }

      // 7如果它是一个文件，并且满足搜索的匹配，将其添加到结果中
      if (stats.isFile() && nameRe.test(files[i])) {
        results.push(fpath);
      }
    }    
  }

  // 8初始化文件查找
  finder(startPath);
  
  // 9返回结果
  return results;
}



