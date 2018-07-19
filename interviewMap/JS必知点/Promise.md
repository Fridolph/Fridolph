Promise实现

Promise是es6新增语法，解决了回调地域问题

可以把Promise看作一个状态机，初始状态是pending，可以通过resolve,reject将状态转变为 resolved 或 rejected，状态一旦改变就不会再变化

then函数会返回一个Promise实例，并且该返回值是一个新实例，因为Promise规定除了pending状态，其他状态是不可改变的，如果返回相同实例的话，多个then调用就失去意义了

对于then来说，本质上可以把它看成了flatMap

```js
// 三种状态
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
// promise接受一个函数参数，该函数会自动执行
function MyPromise(fn) {
  let _this = this
  _this.currentState = PENDING
  _this.value = undefined
  // 用户保存then中的回调，只有当promise状态为pending才会缓存，并且每个实例至多缓存一个
  _this.resolvedCallbacks = []
  _this.rejectedCallbacks = []

  _this.resolve = function(value) {
    if (value instanceof MyPromise) {
      // 如果value是个Promise,递归执行
      return value.then(_this.resolve, _this.reject)
    }
    setTimeout(() => {
      // 异步执行，保证执行顺序
      if (_this.currentState === PENDING) {
        _this.currentState = RESOLVED
        _this.value = value
        _this.resolvedCallbacks.forEach(cb => cb())
      }
    })
  }

  _this.reject = function(reason) {
    setTimeout(() =>{
      if (_this.currentState === PENDING) {
        _this.currentState = REJECTED
        _this.value = reason
        _this.rejectedCallbacks.forEach(cb => cb())
      }
    })
  }
  // 用于解决以下问题
  // new Promise(() => throw Error('error'))
  try {
    fn(_this.resolve, _this.reject)
  } catch (e) {
    _this.reject(e)
  }
}

MyPromise.prototype.then = function(onResolved, onRejected) {
  var self = this
  // 规范2.2.7 then必须返回一个新的promise
  var promise2
  // 规范2.2 onResolved和onRejected都为可选参数
  // 如果类型不是函数需要忽略，同时也实现透传
  // Promise.resolve(4).then().then(value => console.log(value))
  onResolved = typeof onResolved === 'function' ? onResolved : v => v
  onRejected = typeof onRejected === 'function' ? onRejected : v => throw v

  if (self.currentState === RESOLVED) {
    return (promise2 = new MyPromise(function(resolve, reject) {
      // 规范2.2.4 保证onFullfilled, onRejected异步执行
      // 所以用了setTimeout包裹下
      setTimeout(function() {
        try {
          var x = onResolved(self.value)
          resolutionProcedure(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    }))
  }

  if (self.currentState === REJECTED) {
    return (promise2 = new MyPromise(function(resolve, reject) {
      setTimeout(function() {
        // 异步执行onRejected
        try {
          var x = onRejected(self.value)
          resolutionProcedure(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    }))
  }

  if (self.currentState === PENDING) {
    return (promise2 = new MyPromise(function (resolve, reject) {
      self.resolvedCallbacks.push(function () {
        // 考虑到可能会有报错，所以使用 try/catch 包裹
        try {
          var x = onResolved(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });

      self.rejectedCallbacks.push(function () {
        try {
          var x = onRejected(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      })
    }))
  }
}
// 规范 2.3
function resolutionProcedure(promise2, x, resolve, reject) {
  // 规范 2.3.1，x 不能和 promise2 相同，避免循环引用
  if (promise2 === x) {
    return reject(new TypeError("Error"));
  }
  // 规范 2.3.2
  // 如果 x 为 Promise，状态为 pending 需要继续等待否则执行
  if (x instanceof MyPromise) {
    if (x.currentState === PENDING) {
      x.then(function (value) {
        // 再次调用该函数是为了确认 x resolve 的
        // 参数是什么类型，如果是基本类型就再次 resolve
        // 把值传给下个 then
        resolutionProcedure(promise2, value, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
    return;
  }
  // 规范 2.3.3.3.3
  // reject 或者 resolve 其中一个执行过得话，忽略其他的
  let called = false;
  // 规范 2.3.3，判断 x 是否为对象或者函数
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // 规范 2.3.3.2，如果不能取出 then，就 reject
    try {
      // 规范 2.3.3.1
      let then = x.then;
      // 如果 then 是函数，调用 x.then
      if (typeof then === "function") {
        // 规范 2.3.3.3
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            // 规范 2.3.3.3.1
            resolutionProcedure(promise2, y, resolve, reject);
          },
          e => {
            if (called) return;
            called = true;
            reject(e);
          }
        );
      } else {
        // 规范 2.3.3.4
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 规范 2.3.4，x 为基本类型
    resolve(x);
  }
}
```
