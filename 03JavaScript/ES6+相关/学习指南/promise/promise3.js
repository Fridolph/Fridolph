const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter {
  constructor(seconds, superstitious) {
    super();
    this.seconds = seconds;
    this.superstitious = !!superstitious;
  }
  go() {
    const countdown = this;
    return new Promise((resolve, reject) => {
      for (let i = countdown.seconds; i >= 0; i--) {
        setTimeout(() => {
          if (countdown.superstitious && i === 13) {
            return reject(new Error('DEFINITELY NOT COUNTING THAT'));
          }
          countdown.emit('tick', i);

          if (i === 0) resolve();
        }, (countdown.seconds - i) * 300)
      }
    })
  }
}

var str = `
  Countdown类继承了EventEmitter，这样Countdown可以发射事件了。Go方法是正式开始倒计时并返回promise的地方。
  注意，在go函数中，我们所做的第一件事就是把this赋给countdown。这是因为在回调中，无论倒计时是否迷信数字，都需要this的值来获取倒计时的长度。
`;

const c = new Countdown(5);

c.on('tick', i => {
  if (i > 0) console.log(i + '...');
})
c.go()
  .then(() => {
    console.log('Go!')
    const c1 = new Countdown(15, true)
    .on('tick', i => {
      if (i > 0) console.log(i + '...')
    });
  
    c1.go()
      .then(() => console.log('GO!'))
      .catch(err => console.error(err.message));
  })
  .catch(err => {
    console.error(err.message);
  });

