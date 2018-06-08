class PubSub {
  constructor() {
    this.topics = {}
    this.subUid = -1
  }

  publish = (topic, args) => {
    if (!this.topics[topic]) return false
    let subscriber = this.topics[topic]
    let len = subscriber ? subscriber.length : 0

    while (len--) {
      subscriber[len].func(topic, args)
    }
    return this
  }

  subscribe = (topic, func) => {
    if (!this.topics[topic]) {
      this.topics[topic] = []
    }
    let token = (++this.subUid).toString()
    this.topics[topic].push({
      token,
      func
    })
    return token
  }

  unsubscribe = token => {
    for (let m in this.topics) {
      if (this.topics[m]) {
        for (let i = 0, len = this.topics[m].length; i < len; i++) {
          if (this.topics[m][i].token === token) {
            this.topics[m].splice(i, 1)
            return token
          }
        }
      }
    }
    return this
  }
}
