const eventEmitter = require('./event.js')

const emitter = new eventEmitter()

emitter.on('sayHello', name => console.log(`hello, ${name}`))

emitter.emit('sayHello', 'fridolph')
