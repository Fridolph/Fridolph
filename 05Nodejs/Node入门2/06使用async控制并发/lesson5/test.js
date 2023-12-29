var async = require('async')
// 并发连接数计算器
var concurrencyCount = 0;
var fetchUrl = (url, callback) => {
  // delay的值在2000以内是个随机整数
  var delay = parseInt((Math.random() * 10000000) % 2000, 10);
  concurrencyCount++;
  console.log(`现在的并发数是 ${concurrencyCount}, \n正在抓取的是: ${url}, 耗时 ${delay} 毫秒`);
  setTimeout(() => {
    concurrencyCount--;
    callback(null, url + ' html content')
  }, delay);
}

// 我们接着来伪造一组链接
var urls = [];
for (var i = 0; i < 30; i++) {
  urls.push('http://datasource_' + i);
}

async.mapLimit(urls, 5, function (url, callback) {
  fetchUrl(url, callback);
}, function (err, result) {
  console.log('final:');
  console.log(result);
});