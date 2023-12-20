var pubsub = []

(function(myObj) {
  // 存储那些可以广播或者监听的主题
  var topics = {}
  // 一个主题标识
  var subUid = -1
  // 发布或广播感兴趣的事件, 具有特定的主题名称和参数, 例如要传递的数据
  myObj.publish = function(topic, args) {
    if (!topics[topic]) return false
    var subscribers = topics[topic]
    var len = subscribers ? subscribers.length : 0

    while (len--) {
      subscribers[len].func(topic, args)
    }
    return this
  }

  // 订阅感兴趣的活动 使用特定的主题名称和回调函数，
  // 执行观察主题 /事件
  myObj.subscribe = function(topic, func) {
    if (!topics[topic]) {
      topics[topic] = []
    }
    var token = (++subUid).toString()
    topics[topic].push({
      token: token,
      func: func
    })
    return token
  }

  // 取消订阅特定的主题，基于标记化引用 / 订阅
  myObj.unsubscribe = function(token) {
    for (var m in topics) {
      if (topics[m]) {
        for (var i = 0, len = topics[m].length; i < len; i++) {
          if (topics[m][i].token === token) {
            topics[m].splice(i, 1)
            return token
          }
        }
      }
    }
    return this
  }
})(pubsub)
