const chai = require('chai')
const expect = chai.expect
const Util = require('../src/localStorage')

describe('test module src/localStorage.js', () => {
  let name = 'fridolph'
  Util.setItem('username', name)
  expect(name).to.be.a('string')

  let username = Util.getItem('username')
  expect(username).to.be.a('string')
})