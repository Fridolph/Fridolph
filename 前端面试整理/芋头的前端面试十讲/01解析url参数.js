// 01解析url参数
// 问题：尽可能全面正确的解析一个任意url的所有参数为Object
// const parseParam = url => {
//   let obj = {}
//   let keyvalue = []
//   let kvArr = []
//   let key = ''
//   let value = ''
//   let parseString = url.substring(url.indexOf('?') + 1, url.length).split('&')
  
//   for (let i in parseString) {
//     keyvalue = parseString[i]
//     // console.log(keyvalue)

//     if (keyvalue.indexOf('=') === -1) {      
//       obj[keyvalue] = true
//     } else {      
//       kvArr = keyvalue.split('=')
//       key = kvArr[0]
//       value = decodeURIComponent(kvArr[1])
//       obj[key] = value
//     }
//   }

//   console.log(obj)
//   return obj
// }

const parseParam = url => {
  let result = {}
  let queryString = url.substr(url.indexOf('?') + 1, url.length)
  // console.log(queryString)  
  let queryArr = queryString.split('&')
  let key = ''
  let value = ''

  queryArr.map(item => {
    if (item.indexOf('=') === -1) {
      result[item] = true
    } else {
      let kv = item.split('=')
      key = kv[0]
      value = decodeURIComponent(kv[1])
      result[key] = value
    }
  })

  console.log(result)
  return result
}

var url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&d&enabled';
parseParam(url);
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
