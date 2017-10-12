const expect = require('chai').expect

describe('超时测试 - timeout.test.js', () => {
  it('测试应该 2000 毫秒后结束', done => {
    let x = true
    let f = () => {
      x = false
      expect(x).to.be.not.ok
      done()
    }
    setTimeout(f, 1900)
  })
})