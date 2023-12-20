var jade = require('jade')
var fs = require('fs')

let str = jade.renderFile('./views/2.jade', {pretty: true,
  arr: ['aaa', 'bbb', 'ccc']
})

fs.writeFile('./build/demo.html', str, function(err) {
  if (err) {
    console.error(err);
    console.log('写入失败');
  } else {
    console.log('写入成功');
  }
})