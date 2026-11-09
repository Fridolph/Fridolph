# Promise

自测 [学习自测 - Promise](../../学习自测/02js/q_es6_2-promise.md)

## 方法

### Promise.any()

Promise.any() 静态方法将一个 Promise 可迭代对象作为输入，并返回一个 Promise。当输入的任何一个 Promise 兑现时，这个返回的 Promise 将会兑现，并返回第一个兑现的值。当所有输入 Promise 都被拒绝（包括传递了空的可迭代对象）时，它会以一个包含拒绝原因数组的 AggregateError 拒绝。

### Promise.all()

Promise.all() 静态方法接受一个 Promise 可迭代对象作为输入，并返回一个 Promise。当所有输入的 Promise 都被兑现时，返回的 Promise 也将被兑现（即使传入的是一个空的可迭代对象），并返回一个包含所有兑现值的数组。如果输入的任何 Promise 被拒绝，则返回的 Promise 将被拒绝，并带有第一个被拒绝的原因。

### Promise.allSettled()

Promise.allSettled() 方法是 `promise 并发`方法之一

Promise.allSettled() 静态方法将一个 Promise 可迭代对象作为输入，并返回一个单独的 Promise。当所有输入的 Promise 都已敲定时（包括传入空的可迭代对象时），返回的 Promise 将被兑现，并带有描述每个 Promise 结果的对象数组。

### Promise.catch()

Promise 实例的 catch() 方法用于注册一个在 promise 被拒绝时调用的函数。它会立即返回一个等效的 Promise 对象，这可以允许你链式调用其他 promise 的方法。此方法是 Promise.prototype.then(undefined, onRejected) 的一种简写形式。

### Promise.finally()

Promise 实例的 finally() 方法用于注册一个在 promise 敲定（兑现或拒绝）时调用的函数。它会立即返回一个等效的 Promise 对象，这可以允许你链式调用其他 promise 方法。

这可以让你避免在 promise 的 then() 和 catch() 处理器中重复编码与实践。

### Promise.race()

Promise.race() 静态方法接受一个 promise 可迭代对象作为输入，并返回一个 Promise。这个返回的 promise 会随着第一个 promise 的敲定而敲定。

### Promise.reject()

Promise.reject() 静态方法返回一个已拒绝（rejected）的 Promise 对象，拒绝原因为给定的参数。

### Promise.resolve()

Promise.resolve() 静态方法将给定的值转换为一个 Promise。如果该值本身就是一个 Promise，那么该 Promise 将被返回；如果该值是一个 thenable 对象，Promise.resolve() 将调用其 then() 方法及其两个回调函数；否则，返回的 Promise 将会以该值兑现。

### Promise.prototype.then()

Promise 实例的 then() 方法最多接受两个参数：用于 Promise 兑现和拒绝情况的回调函数。它立即返回一个等效的 Promise 对象，允许你链接到其他 Promise 方法，从而实现链式调用。

### Promise.withResolvers()

Promise.withResolvers() 静态方法返回一个对象，其包含一个新的 Promise 对象和两个函数，用于解决或拒绝它，对应于传入给 Promise() 构造函数执行器的两个参数。

Promise.withResolvers() 完全等同于以下代码：

```js
let resolve, reject
const promise = new Promise((res, rej) => {
  resolve = res
  reject = rej
})
```

只是它更简洁，并且不需要使用 let。

- 使用 Promise.withResolvers() 关键的区别在于解决和拒绝函数现在与 Promise 本身处于同一作用域，而不是在执行器中被创建和一次性使用。这可能使得一些更高级的用例成为可能，例如在重复事件中重用它们，特别是在处理流和队列时。这通常也意味着相比在执行器内包装大量逻辑，嵌套会更少。

- Promise.withResolvers() 是通用的且支持子类化，这意味着它可以在 Promise 的子类上调用，结果将包含一个该子类类型的 promise。要做到这一点，子类的构造函数必须实现与 Promise() 构造函数相同的签名——接受一个单独的 executor 函数，该函数可以用 resolve 和 reject 回调作为参数来调用。

## 参考

- [MDN - Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

