
const URL = "https://harttle.land:80/tags.html?simple=true#HTML"

function parseUrl(url) {
  const reg = /^(?:([A-Za-z]+):)?(?:\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
  const fields = ['url', 'schema', 'host', 'port', 'path', 'query', 'hash']
  const arr = url.match(reg)
  let ret = {}
  if (arr) {
    fields.forEach((v, i) => {
      if (arr[i]) {
        ret[v] = arr[i]
      }
    })
    return ret
  } else {
    console.log('请传入合法的url')
  }
}

console.log(parseUrl('www.baidu.com'))

// 协议 ([a-zA-Z]+)?