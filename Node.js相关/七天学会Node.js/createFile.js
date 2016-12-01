var path = require('path')
var fs = require('fs')

fs.writeFile('package.json', `{
    "name": "node-echo",
    "main": "./lib/echo.js"
  }`, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('文件已经被创建了。');
})
