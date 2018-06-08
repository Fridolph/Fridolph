let EventEmitter = require('events')
let util = require('util')

class Girl extends EventEmitter {
  constructor() {
    super()
  }
}

let girl = new Girl()
let drink = function (data) {
  console.log(data);
  console.log('喝酒');
};
let findboy = function () {
  console.log('交友');
}
girl.on('newListener', function (eventName) {
  // console.log('名称： ' + eventName);
});
girl.on('结婚', function() {});
girl.setMaxListeners(3);
console.log(girl.getMaxListeners());
girl.once('失恋', drink);       // {'失恋': [drink]}
girl.once('失恋', drink);       // {'失恋': [drink]}
girl.prependListener('失恋', function () {
  console.log('before');
});
girl.once('失恋', drink);       // {'失恋': [drink]}
girl.emit('失恋', '1');
