var ejs = require('ejs')
var fs = require('fs')

var str = '';

ejs.renderFile('./views/2.ejs', {
  title: '我是标题',
  name: 'fridolph',
  json: {
    arr: [
      { user: 'fri', pass: '111' },
      { user: 'yk', pass: '222' },
      { user: 'wb', pass: '333' }
    ]
  }
}, function(err,data) {
  if (err) { 
    // console.log('渲染错误');
    console.error(err);
  } else {
    console.log('渲染成功');
    console.log(data);

    str = data
  }
})

fs.writeFile('./www/index.html', str, function(err) {
  if (err) {
    console.log('写入错误');
    console.error(err);
  } else {
    console.log('写入成功');
  }
})