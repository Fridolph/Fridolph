const expect = require('chai').expect

describe('beforeEach - async Hook示例', () => {
  var foo = false

  beforeEach(done => {
    setTimeout(() => {
      foo = true
      done()
    }, 50)
  })

  it('全局变量异步修改应该成功', () => {
    expect(foo).to.be.equal(true)
  })
})