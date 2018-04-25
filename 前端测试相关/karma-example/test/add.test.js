const add = require('../src/add')
const expect = require('chai').expect

describe('加法函数测试', () => {  
  it('任何数加0应该等于自身', () => {
    expect(add(1, 0)).to.be.equal(1)
  })
})