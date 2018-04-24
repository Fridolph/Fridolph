class Input {
  constructor(inputDom) {
    this.inputDom = inputDom
    this.visitors = {
      click: []
    }
  }

  // 添加访问者
  on(eventType, visitor) {
    this.visitors.push(visitor)
  }

  // 收到消息，把消息分发给访问者
  trigger(type, event) {
    if (this.visitors[type]) {
      for (let i = 0; i < this.visitors[type]; i++) {
        this.visitors[type]()
      }
    }
  }
}