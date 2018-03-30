// const debug = require('debug')('jsonp')
// 记录回调次数
let count = 0
// Noop循环函数
function noop() {}
/**
 * 实现jsonp的主函数，接受3个参数
 * @param {String} url 
 * @param {Object | Function} opts 
 * @param {Function} fn 
 */
function jsonp(url, opts, fn) {
  if (typeof opts === 'function') {
    fn = opts
    opts = {}
  }

  if (!opts) opts = {}

  const prefix = opts.prefix || '__jp'

  // 如果被调用就 使用被提供的回调名称
  // 否则通过增加计数器来生成一个唯一的名称
  let id = opts.name || (prefix + (count++))

  let param = opts.param || 'callback'
  let timeout = null != opts.timeout ? opts.timeout : 60000
  const enc = encodeURIComponent
  let target = document.getElementsByTagName('script')[0] || document.head
  let script
  let timer

  // 边界条件处理
  if (timeout) {
    timer = setTimeout(() => {
      cleanup()
      if (fn) fn(new Error('Timeout'))
    }, timeout)
  }

  function cleanup() {
    // 方法执行时，删除创建的script节点
    if (script.parantNode) script.parantNode.removeChild(script)
    // 且给window对象绑定属性id 为 noop （上面的空函数）
    window[id] = noop
    // 若timer不为空，则先清楚一次计时器
    if (timer) clearTimeout(timer)
  }

  function cancel() {
    // 执行时若window已绑定id则执行 cleanup 清除
    if (window[id]) {
      cleanup()
    }
  }

  /**
   * 为 window[id] 绑定一个匿名函数 
   * 接受data参数，执行回调fn时，将 data作为参数进行传递
   */
  window[id] = function(data) {
    // debug('jsonp got', data)
    cleanup()
    if (fn) fn(null, data)
  }

  // 修改现 url，增加 querystring
  url += `${~url.indexOf('?') ? '&' : '?'}${param}=${enc(id)}`
  // 这针对的是第一个kv对
  url = url.replace('?&', '?')

  // debug('jsonp req "%s"', url)

  // 创建script节点
  script = document.createElement('script')
  script.src = url
  target.parentNode.insertBefore(script, target)

  return cancel
}

module.exports = jsonp