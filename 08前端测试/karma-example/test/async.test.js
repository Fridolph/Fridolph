const request = require('superagent')
const expect = require('chai').expect

describe('异步测试 - async.test.js', () => {
  it('异步请求应该返回一个对象', done => {
    request
      .get('https://api.github.com')
      .end((err, res) => {
        expect(res).to.be.an('object')
        done()
      })
  })
})