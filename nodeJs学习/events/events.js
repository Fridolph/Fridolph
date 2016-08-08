var EventEmitter = require('events').EventEmitter
var life = new EventEmitter()

life.setMaxListeners(11)

// addEventListener


function water (who) {
  console.log('给' + who + '倒水')
}

life.on('求安慰', water)

life.on('求安慰', function (who) {
  console.log('给' + who + '揉肩');
})
life.on('求安慰', function (who) {
  console.log('给' + who + '做饭');
})
life.on('求安慰', function (who) {
  console.log('给' + who + '洗衣服');
})
life.on('求安慰', function (who) {
  console.log('给' + who + '..5');
})
life.on('求安慰', function (who) {
  console.log('给' + who + '..6');
})
life.on('求安慰', function (who) {
  console.log('给' + who + '..7');
})
life.on('求安慰', function (who) {
  console.log('给' + who + '..8');
})
life.on('求安慰', function (who) {
  console.log('给' + who + '..9');
})
life.on('求安慰', function (who) {
  console.log('给' + who + '你想累死我啊');
})
life.on('求关爱', function (who) {
  console.log('给' + who + '买衣服');
})
life.on('求关爱', function (who) {
  console.log('给' + who + '交工资');
})

// life.removeListener('求安慰', water)
life.removeAllListeners('求安慰')


var hasConforListener = life.emit('求安慰', ' 汉子')

var hasCaredListener = life.emit('求关爱', ' 妹纸') 

// var hasPlayedListener = life.emit('求玩坏', ' 汉子和妹纸')

console.log(life.listeners('求安慰').length);
console.log(life.listeners('求关爱').length);
// console.log(EventEmitter.listenerCount(life, '求安慰'));