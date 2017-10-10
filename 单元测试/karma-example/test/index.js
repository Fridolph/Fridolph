const chai = require('chai')
const expect = chai.expect
const Util = require('../src/index')

describe('test module src/index.js', () => {
  it('should return a number type', () => {
    let sum = Util.sum(30, 5);
    expect(sum).to.be.a('number')
    
    sum = Util.sum(-30, 5);
    expect(sum).to.be.a('number')
  })
})