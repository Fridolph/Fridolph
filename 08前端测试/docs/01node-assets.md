## Node - assets 断言

assets模块提供了断言测试函数，用于测试不变式。有 strict 与 legacy 两种模式，建议只使用 strict 模式。

[查看MDN的等式比较指南](http://nodejs.cn/s/FB6EHp)

`assert(value, [, message])` 是 `assert.ok()` 的别名

### assert.deepStrictEqual(actual, expected[, message])

`actual <any>`
`expected <any>`
`message <string> | <Error>`

测试 actual 参数与 expected 参数是否深度相等。 深度相等意味着子对象中可枚举的自身属性也会按以下规则递归地比较。

```js
const assert = require('assert')
assert.deepStrictEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5])
```

**比较的详细说明**

* 原始值运用SameValue比较法进行比较 使用Object.is()函数
* 对象的类型标签应该相同
* 对象的原型使用全等运算符比较
* 只比较可枚举自身的属性
* Error的名称与信息也会比较，即使不是可枚举的属性
* 可枚举的自身Symbol属性也会比较
* 对象封装器会同时比较对象与解封装后的值
* Object属性的比较是无序的
* Map键名与Set子项的比较是无序的
* 当两边的值不相同或遇到循环引用时，递归会停止
* WeakMap与WeakSet的比较不依赖于它们的值

```js
// 默认就是strict模式了，现在不用写声明了
const assert = require('assert')
// 断言失败
// AssertionError [ERR_ASSERTION]: { a: 1 } deepStrictEqual { a: '1' }
assert.deepStrictEqual({a: 1}, {a: '1'})

// 以下对象没有自身属性
const date = new Date()
const object = {}
const fakeDate = {}
Object.setPrototypeOf(fakeDate, Date.prototype)

// 原型不同
// AssertionError [ERR_ASSERTION]: {} deepStrictEqual Date {}
assert.deepStrictEqual(object, fakeDate)

// 类型标签不同
// AssertionError [ERR_ASSERTION]: 2018-05-25T01:55:05.717Z deepStrictEqual Date {}
assert.deepStrictEqual(date, fakeDate)

// 使用的是SameValue比较法
// AssertionError [ERR_ASSERTION]: NaN deepStrictEqual NaN
assert.deepStrictEqual(NaN, NaN)

// 解封装后的数值不同
// AssertionError [ERR_ASSERTION]: [Number: 1] deepStrictEqual [Number: 2]
assert.deepStrictEqual(new Number(1), new Number(2))

// 通过，因为对象与解封装后的字符串都完全相同
assert.deepStrictEqual(new String('foo'), Object('foo'))

// 通过
assert.deepStrictEqual(-0, -0)

// 通过，两边对象的symbol相同
const symbol1 = Symbol()
const symbol2 = Symbol()
assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol1]: 1 })
assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol2]: 1 })

const weakMap1 = new WeakMap()
const weakMap2 = new WeakMap([[{}, {}]])
const weakMap3 = new WeakMap()
weakMap3.unequal = true
// 通过
assert.deepStrictEqual(weakMap1, weakMap2)

// 失败 因为 weakMap3 有一个 weakMap1 没有的属性
// AssertionError [ERR_ASSERTION]: WeakMap {} deepStrictEqual WeakMap { unequal: true }
assert.deepStrictEqual(weakMap1, weakMap3)
```

### assert.ok(value[, message])

`value <any>`

`message <string> | <Error>`

测试 value 是否为真值。相当于 assert.equal(!!value, true, message)。

如果 value 不为真值，则抛出一个带有 message 属性的 AssertionError，其中 message 属性的值等于传入的 message 参数的值。 如果 message 参数为 undefined，则赋予默认的错误信息。 如果 message 参数是 Error 的实例，则会抛出它而不是 AssertionError。 如果没有传入参数，则 message 会被设为字符串 'No value argument passed to `assert.ok()`'。

```js

```
