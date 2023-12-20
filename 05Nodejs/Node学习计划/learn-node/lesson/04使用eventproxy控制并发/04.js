// 《使用 eventproxy 控制并发》
// https://github.com/alsotang/node-lessons/tree/master/lesson4
const eventproxy = require('eventproxy')
const cheerio = require('cheerio')
const superagent = require('superagent')
const url = require('url')

const cnodeUrl = 'https://cnodejs.org/'

superagent.get(cnodeUrl).end((err, cres) => {
  if (err) return console.error(err)

  let topicUrls = []
  let $ = cheerio.load(cres.text)
  // 获取首页的所有连接
  $('#topic_list .topic_title').each((idx, elem) => {
    let $elem = $(elem)
    let href = url.resolve(cnodeUrl, $elem.attr('href'))
    topicUrls.push(href)
  })

  const ep = new eventproxy()

  ep.after('topic_html', topicUrls.length, topics => {
    // topics是个数组，包含了40次ep.emit('topic_html', pair)中的那40个pair
    // 行动
    topics = topics.map(topicPair => {
      let topicUrl = topicPair[0]
      let topicHtml = topicPair[1]
      let $ = cheerio.load(topicHtml)

      return {
        title: $('.topic_full_title').text().trim(),
        href: topicUrl,
        comment1: $('.reply_content').eq(0).text().trim()
      }
    })

    console.log('final:');
    console.log(topics);
  })

  topicUrls.forEach(topicUrl => {
    superagent.get(topicUrl)
      .end((err, sres) => {
        console.log(`fetch ${topicUrl} successfully`)
        ep.emit('topic_html', [topicUrl, sres.text])
      })
  })
})
