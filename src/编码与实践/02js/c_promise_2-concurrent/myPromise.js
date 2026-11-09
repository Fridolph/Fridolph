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
    const resolveHandler = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value
        this.resolveFnArr.forEach(fn => fn(this.value))
      }
    }
    const rejectHandler = (reason) => {
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
    resolve = typeof resolve == 'function' ? resolve : v => v
    reject = typeof reject == 'function' ? reject : e => e

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
          rejectFn(err)
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

MyPromise.resolve = function(value) {
  return new MyPromise((resolve, reject) => resolve(value))
}

MyPromise.reject = function(reason) {
  return new MyPromise((resolve, reject) => reject(reason))
}

MyPromise.all = function(arr = []) {
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

MyPromise.race = function(arr = []) {
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

let p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(999)
  }, 999)
})
let p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1500)
  }, 1500)
})

let p3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(200)
  }, 200)
})

MyPromise.race([
  p1,
  p2,
  p3
]).then(data => {
  console.log(data)
})