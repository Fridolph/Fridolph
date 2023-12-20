const fetch = require('node-fetch')
const expect = require('chai').expect

describe('异步测试 - promise.test.js', () => {
  it('异步请求应该返回一个对象', () => {
    return fetch('https://api.github.com')
      .then(res => {
        return res.json()
      }).then(json => {
        expect(json).to.be.an('object')
      })
  })
})