const expect = require('chai').expect
const multiply = require('../src/multiply')

describe('test module src/multiply', () => {
  it('2 * 2 = 4', () => {
    expect(multiply(2,2)).to.be.equal(4)
  })
})