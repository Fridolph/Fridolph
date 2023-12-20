var jade = require('jade')
var fs = require('fs')

var str = jade.renderFile('./views/index.jade', {pretty: true})

fs.writeFile('./build/index.html', str, function(err) {
  if (err) {
    console.log('编译失败');
    console.error(err);
  } else {
    console.log('编译成功');
  }
})