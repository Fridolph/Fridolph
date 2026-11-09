# Promise 设计思想

## Q / Promise

> 原文翻译 <https://github.com/kriskowal/q/blob/master/design/README.md>
> 再读一遍加深理解，推荐阅读原文

**本文旨在解释 Promise 如何工作**，以及为什么这种实现方式有其特别之处，方法是通过逐步构建一个 Promise 库，并审查其所有主要的设计决策。这样做的目的是为了让读者能够根据自己的需求自由地试验这种实现的不同变体，同时又不会遗漏任何重要的细节。

假设您正在编写一个不能立即返回值的函数。最显而易见的 API 设计是将最终的值作为参数转发给一个回调函数，而不是返回该值。

```js
var oneOneSecondLater = function (callback) {
  setTimeout(function () {
    callback(1)
  }, 1000)
}
```

这是一个针对简单问题的非常简单的解决方案，但它有很大的改进空间。

一个更通用的解决方案将提供对`返回值`和`抛出异常`均适用的类似工具。扩展回调模式以处理异常有几种显而易见的方法。一种是同时提供`一个回调`和`一个错误回调`。

```js
var maybeOneOneSecondLater = function (callback, errback) {
  setTimeout(function () {
    if (Math.random() < 0.5) {
      callback(1)
    } else {
      errback(new Error("Can't provide one."))
    }
  }, 1000)
}
```

还有其他的方法，比如通过位置或一个特定的 guard 值将错误作为参数传递给回调函数。然而，这些方法实际上并没有模拟抛出的异常。异常和 `try/catch` 块的目的是推迟异常的显式处理，直到程序返回到一个合适的恢复尝试点。如果没有处理，需要一种机制来隐式地传播异常。

## Promises

考虑一种更通用的方法：函数不返回具体值也不抛出异常，而是返回一个对象，该对象代表了函数的`最终结果`；**无论是成功还是失败**。

这个对象本质上和名字上都是一个承诺（promise），承诺最终会得到解决。我们可以在这个承诺上调用一个函数来观察其履行或拒绝。如果承诺被拒绝且拒绝没有被明确观察到，所有衍生的承诺都会因为相同的原因隐式地被拒绝。

在这个特定迭代的设计中，我们将把一个承诺建模为一个带有注册回调的“then”函数的对象。

```js
var maybeOneOneSecondLater = function () {
  var callback
  setTimeout(function () {
    callback(1)
  }, 1000)
  return {
    then: function (_callback) {
      callback = _callback
    },
  }
}

maybeOneOneSecondLater().then(callback)
```

这个设计有两个缺点：

- `then` 方法的最后一个调用者决定了将要使用的回调。如果每个注册的回调都被通知解决，会更有用
- 如果在构造承诺一秒钟后注册回调，它将不会被调用

更通用的解决方案将接受任意数量的回调，并允许在超时发生前或发生后进行注册，或者通常是在解决事件发生后注册。我们通过使承诺成为一个双状态对象来实现这一点。

承诺最初是未解决的，所有回调都被加入到一个`待定观察者的数组`中。当承诺解决时，所有的观察者都会被通知。承诺一旦被解决，新的`回调将立即被调用`。我们可以通过待定回调的数组是否还存在来`区分状态变化`，并在解决后抛弃它们。

```js
var maybeOneOneSecondLater = function () {
  var pending = [],
    value
  setTimeout(function () {
    value = 1
    for (var i = 0, ii = pending.length; i < ii; i++) {
      var callback = pending[i]
      callback(value)
    }
    pending = undefined
  }, 1000)
  return {
    then: function (callback) {
      if (pending) {
        pending.push(callback)
      } else {
        callback(value)
      }
    },
  }
}
```

我们已经做得足够多，将其拆分为一个实用工具函数是有益的。所谓延迟对象(`deferred`)，它是一个带有两个部分的对象：一个用于`注册观察者`，另一个用于`通知观察者`解决方案。

```js
var defer = function () {
  var pending = [],
    value
  return {
    resolve: function (_value) {
      value = _value
      for (var i = 0, ii = pending.length; i < ii; i++) {
        var callback = pending[i]
        callback(value)
      }
      pending = undefined
    },
    then: function (callback) {
      if (pending) {
        pending.push(callback)
      } else {
        callback(value)
      }
    },
  }
}

var oneOneSecondLater = function () {
  var result = defer()
  setTimeout(function () {
    result.resolve(1)
  }, 1000)
  return result
}

oneOneSecondLater().then(callback)
```

现在，resolve 函数有一个缺陷：它可以被多次调用，修改承诺结果的值。这没有模拟到一个函数只返回一个值或抛出一个错误的事实。我们可以通过**只允许第一次调用 resolve**来设定结果，来防止意外或恶意的重置。

```js
var defer = function () {
  var pending = [],
    value
  return {
    resolve: function (_value) {
      if (pending) {
        // [!code ++]
        value = _value
        for (var i = 0, ii = pending.length; i < ii; i++) {
          var callback = pending[i]
          callback(value)
        }
        pending = undefined
      } else {
        // [!code ++]
        throw new Error('A promise can only be resolved once.') // [!code ++]
      } // [!code ++]
    },
    then: function (callback) {
      if (pending) {
        pending.push(callback)
      } else {
        callback(value)
      }
    },
  }
}
```

### 改良方案

此设计有几种不同的变体，它们源自两种不同的张力。第一种张力在于，将 deferred 的 promise 部分和 resolver 部分分开或合并都有其用处。此外，还有必要找到某种方法来区分 promise 和其他值。

::: warning 将 promise 部分与 resolver 分开

使我们能够遵循最小权限原则编码。授予某人一个 promise，应该仅提供观察结果的权限；而授予某人 resolver，则应该仅提供决定结果的权限。不应隐式地授予彼此权限。时间的检验表明，任何超出的权限最终都会被滥用，并且非常难以撤销。然而，分离的劣势在于，增加了垃圾回收器迅速处理已使用的 promise 对象的额外负担。
:::

::: tip 区分 promise 值
此外，区分 promise 和其他值的方法有多种。最明显也是最强的区分方式是使用原型继承。
:::

### design / q2.js

```js
var Promise = function () {}

var isPromise = function (value) {
  return value instanceof Promise
}

var defer = function () {
  var pending = [],
    value
  var promise = new Promise()
  promise.then = function (callback) {
    if (pending) {
      pending.push(callback)
    } else {
      callback(value)
    }
  }
  return {
    resolve: function (_value) {
      if (pending) {
        value = _value
        for (var i = 0, ii = pending.length; i < ii; i++) {
          var callback = pending[i]
          callback(value)
        }
        pending = undefined
      }
    },
    promise: promise,
  }
}
```

使用`原型继承`的一个`缺点`是在单个程序中**只能使用一个 Promise 库的实例**。这可能很难执行，导致依赖性强制问题。

另一种方法是使用鸭子类型（`duck-typing`），通过一个约定的命名方法来区分 Promise 和其他值。

在我们的例子中，CommonJS/Promises/A 规范确定了使用 "then" 方法来区分其 Promise 与其他值。

其缺点是无法区分那些恰巧也有 "then" 方法的其他对象。实际上，这并不构成问题，"可 then 化"（thenable）实现在实践中的细微变异是可管理的。

```js
var isPromise = function (value) {
  return value && typeof value.then === 'function'
}

var defer = function () {
  var pending = [],
    value
  return {
    resolve: function (_value) {
      if (pending) {
        value = _value
        for (var i = 0, ii = pending.length; i < ii; i++) {
          var callback = pending[i]
          callback(value)
        }
        pending = undefined
      }
    },
    promise: {
      then: function (callback) {
        if (pending) {
          pending.push(callback)
        } else {
          callback(value)
        }
      },
    },
  }
}
```

下一个重要步骤是使 Promise 的组合变得简单，利用从旧 Promise 获取的值来创建新的 Promise。

假设你从几个函数调用中收到了两个数的 Promise，我们希望能够为它们的和创建一个 Promise。考虑如何用回调函数实现这一点。

```js
var twoOneSecondLater = function (callback) {
  var a, b
  var consider = function () {
    if (a === undefined || b === undefined) return
    callback(a + b)
  }
  oneOneSecondLater(function (_a) {
    a = _a
    consider()
  })
  oneOneSecondLater(function (_b) {
    b = _b
    consider()
  })
}

twoOneSecondLater(function (c) {
  // c === 2
})
```

这种方法因为多个原因而脆弱，尤其是在这种情况下需求明确地通过一个哨兵值来注意回调函数是否已被调用。此外，还需特别注意在事件循环结束前就已经发出回调的情况：

> 考虑函数必须在使用之前出现

我们再进几步，就能通过使用 Promise 以更少的代码完成这个任务，同时隐式地处理错误传播。

```js
var a = oneOneSecondLater()
var b = oneOneSecondLater()
var c = a.then(function (a) {
  return b.then(function (b) {
    return a + b
  })
})
```

要使这工作，几件事情必须到位：

- then 方法必须返回一个 Promise。
- 返回的 Promise 必须最终以回调函数的返回值来解决。
- 回调函数的返回值必须是一个已经满足的值或一个 Promise。

将值转换为已经满足的 Promise 是直截了当的。这个 Promise 会立即通知所有观察者该值已被确认。

```js
var ref = function (value) {
  return {
    then: function (callback) {
      callback(value)
    },
  }
}
```

这个方法可以修改，以将参数强制转换为 Promise，不论它本身是值还是 Promise。

```js
var ref = function (value) {
  if (value && typeof value.then === 'function') return value
  return {
    then: function (callback) {
      callback(value)
    },
  }
}
```

现在，我们需要开始修改我们的"then"方法，使它们针对其给定回调的返回值返回 Promise。对于"ref"案例来说很简单。我们将回调的返回值强制为 Promise 并立即返回它。

```js
var ref = function (value) {
  if (value && typeof value.then === 'function') return value
  return {
    then: function (callback) {
      return ref(callback(value))
    },
  }
}
```

### design / q4.js

对于异步完成的 deferred 来说更复杂，因为回调会在将来的循环中被调用。在这种情况下，我们`递归`地调用 `defer` 并包装回调。回调返回的值将解决由"then"返回的 Promise。

此外，"resolve"方法需要处理解决本身是一个待定解决的 Promise 的情况。这是通过改变解决值为 Promise 来实现的。

也就是说，它实现了一个"then"方法，可以是由"defer"返回的 Promise，也可以是由"ref"返回的 Promise。如果它是一个"ref" Promise，其行为与之前相同：回调函数会立即由"then(callback)"调用。

如果它是一个"defer" Promise，则通过调用"then(callback)"将回调传递给下一个 Promise。因此，您的回调现在观察到一个新的 Promise 以获取更完全解决的值。可以`多次转发`回调，通过每次转发使得"进度"更接近最终解决。

```js
var defer = function () {
  var pending = [],
    value
  return {
    resolve: function (_value) {
      if (pending) {
        value = ref(_value) // values wrapped in a promise
        for (var i = 0, ii = pending.length; i < ii; i++) {
          var callback = pending[i]
          value.then(callback) // then called instead
        }
        pending = undefined
      }
    },
    promise: {
      then: function (_callback) {
        var result = defer()
        // wrap the callback so that its return
        // value is captured and used to resolve the promise
        // returned by "then"
        var callback = function (value) {
          result.resolve(_callback(value))
        }
        if (pending) {
          pending.push(callback)
        } else {
          value.then(callback)
        }
        return result.promise
      },
    },
  }
}
```

在目前这个阶段的实现中，使用了可"thenable"的 Promise，且将"promise"和"deferred"的"resolve"组件分离了出来。（参见设计/q4.js）

## Error Propagation

为了实现错误传播，我们需要重新引入错误回调（errback）。我们使用一种新类型的 Promise，类似于“ref” Promise，它不是通知回调 Promise 已实现，而是通知 errback 其被拒绝及拒绝原因。

```js
var reject = function (reason) {
  return {
    then: function (callback, errback) {
      return ref(errback(reason))
    },
  }
}
```

最简单的方法是观察立即拒绝的解决情况。

```js
reject('Meh.').then(
  function (value) {
    // we never get here
  },
  function (reason) {
    // reason === "Meh."
  }
)
```

现在，我们可以修改我们最初的错误回调使用案例，转而使用 Promise API。

```js
var maybeOneOneSecondLater = function (callback, errback) {
  var result = defer()
  setTimeout(function () {
    if (Math.random() < 0.5) {
      result.resolve(1)
    } else {
      result.resolve(reject("Can't provide one."))
    }
  }, 1000)
  return result.promise
}
```

为了使这个例子生效，延迟系统需要进行新的管道设置，以便可以同时转发回调和 errback 组件。因此，挂起回调的数组将被替换为“then”调用的参数数组。

```js
var defer = function () {
  var pending = [],
    value
  return {
    resolve: function (_value) {
      if (pending) {
        value = ref(_value)
        for (var i = 0, ii = pending.length; i < ii; i++) {
          // apply the pending arguments to "then"
          value.then.apply(value, pending[i])
        }
        pending = undefined
      }
    },
    promise: {
      then: function (_callback, _errback) {
        var result = defer()
        var callback = function (value) {
          result.resolve(_callback(value))
        }
        var errback = function (reason) {
          result.resolve(_errback(reason))
        }
        if (pending) {
          pending.push([callback, errback])
        } else {
          value.then(callback, errback)
        }
        return result.promise
      },
    },
  }
}
```

然而，这个“defer”版本存在一个微妙的问题。它要求在所有的“then”调用上都必须提供一个 errback，否则在试图调用一个不存在的函数时将引发异常。这个问题的最简单解决方案是提供一个默认的 errback 来转发拒绝。如果你只对观察拒绝感兴趣，那么省略回调也是合理的，因此我们提供了一个默认的回调来转发实现的值。

```js
var defer = function () {
  var pending = [],
    value
  return {
    resolve: function (_value) {
      if (pending) {
        value = ref(_value)
        for (var i = 0, ii = pending.length; i < ii; i++) {
          value.then.apply(value, pending[i])
        }
        pending = undefined
      }
    },
    promise: {
      then: function (_callback, _errback) {
        var result = defer()
        // provide default callbacks and errbacks
        _callback =
          _callback ||
          function (value) {
            // by default, forward fulfillment
            return value
          }
        _errback =
          _errback ||
          function (reason) {
            // by default, forward rejection
            return reject(reason)
          }
        var callback = function (value) {
          result.resolve(_callback(value))
        }
        var errback = function (reason) {
          result.resolve(_errback(reason))
        }
        if (pending) {
          pending.push([callback, errback])
        } else {
          value.then(callback, errback)
        }
        return result.promise
      },
    },
  }
}
```

到这一点，我们已经实现了组合和隐式错误传播。现在，我们可以非常容易地串行或并行地从其他 Promise 创建 Promise（请参见 design/q6.js）。这个例子创建了一个承诺，用于最终承诺值的总和。

```js
promises
  .reduce(function (accumulating, promise) {
    return accumulating.then(function (accumulated) {
      return promise.then(function (value) {
        return accumulated + value
      })
    })
  }, ref(0)) // start with a promise for zero, so we can call then on it
  // just like any of the combined promises
  .then(function (sum) {
    // the sum is here
  })
```

## Safety and Invariants

另一个渐进改进的方式是确保回调和错误回调在事件循环的未来轮次中按照它们注册的顺序被调用。这大大减少了异步编程固有的控制流危险数量。考虑一个简短而假设的例子：

```js
var blah = function () {
  var result = foob().then(function () {
    return barf()
  })
  var barf = function () {
    return 10
  }
  return result
}
```

### design/q7.js

这个函数将会抛出异常或者返回一个承诺，该承诺将很快被完成，并返回值为 10。这取决于 foob()是否在事件循环的同一轮中解决（立即在同一个栈上发出其回调）或在将来的轮次中解决。如果回调被延迟到将来的轮次，它将始终成功。（见 design/q7.js）

```js
var enqueue = function (callback) {
  //process.nextTick(callback); // NodeJS
  setTimeout(callback, 1) // Naïve browser solution
}

var defer = function () {
  var pending = [],
    value
  return {
    resolve: function (_value) {
      if (pending) {
        value = ref(_value)
        for (var i = 0, ii = pending.length; i < ii; i++) {
          // XXX
          enqueue(function () {
            value.then.apply(value, pending[i])
          })
        }
        pending = undefined
      }
    },
    promise: {
      then: function (_callback, _errback) {
        var result = defer()
        _callback =
          _callback ||
          function (value) {
            return value
          }
        _errback =
          _errback ||
          function (reason) {
            return reject(reason)
          }
        var callback = function (value) {
          result.resolve(_callback(value))
        }
        var errback = function (reason) {
          result.resolve(_errback(reason))
        }
        if (pending) {
          pending.push([callback, errback])
        } else {
          // XXX
          enqueue(function () {
            value.then(callback, errback)
          })
        }
        return result.promise
      },
    },
  }
}

var ref = function (value) {
  if (value && value.then) return value
  return {
    then: function (callback) {
      var result = defer()
      // XXX
      enqueue(function () {
        result.resolve(callback(value))
      })
      return result.promise
    },
  }
}

var reject = function (reason) {
  return {
    then: function (callback, errback) {
      var result = defer()
      // XXX
      enqueue(function () {
        result.resolve(errback(reason))
      })
      return result.promise
    },
  }
}
```

然而，仍存在一个安全问题。鉴于任何实现了“then”的对象都被视为承诺，任何直接调用“then”的人都有可能受到惊吓。

- 回调或错误回调可能在同一轮次中被调用
- 回调和错误回调可能都被调用
- 回调或错误回调可能被调用多次

“when”方法包装了一个承诺并防止了这些意外情况。

我们还可以利用这个机会包装回调和错误回调，以便任何抛出的异常都能被转换为拒绝。

```js
var when = function (value, _callback, _errback) {
  var result = defer()
  var done

  _callback =
    _callback ||
    function (value) {
      return value
    }
  _errback =
    _errback ||
    function (reason) {
      return reject(reason)
    }

  var callback = function (value) {
    try {
      return _callback(value)
    } catch (reason) {
      return reject(reason)
    }
  }
  var errback = function (reason) {
    try {
      return _errback(reason)
    } catch (reason) {
      return reject(reason)
    }
  }

  enqueue(function () {
    ref(value).then(
      function (value) {
        if (done) return
        done = true
        result.resolve(ref(value).then(callback, errback))
      },
      function (reason) {
        if (done) return
        done = true
        result.resolve(errback(reason))
      }
    )
  })

  return result.promise
}
```

到目前为止，我们有了手段来防范多种意外情况，包括事件过程中不必要的非确定性控制流，以及破坏的回调和错误回调控制流不变性。（见 design/q7.js）

## Message Passing

在我们迈出一步之后，承诺已成为接收“then”消息的对象。延迟承诺将这些消息转发给它们的解析承诺。实现的承诺通过使用已实现的值调用回调来响应 then 消息。被拒绝的承诺通过使用拒绝原因调用 errback 来响应 then 消息。

我们可以将承诺泛化为接收任意消息的对象，包括“then/when”消息。如果存在大量延迟以阻止立即观察承诺解析的情况，这将非常有用，比如承诺位于另一个进程、工作者或网络中的另一台计算机上。

如果我们必须等待消息在网络中完整往返一次以获取一个值，往返可能会增加很多时间将会被浪费。这相当于“啰嗦”的网络协议问题，这是 SOAP 和 RPC 的缺点。

然而，如果我们可以在远程承诺解析前发送消息给远程承诺，远程承诺可以快速连续发送响应。考虑一个对象存储在远程服务器上且无法自身通过网络发送的情况；它具有一些无法序列化的内部状态和能力，比如对数据库的访问。假设我们获取了这个对象的承诺，现在可以发送消息了。这些消息大部分可能是方法调用，比如“query”，这些方法在回应中很可能会再次发送承诺。

```js
promise.then(callback, errback)
promise.promiseSend('when', callback, errback)
```

我们必须基于一种新的方法来发送任意消息给承诺，建立一个新的承诺家族。通过 CommonJS/Promises/D 定义了"promiseSend"。发送“when”消息等同于调用“then”方法。

```js
function Promise() {}
Promise.prototype.then = function (callback, errback) {
  return when(this, callback, errback)
}
```

我们必须重新审视所有的方法，基于“promiseSend”构建它们而不是“then”。然而，我们并不完全放弃“then”；我们仍会内部通过“promiseSend”生成和使用“thenable”承诺，并通过“promiseSend”路由它们的消息。

如果一个承诺不认识一个消息类型（如“when”这样的“操作符”），它必须返回最终会被拒绝的承诺。

能够接收任意消息意味着我们也可以实现作为远程承诺代理的新类型的承诺，简单地将所有消息转发到远程承诺并将其所有响应转发回本地工作者承诺。

在关于代理的用例和拒绝未被认可的消息之间，有必要创建一个承诺抽象，将识别的消息路由到处理程序对象，并将无法识别的消息路由到回退方法。

```js
var makePromise = function (handler, fallback) {
  var promise = new Promise()
  handler = handler || {}
  fallback =
    fallback ||
    function (op) {
      return reject("Can't " + op)
    }
  promise.promiseSend = function (op, callback) {
    var args = Array.prototype.slice.call(arguments, 2)
    var result
    callback =
      callback ||
      function (value) {
        return value
      }
    if (handler[op]) {
      result = handler[op].apply(handler, args)
    } else {
      result = fallback.apply(handler, [op].concat(args))
    }
    return callback(result)
  }
  return promise
}
```

每个处理程序方法和回退方法都期望返回一个值，该值将被转发给回调。处理程序不接收它们自己的名称，但回退方法接收操作符名称以便进行路由。否则，`参数将被传递`。

对于“ref”方法，我们仍然只强制转换尚未是承诺的值。我们还将“thenable”转换为“promiseSend”承诺。我们提供了用于与实现值进行基本交互的方法，包括属性操作和方法调用。

```js
var ref = function (object) {
  if (object && typeof object.promiseSend !== 'undefined') {
    return object
  }
  if (object && typeof object.then !== 'undefined') {
    return makePromise(
      {
        when: function () {
          var result = defer()
          object.then(result.resolve, result.reject)
          return result
        },
      },
      function fallback(op) {
        return Q.when(object, function (object) {
          return Q.ref(object).promiseSend.apply(object, arguments)
        })
      }
    )
  }
  return makePromise({
    when: function () {
      return object
    },
    get: function (name) {
      return object[name]
    },
    put: function (name, value) {
      object[name] = value
    },
    del: function (name) {
      delete object[name]
    },
  })
}
```

被拒绝的承诺只是简单地转发它们的拒绝到任何消息。

```js
var reject = function (reason) {
  var forward = function (reason) {
    return reject(reason)
  }
  return makePromise(
    {
      when: function (errback) {
        errback = errback || forward
        return errback(reason)
      },
    },
    forward
  )
}
```

推迟承诺几乎没有受到损害。我们不再有一个要转发到“then”的参数数组，而是有一个要转发到“promiseSend”的参数数组。 "makePromise" 和 "when" 吸收了处理回调和 errback 参数默认值和包装的责任。

```js
var defer = function () {
  var pending = [],
    value
  return {
    resolve: function (_value) {
      if (pending) {
        value = ref(_value)
        for (var i = 0, ii = pending.length; i < ii; i++) {
          enqueue(function () {
            value.promiseSend.apply(value, pending[i])
          })
        }
        pending = undefined
      }
    },
    promise: {
      promiseSend: function () {
        var args = Array.prototype.slice.call(arguments)
        var result = defer()
        if (pending) {
          pending.push(args)
        } else {
          enqueue(function () {
            value.promiseSend.apply(value, args)
          })
        }
      },
    },
  }
}
```

最后一步是使发送消息给承诺在语法上更加方便。我们创建了“get”、“put”、“post”和“del”函数，它们发送相应的消息并返回结果的承诺。它们看起来都很相似。

```js
var get = function (object, name) {
  var result = defer()
  ref(object).promiseSend('get', result.resolve, name)
  return result.promise
}

get({ a: 10 }, 'a').then(function (ten) {
  // ten === ten
})
```

最近一次改进以使 Promise 达到最先进状态的是将所有回调函数的名称改为 "win"，将所有错误回调的名称改为 "fail"。我将这留作一项练习。

## Future

Andrew Sutherland 做了一项伟大的工作，创建了 Q 库的一种变体，支持注解，以便可以图形化地表示 Promise 生成、解析和依赖的瀑布。可选注解和 Q 库的调试变体将是一个合乎逻辑的下一步。

目前有一些关于如何理想地取消一个 Promise 的疑问。目前，需要使用辅助信道发送中止消息。这需要进一步的研究。

CommonJS/Promises/A 也支持进度通知回调。支持隐式组合和传播进度信息的库的变体将会非常棒。

一个常见的模式是远程对象有一组固定的方法，所有这些方法都返回 Promises。对于这些情况，常见的模式是创建一个本地对象，它是远程对象的代理，通过 "post" 将所有的方法调用转发到远程对象。这样的代理的构建可以自动化。懒加载数组无疑是一个使用案例。

## 总结

- 1
- 2
- 3
- 4

## 参考

- 翻译自<https://github.com/kriskowal/q/blob/master/design/README.md>
