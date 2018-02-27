// https://github.com/alsotang/node-lessons/tree/master/lesson3
const express = require('express')
const superagent = require('superagent')
const cheerio = require('cheerio')

let app = express()

app.get('/', (req, res, next) => {
  superagent.get('https://cnodejs.org/')
    .end((err, sres) => {
      // 先进行错误处理
      if (err) return next(err)

      // sres.text 里面存储着网页的html内容，将它传给cheerio.load之后
      // 就可以得到一个实现了jquery接口的变量，我们习惯性地命名为 $ ...
      let $ = cheerio.load(sres.text)
      let items = []

      $('#topic_list .topic_title').each((idx, elem) => {
        let $elem = $(elem)
        items.push({
          title: $elem.attr('title'),
          href: $elem.attr('href')
        })
      })

      let str = ""
      items.forEach((item, index) => {
        str += item.title
      })

      res.send(str)
    })
})

app.listen(3000, () => {
  console.log('爬虫程序启动')
})