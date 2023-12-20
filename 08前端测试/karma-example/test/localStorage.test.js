const chai = require('chai')
const expect = chai.expect
const Util = require('../src/localStorage')

describe('test module src/localStorage.js', () => {
  it('localStorage存数据', () => {
    let name = 'fridolph'
    Util.setItem('username', name)
    expect(name).to.be.a('string')
  })
 
  it('localStorage读数据', () => {
    let username = Util.getItem('username')
    expect(username).to.be.a('string')
  })
})