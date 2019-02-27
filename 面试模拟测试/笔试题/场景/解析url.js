let url = 'http://www.baidu.com/?user=huixin&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'

function parseParam(url) {
  let obj = {}
  let arr = url.split('?')
  if (arr.length === 1) return ''

  let total = arr[1].split('&')
  total.forEach(item => {
    let single = item.split('=')
    if (single[0] === '') return ''
    if (!single[1]) {
      obj[single[0]] = true
    } else {
      if (obj[single[0]]) {
        let concat
        // 判断是否为数组
        if (!Array.isArray(obj[single[0]])) {
          concat = [obj[single[0]]]
        } else {
          concat = obj[single[0]]
        }
        concat.push(single[1])
        // 去重
        concat = new Set(concat)
        concat = Array.from(concat)
        obj[single[0]] = concat
      } else {
        obj[single[0]] = decodeURI(single[1])
      }
    }
  })
  return obj
}
