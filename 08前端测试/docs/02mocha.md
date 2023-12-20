参考文章

* [mocha中文文档](https://segmentfault.com/a/1190000011362879)
* [mocha总结文档](https://cnodejs.org/topic/59e3873520a1a3647d72ac39)
* [总结文档DEMO地址](https://github.com/TimLiu1/study-mocha.git)

---

## 安装

全局安装 npm i mocha -g

npm i mocha --save-dev


```js
// 新建 calcu.js
function add(a, b) {
  return a + b
}
module.exports = { add }
```

```js
// calcu.test.js
const {add} = require('../calcu')
const should = require('should')

describe('test add func', () => {
  it('2 + 2 = 4', () => {
    add(2, 2).should.equal(4)
  })
})
```

    mocha demo1/mocha demo1/calcu.test.js

    √ 2 + 2 = 4
    1 passing (14ms)

我们的第一个测试脚本就OK了。

---

## 断言库

* should.js
* expect.js
* chai

感兴趣自行了解，这里只介绍should了

```js
let num = 4 + 5
num.should.equal(9)
num.should.not.equal(10)
// boolean
'ok'.should.to.be.ok
false.should.to.not.be.ok
// type
'test'.should.to.be.a('string')
({foo: 'bar'}).should.to.be.an('object')
```

## mocha用法详解

* 常规函数测试
* 异步函数测试
* api测试

### 常规函数测试

参考上面的calcu.test.js

### 异步函数测试

新建book.js

```js
let fs = require('fs')
exports.read = cb => {
  fs.readFile('/book.txt', 'utf-8', (err, result) => {
    if (err) return cb(err)
    console.log('result', result)
    cb(null, result)
  })
}
```

新建文件book.test.js

```js
const book = require('../book')
const expect = require('chai').expect

describe('async', () => {
  it('read book async', done => {
    book.read((err, result) => {
      expect(err).to.equal(null)
      expect(result).to.be.a('string')
      done()
    })
  })
})
```

book.js的调用改成 setTimeout(() => {}, 3000)

然后 mocha --timeout 5000 test/book.test.js 就可以了

### api 测试

需要安装supertest模块

    npm i supertest --save-dev

新建api.test.js

```js
const expect = require('chai').expect
const request = require('supertest')

describe('api', () => {
  it('get baidu infomation', done => {
    request('https://www.baidu.com')
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .end((err, res) => {
        expect(err).to.be.a('null')
        expect(res).to.be.a('object')
        done()
      })
  })
})
```

---

### 同步代码

```js
describe('Array', () => {
  describe('#indexOf', () => {
    it('should return -1 when the value is not present', () => {
      [1,2,3].indexOf(5).should.equal(-1)
      [1,2,3].indexOf(0).should.equal(-1)
    })
  })
})
```

### Hooks

鉴于默认使用BDD风格的接口，Mocha提供了一些钩子函数:before(),after(),beforeEach()和afterEach()。这些钩子函数可以用于设置测试的先决条件或者对测试进行清理。

```js
describe('hooks', function() {
  before(function() {
    // 在这个区块内的所有测试之前运行
  })
  after(function () {
    // 在这个区块内的所有测试之后运行
  })
  beforeEach(function () {
    // 在这个区块内的每个测试运行之前运行
  })
  afterEach(function () {
    // 在这个区块内的每个测试之后运行
  })
})
```
