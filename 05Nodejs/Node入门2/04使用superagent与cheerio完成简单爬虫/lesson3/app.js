var express = require('express')
var superagent = require('superagent')
var cheerio = require('cheerio')

var app = express()

app.get('/', (req, res, next) => {
  // 用superagent去抓取 https://cnodejs.org/ 的内容
  superagent.get('https://cnodejs.org/')
    .end((err, sres) => {
      // 常规错误处理
      if (err) {
        return next(err)
      }
      // sres.text 里面存储着网页的html内容，将它传给cheerio.load之后
      // 就可以得到一个实现了jquery接口的变量，我们习惯性地将它命名为 $
      // 剩下就都是jquery的内容了
      var $ = cheerio.load(sres.text);
      var items = [];

      $('#topic_list .topic_title').each((index, element) => {
        var $element = $(element);
        items.push({
          title: $element.attr('title'),
          href: $element.attr('href')
        })
      });

      res.send(items);
    });
});

app.listen(3000, () => {
  console.log('app is running at port 3000.');
})