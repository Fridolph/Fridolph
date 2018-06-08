// 观察者
class ObserverList {
  constructor() {
    this.observerList = []
  }

  add = obj => {
    return this.observerList.push(obj)
  }

  count = () => {
    return this.observerList.length
  }

  get = idx => {
    if (idx > -1 && idx < this.observerList.length) {
      return this.observerList[idx]
    }
  }

  indexOf = (obj, startIdx) => {
    let i = startIdx
    let len = this.observerList.length
    while(i < len) {
      if (this.observerList[i] === obj) return i
      i++
    }
    return -1
  }

  removeAt = idx => {
    this.observerList.splice(idx, 1)
  }
}

// 目标
class Subject {
  constructor() {
    this.observers = new ObserverList()
  }

  addObserver = observer => {
    this.observers.add(observer)
  }

  removeObserver = observer => {
    this.observers.removeAt(this.observers.indexOf(observer))
  }

  notify = context => {
    let observerCount = this.observers.count()
    for (let i = 0; i < observerCount; i++) {
      this.observers.get(i).update(context)
    }
  }
}

// 观察者
class Observer {
  update = () => {
    // ...
  }
}
