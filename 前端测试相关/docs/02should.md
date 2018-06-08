`should` 是一个表达性的，可读的，框架无关的断言库。

这个 library 的主要目标是表达和有帮助。它使您的测试代码保持清洁，并且您的错误消息很有用。默认情况下（`require('should')`）应该用一个非可枚举的getter来扩展Object.prototype，这个getter允许你表达该对象应该如何表现。
如果需要，它也会自动返回。

也可以使用不带getter的should.js（它甚至不会尝试扩展Object.prototype），只需要 `require('should/as-function')`。
或者，如果您已经使用自动添加getter的版本，则可以调用.noConflict函数。

## 示例

```js
const should = require('should')
const user = {
  name: 'tj',
  pets: ['tobi', 'loki', 'jane', 'bandit']
}

user.should.have.property('name', 'tj')
user.should.have.property('pets').with.lengthOf(4)

// 如果该对象是使用Object.create创建的（null）
// 那么它不会继承`Object.prototype`，所以它不会有'.should` getter
// 你可以这样做：
should(user).have.property('name', 'tj')
// 你也可以用这种方式测试null
should(null).not.be.ok()

someAsyncTask(foo, function(err, result) {
  should.not.exist(err)
  should.exist(result)
  result.bar.should.equal(foo)
})
```

## 开始

1. 安装

    npm install should --save-dev

2. 引入

    const should = require('should')
    (5).should.be.exactly(5).and.be.a.Number()

## 断言链

每个断言都会返回一个should.js包装的对象，所以断言可以链式调用。
为了链式断言更清晰地阅读，您可以在链中的任何位置使用以下助手：.an，.of，.a，.and，.be，.have，.with，.is，.which。使用它们以获得更好的可读性; 他们什么都不做。

```js
user.should.be.an.instanceOf(object).and.have.property('name', 'tj')
user.pets.should.be.instanceOf(Array).and.have.lengthOf(4)
```

几乎所有的断言都返回相同的对象 - 所以你可以轻松地链式调用它们。
但是一些（例如：.length和.property）将断言对象移动到一个属性值，所以要小心。
