function monitor() {
  console.log(process.memoryUsage());
}

var id = setInterval(monitor, 1000);

// 在程序完成长时间的操作后，告知Node停止定时器
id.unref();

setTimeout(function() {
  console.log('Done!');
}, 5000);