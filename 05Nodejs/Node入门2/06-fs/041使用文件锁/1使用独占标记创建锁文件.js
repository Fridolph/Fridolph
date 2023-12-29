/*fs模块为所有需要打开文件的方法，(比如writeFile、fs.createWriteStream以及fs.open)
提供了一个x标记。这告诉操作系统这个文件应该以独占模式打开(0_EXCL)，当使用这个方法时，
若这个文件存在，文件不能被打开：*/


fs.open('config.lock', 'wx', err => {
  if (err) return console.error(err);

})

// 1以可执行、可写入的模式打开
// 2任何失败，包括文件已存在
// 3安全地修改config.json


fs.writeFile('config.lock', process.pid, {flags: 'wx'}, err => {
  if (err) return console.error(err);

});

// 1如果不存在锁文件的话，写入PID来锁住文件
// 2任何失败，包括文件已存在
// 3安全地修改config.json