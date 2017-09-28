var str = `
  node promise3.js 会发现倒计时到13时，报错，但还会继续执行。
  为了解决这个问题，一旦发现不能继续倒计时，就必须清理所有未处理的超时
`;

const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter {

  constructor(seconds, superstitious) {
    super();
    this.seconds = seconds;
    this.superstitious = !!superstitious;
  }

  go() {
    const countdown = this;
    const timeoutIds = [];

    return new Promise((resolve, reject) => {
      for (let i = countdown.seconds; i >= 0; i--) {
        timeoutIds.push(setTimeout(() => {
          if (countdown.superstitious && i === 13) {
            // 清楚所有pending的timouts
            timeoutIds.forEach(clearTimeout);
            return reject(new Error('DEFINITELY NOT COUNTING THAT'));
          }
          countdown.emit('tick', i);
          if (i === 0) resolve();
        },(countdown.seconds - i) * 300))
      }
    })
  }
}

const c = new Countdown(15, true)
  .on('tick', i => {
    if (i > 0) console.log(i + '...')
  })

c.go()
  .then(() => console.log('GO!'))
  .catch(err => console.error(err.message));