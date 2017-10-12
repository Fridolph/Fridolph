const expect = require('chai').expect
const randomArray = require('../src/random')

describe('randomArray()函数测试', () => {
  it('测试数组长度', () => {
    expect(randomArray(5, 10, 100).length).to.be.equal(5)
  })
})