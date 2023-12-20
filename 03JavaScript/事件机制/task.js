setTimeout(() => {
  console.log('setTimeout');
  process.nextTick(() => {
    console.log('nextTick 1');
  })
})

console.log('main 1');

function say() {
  console.log('hello');
  process.nextTick(() => {
    console.log('nextTick2');
  })
}

new Promise(resolve => {
  process.nextTick(() => {
    console.log('nextTick3');
  })
  console.log('promise 1');
  resolve('promise then')
}).then(data => {
  console.log(data);
})

console.log('main2');

process.nextTick(() => {
  console.log('nextTick 4');
})

say()

// main 1 JS线程执行栈任务开始，宏队列： setTimeout 1
// promise 1 微队列 promise 18 promise 23
// main 2 微队列 nextTick 29
// hello 微队列 nextTick 12 - 主线程上的同步任务完了，开始执行异步任务
// nextTick3
// nextTick 4
// nextTick 2
// promise then
// setTimeout
// nextTick 1

// 宏
// setTimeout

// 微
// promise 18
// nextTick 29
// nextTick 12
// promise 23
// nextTick 4
