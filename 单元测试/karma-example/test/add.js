var add = require('../src/add')
var expect = require('chai').expect

describe('加法函数测试', () => {
  it('1加1等于2', () => {
    expect(add(1,1)).to.be.equal(2)
  })
})

/**
 ?c 上面这段代码就是测试脚本，它可以独立执行。
 ?c 测试脚本里应该包括一个或多个 describe块，每个describe块应该包括一个或多个it块

 *c describe块称为“测试套件 test suite” 表示一组相关的测试
 *c 它是一个函数，第一个参数是测试套件的名称, 第二个参数是一个实际执行的函数

 *c it块称为测试用例 test case，表示一个单独的测试，是测试的最小单位
 *c 它也是一个函数，第一个参数是测试用例的名称, 第二个参数是实际执行的函数
 */
