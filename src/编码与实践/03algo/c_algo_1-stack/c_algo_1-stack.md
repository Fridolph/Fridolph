# 栈 Stack

温故知新，可跳转[直接概念 - 栈 Stack](../../../概念与原理/03algo/s_algo_1-stack.md)

## 栈的实现

::: details 参考代码
::: code-group

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

```js[function实现]
function Stack() {
  this._size = 0
  this._storage = {}
}

Stack.prototype.push = function(data) {
  let size = ++this._size
  this._storage[size] = data
};

Stack.prototype.pop = function() {
  let size = this._size
  let deletedData = null

  if (size) {
      deletedData = this._storage[size]

      delete this._storage[size]
      this._size--

      return deletedData
  }
}

```

:::

## 参考

- [用 JavaScript 实现栈与队列](https://juejin.cn/post/6844903758887911431)
