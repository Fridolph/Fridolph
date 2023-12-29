var cheerio = require('cheerio');
var jsdom = require('jsdom');
var fs = require('fs');

// 加载HTML内容
fs.readFile('./index.html', 'utf8', (err, html) => {
  var $ = cheerio.load(html);
  // 使用CSS选择器进行查询
  var releases = $('.Releases a strong');

  releases.each(function(i) {
    // 获取文本内容
    console.log('New release:' + this.text());
  });
});