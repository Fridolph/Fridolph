// promise的传递
var q = require('q')
var defer = q.defer();

function getInputPromise() {
  return defer.promise;
}

/**
 * 当inputPromise状态由未完成变成fulfil时，调用function(fulfilled)
 * 当inputPromise状态由未完成变成rejected时，调用function(rejected)
 * 将then返回的promise赋给outputPromise
 * function(fulfilled) 和 function(rejected) 通过返回字符串将outputPromise的状态由
 * 未完成改变为fulfilled
 * @private
 */
var outputPromise = getInputPromise().then(resolve => { 
  return 'resolve'; 
}, reject => {
  return 'reject';
});

/**
 * 当outputPromise状态由未完成变成fulfil时，调用function(fulfilled)，控制台打印'fulfilled: fulfilled'。
 * 当outputPromise状态由未完成变成rejected, 调用function(rejected), 控制台打印'fulfilled: rejected'。
 */
outputPromise.then(resolve => {
  console.log('resolve: ' + resolve);
}, reject => {
  console.log('reject: ' + reject);
})

/**
 * 将inputPromise的状态由未完成变成rejected
 */
defer.reject(); //输出 fulfilled: rejected

/**
 * 将inputPromise的状态由未完成变成fulfilled
 */
// defer.resolve(); //输出 fulfilled: fulfilled