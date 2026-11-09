# Promise

## 实现一个功能完整的简易 Promise

需求：

1. 满足 promise 规范，和原生一样的使用方式
2. 支持 .then()
3. 支持链式调用

::: code-group

```js [myPromise.js]
// Promise的状态 只能由
// pending -> fulfilled
// pending -> rejected 且状态不可逆
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  state = PENDING
  value = undefined
  reason = undefined
  // pending -> 存成功的回调
  resolveFnArr = []
  // pending -> 存失败的回调
  rejectFnArr = []

  // new MyPromise 会初始化下面代码
  constructor(fn) {
    const resolveHandler = () => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value
        this.resolveFnArr.forEach(fn => fn(this.value))
      }
    }
    const rejectHandler = () => {
      if ((this.state = PENDING)) {
        this.state = REJECTED
        this.reason = reason
        this.rejectFnArr.forEach(fn => fn(this.value))
      }
    }

    try {
      fn(resolveHandler, rejectHandler)
    } catch (error) {
      rejectHandler(error)
    }
  }

  then(resolve, reject) {
    resolve = typeof fn1 == 'function' ? fn1 : v => v
    reject = typeof fn2 == 'function' ? fn2 : e => e

    if (this.state === PENDING) {
      const p = new MyPromise((resolveFn, rejectFn) => {
        this.resolveFnArr.push(() => {
          try {
            const newVal = resolve(this.value)
            resolveFn(newVal)
          } catch (err) {
            reject(err)
          }
        })
        this.rejectFnArr.push(() => {
          try {
            const newReason = reject(this.reason)
            rejectFn(newReason)
          } catch (err) {
            rejectFn(err)
          }
        })
      })
      return p
    }
    if (this.state === FULFILLED) {
      const p = new MyPromise((resolveFn, rejectFn) => {
        try {
          const newVal = resolve(this.value)
          resolveFn(newVal)
        } catch (err) {
          rerejectFn(err)
        }
      })
      return p
    }
    if (this.state === REJECTED) {
      const p = new MyPromise((resolveFn, rejectFn) => {
        try {
          const newReason = reject(this.reason)
          rejectFn(newReason)
        } catch (err) {
          rejectFn(newReason)
        }
      })
      return p
    }
  }

  catch(rejectFn) {
    return this.then(null, rejectFn)
  }
}
```

:::

## Promise 主要方法实现

### catch

catch 方法是对 then 方法的封装，只用于接收 reject(reason) 中的错误信息。因为在 then 方法中 onRejected 参数是可不传的，不传的情况下，错误信息会依次往后传递，直到有 onRejected 函数接收为止，因此在写 promise 链式调用的时候，then 方法不传 onRejected 函数，只需要在最末尾加一个 catch()就可以了，这样在该链条中的 promise 发生的错误都会被最后的 catch 捕获到。

```js
catch(rejectFn) {
  return this.then(null, rejectFn)
}
```

### done 方法

catch 在 promise 链式调用的末尾调用，用于捕获链条中的错误信息，但是 catch 方法内部也可能出现错误，所以有些 promise 实现中增加了一个方法 done。

done 相当于提供了一个不会出错的 catch 方法，并且不再返回一个 promise，一般用来结束一个 promise 链。

```js
done() {
  this.catch(reason => {
    console.log("🚀 ~ done ~ done:", reason)
    throw reason
  })
}
```

### finally

finally 用于在 promise 链式调用中，无论成功或者失败，都会执行 finally 方法中的代码。

```js
finally(fn) {
  return this.then(
    value => {
      fn()
      return value
    },
    reason => {
      fn()
      throw reason
    }
  )
}
```

### Promise.resolve

Promise.resolve 用来生成一个 rejected 完成态的 promise。

MyPromise.resolve 本质是一个语法糖

```js
MyPromise.resolve = function (value) {
  return new MyPromise((resolve, reject) => resolve(value))
}
```

下面是 es6 class 的实现

```js
class MyPromise {
  // ... 省略
  static resolve(value) {
    let promise
    promise = new Promise((resolve, reject) => {
      this.resolvePromise(promise, value, resolve, reject)
    })
    return promise
  }
}
```

### Promise.reject

Promise.reject 用来生成一个 rejected 失败态的 promise。

MyPromise.reject 本质就是一个语法糖

```js
MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => reject(reason))
}
```

下面是 es6 class 的实现

```js
class MyPromise {
  // ... 省略
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }
}
```

## Promise 重要方法实现

### Promise.all

Promise.all 方法接收一个 promise 数组，返回一个新 promise2，并发执行数组中的全部 promise，所有 promise 状态都为 resolved 时，promise2 状态为 resolved 并返回全部 promise 结果，结果顺序和 promise 数组顺序一致。如果有一个 promise 为 rejected 状态，则整个 promise2 进入 rejected 状态。

```js
MyPromise.all = function (arr = []) {
  const promise = new MyPromise((resolve, reject) => {
    // 存 promise (arr) 所有的结果
    const ret = []
    const len = arr.length
    let count = 0
    arr.forEach(p => {
      p.then(data => {
        ret.push(data)
        count++
        if (count === len) {
          // 已遍历到最后一个promise
          resolve(ret)
        }
      }).catch(err => {
        reject(err)
      })
    })
  })
  return promise
}
```

ES6 Class 的实现

```js
class MyPromise {
  // 省略
  static all(promiseList) {
    return new Promise((resolve, reject) => {
      const result = []
      let i = 0
      for (const p of promiseList) {
        p.then(value => {
          result[i] = value
          if (result.length === promiseList.length) {
            resolve(result)
          }
        }, reject)
        i++
      }
    })
  }
}
```

### Promise.race

Promise.race 方法接收一个 promise 数组, 返回一个新 promise2，顺序执行数组中的 promise，有一个 promise 状态确定，promise2 状态即确定，并且同这个 promise 的状态一致。

```js
MyPromise.race = function (arr = []) {
  // 创建一个标记，用于表示是否有resolve
  let flag = false
  const promise = new MyPromise((resolve, reject) => {
    arr.forEach(p => {
      p.then(data => {
        if (!flag) {
          resolve(data)
          flag = true
        }
      }).catch(err => {
        reject(err)
      })
    })
  })
  return promise
}
```

ES6 Class 的实现

```js
class MyPromise {
  // 省略
  static race(promiseList) {
    return new Promise((resolve, reject) => {
      for (const promise of promiseList) {
        promise.then(value => {
          resolve(value)
        }, reject)
      }
    })
  }
}
```

## 其他版本

这个 Promise 的实现不考虑任何异常情况，只考虑代码最简短，从而便于读者理解核心的异步链式调用原理。

```js
function MyPromise(fn) {
  this.cbs = []

  const resolve = value => {
    setTimeout(() => {
      this.data = value
      this.cbs.forEach(cb => cb(value))
    })
  }

  fn(resolve.bind(this))
}

MyPromise.prototype.then = function (onResolved) {
  return new MyPromise(resolve => {
    this.cbs.push(() => {
      const res = onResolved(this.data)
      if (res instanceof MyPromise) {
        res.then(resolve)
      } else {
        resolve(res)
      }
    })
  })
}
```

[手写 Promise 最简 20 行版本，实现异步链式调用。（重构版）](https://mp.weixin.qq.com/s?__biz=MzI3NTM5NDgzOA==&mid=2247484547&idx=1&sn=a65fc242a920ab0125f3b875d282f614&chksm=eb043cfadc73b5ec84954dcbdeff95e0d538f1ea2d796d1832a3dfb0b67be5e1e93bd42eb610&scene=178&cur_album_id=1692321392169402371#rd)
