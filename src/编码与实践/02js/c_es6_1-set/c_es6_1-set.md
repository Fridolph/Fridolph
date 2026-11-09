# Set

## Set 功能实现

::: code-group

```js [ES5 function实现]
function Set(arr = []) {
  let items = {}
  this.size = 0
  // has方法
  this.has = function (value) {
    return items.hasOwnProperty(value)
  }
  // add方法
  this.add = function (value) {
    // 若不存在 items 里面就直接写入
    if (!this.has(value)) {
      items[value] = value
      this.size++
      return true
    }
    return false
  }
  arr.forEach((value, i) => {
    this.add(value)
  })
  // delete方法
  this.delete = function (value) {
    // 若存在 items 里面就直接删除
    if (this.has(value)) {
      delete items[value]
      this.size--
      return true
    }
    return false
  }
  // clear方法
  this.clear = function () {
    items = {}
    this.size = 0
  }
  // keys 方法
  this.keys = function () {
    return Object.keys(items)
  }
  // values 方法
  this.values = function () {
    return Object.values(items)
  }
  // entries 方法
  this.entries = function () {
    return Object.entries(items)
  }
  // forEach 方法
  this.forEach = function (fn, context = this) {
    for (let i = 0; i < this.size; i++) {
      let item = Object.keys(items)[i]
      fn.call(context, items[item], item, this)
    }
  }
}
```

## 扩展实现

```js
function Set(arr = []) {
  // 之前代码省略

  // 并集
  this.union = function (other) {
    let union = new Set()
    let values = this.values()

    for (let i = 0; i < values.length; i++) {
      union.add(values[i])
    }
    values = other.values() // 将values重新赋值为新的集合
    for (let i = 0; i < values.length; i++) {
      union.add(values[i])
    }

    return union
  }
  // 交集
  this.intersect = function (other) {
    let intersect = new Set()
    let values = this.values()
    for (let i = 0; i < values.length; i++) {
      if (other.has(values[i])) {
        intersect.add(values[i])
      }
    }
    return intersect
  }
  // 差集
  this.difference = function (other) {
    let difference = new Set()
    let values = this.values()
    for (let i = 0; i < values.length; i++) {
      if (!other.has(values[i])) {
        difference.add(values[i])
      }
    }
    return difference
  }
  // 子集
  this.subset = function (other) {
    if (this.size > other.size) {
      return false
    } else {
      let values = this.values()
      for (let i = 0; i < values.length; i++) {
        console.log(values[i])
        console.log(other.values())
        if (!other.has(values[i])) {
          return false
        }
      }
      return true
    }
  }
}
```
