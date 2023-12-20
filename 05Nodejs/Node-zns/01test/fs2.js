const fs = require('fs');

// writeFile(文件名, 内容, 回调)
fs.writeFile('bbb.txt', 'sdfhkhwelriyhsufhlskufhlkfuwehfiuwhf', function(err) {
  if (err) {
    console.error(err);
  }
})