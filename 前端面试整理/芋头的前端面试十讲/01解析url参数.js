// 01解析url参数
// 问题：尽可能全面正确的解析一个任意url的所有参数为Object
const parseUrl = url => {
  let result = {}
  if (typeof url !== 'string') return result
  // 判断是否为合法url可跳过
  if (url.indexOf('?') === -1) return reuslt
  let querystring = url.substring(url.indexOf('?') + 1)
  let queryArr = querystring.split('&')
  let key
  let value
  queryArr.map(item => {
    if (item.indexOf('=') === -1) {
      result[item] = true
    } else {
      let kv = item.split('=')
      let key = decodeURIComponent(kv[0])
      let value = decodeURIComponent(kv[1])
      // 如果是新key 直接添加
      if (!(key in result)) {
        result[key] = value
      } else if (isArray(result[key])) {
        // 如果key已经出现一次以上，直接向数组添加value
        result[key].push(value)
      } else {
        // 如果key第二次出现，将结果改为数组
        let arr = [result[key]]
        arr.push(value)
        result[key] = arr
      }
    }
  })

  function isArray(obj) {
    if (obj && typeof obj === 'object') {
      return Object.prototype.toString.call(obj) === '[object Array]'
    }
    return false
  }

  return result
}

var url =
  'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&d&enabled'
console.log(parseUrl(url))
/**
结果：
{
  user: 'anonymous',
  // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  id: [123, 456], 
  // 中文
  city: '北京', 
  // 未指定值的 key 约定值为 true
  enabled: true
}
*/
