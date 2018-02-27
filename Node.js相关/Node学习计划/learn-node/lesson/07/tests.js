const should = chai.should()

describe('simple test', () => {
  it('should equal 0 when n === 0', () => {
    window.fibonacci(0).should.equal(0)
  })
})
