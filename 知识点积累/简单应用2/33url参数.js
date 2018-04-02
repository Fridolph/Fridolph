// 使用match 与 适当的正则表达式来获得所有键值对，适当的map
// 使用Object.assign 和 spread 运算符 将所有键值对组合到一个对象中
// 将location.search作为参数传递给当前url
const getUrlParameters = url =>
  url
    .match(/([^?=&]+)(=([^&]*))/g)
    .reduce((a, v) => (
        a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a
      ),
    {})

const URL = 'http://url.com/page?name=Adam&&surname=Smith'

console.log(URL.match(/([^?=&]+)(=([^&]*))/g))

console.log(getUrlParameters(URL))
