# 队列 Queue

温故知新，可跳转概念与原理——[队列 Queue](../../../概念与原理/03algo/s_algo_2-queue.md)

## 队列的完整实现

::: details 队列实现参考代码
::: code-group

```js[function实现]
function Queue() {
  this._oldestIndex = 1
  this._newestIndex = 1
  this._storage = {}
}

Queue.prototype.getLength = function() {
  return this._newestIndex - this._oldestIndex
}

Queue.prototype.getData = function() {
  return this._storage
}

Queue.prototype.enqueue = function(data) {
  this._storage[this._newestIndex] = data
  this._newestIndex++
}

Queue.prototype.dequeue = function() {
  let oldestIndex = this._oldestIndex
  let newestIndex = this._newestIndex
  let deletedData = null

  if (oldestIndex !== newestIndex) {
    deletedData = this._storage[oldestIndex]
    delete this._storage[oldestIndex]
    this._oldestIndex++

    return deletedData
  }
}
```

```js[Class实现]
class Stack {
  constructor(size = 0, storage = {}) {
    this.size = size
    this.storage = storage
  }

  push(data) {
    let size = ++this.size
    this.storage[size] = data
  }

  pop() {
    let size = this.size
    let deletedData = null

    if (size) {
      deletedData = this.storage[size]
      delete this.storage[size]
      this.size--

      return deletedData
    }
  }
}

```

:::

## 参考

- [用 JavaScript 实现栈与队列](https://juejin.cn/post/6844903758887911431)
