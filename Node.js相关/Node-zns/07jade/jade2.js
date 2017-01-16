var jade = require('jade')
var fs = require('fs')

let str = jade.renderFile('./views/1.jade', {pretty: true})

fs.writeFile('./build/index.html', str, function(err) {
  if (err) {
    console.error(err);
    console.log('写入失败');
  } else {
    console.log('写入成功');
  }
})