// 避免不被出来的promise
var str = 'global';

// 这样运行失败了也不知道，应该加入错误处理
function launch1() {
  return new Promise((resolve, reject) => {
    if (Math.random() < 0.5) return;
    console.log('Lift off!');
    setTimeout(() => resolve('In orbit!'));
  }, 2 * 500)
}
// launch1();

function addTimeout(fn, timeout) {
  if (timeout === undefined) timeout = 1000; // 默认超时时间
  return function(...args) {
    return new Promise((resolve, reject) => {
      const tid = setTimeout(reject, timeout, new Error('Promise timed out'))
      fn(...args)
        .then((...args) => {
          clearTimeout(tid);
          resolve(...args);
        })
        .catch((...args) => {
          clearTimeout(tid);
          reject(...args);
        })
    })
  }
}

