const chai = require('chai')
const expect = chai.expect

describe('Array', () => {
  describe('测试indexOf()方法', () => {
    it('若去找数组中没有的数会返回-1', () => {
      expect([1,2,3].indexOf(5)).to.be.equal(-1)
    })
  })
})