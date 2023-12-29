var q = require('q')
var fs = require('fs')
var defer = q.defer()

function getInputPromise() {
  return defer.promise
}

/**
 * 当inputPromise状态由未完成变成fulfil时，调用function(fulfilled)
 * 当inputPromise状态由未完成变成rejected时，调用function(rejected)
 * 将then返回的promise赋给outputPromise
 * function(fulfilled) 和 function(rejected) 通过抛出异常将outputPromise的状态由
 * 未完成改变为reject
 * @private
 */
var outputPromise = getInputPromise().then(resolve => {
  throw new Error('fulfilled')
}, reject => {
  throw new Error('rejected')
})


/**
 * 当outputPromise状态由未完成变成fulfil时，调用function(fulfilled)。
 * 当outputPromise状态由未完成变成rejected, 调用function(rejected)。
 */
outputPromise.then(resolve => {
  console.log('fulfilled: ' + resolve);
}, reject => {
  console.log('rejected: ' + reject);
})

/**
 * 将inputPromise的状态由未完成变成rejected
 */
// defer.reject(); 

/**
 * 将inputPromise的状态由未完成变成fulfilled
 */
defer.resolve(); 