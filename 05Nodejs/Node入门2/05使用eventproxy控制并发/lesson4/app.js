var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');

// url模块是Node标准库里面的
var url = require('url')
var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
  .end((err, data) => {
    if (err) {
      return console.error(err)
    }
    var topicUrls = [];
    var $ = cheerio.load(data.text);
    // 获取首页所有的链接
    $('#topic_list .topic_title').each((index, element) => {
      var $element = $(element);
      // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
      // 我们用 url.resolve 来自动推断出完整 url，变成
      // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
      // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
      var href = url.resolve(cnodeUrl, $element.attr('href'));
      topicUrls.push(href);
    });

    console.log(topicUrls);
  });