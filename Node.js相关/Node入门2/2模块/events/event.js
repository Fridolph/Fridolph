const EventEmitter = require('events')

class CustomEvent extends EventEmitter {

}

const ce = new CustomEvent()

ce.on('error', err => {
  console.error(err)
})

ce.emit('error', new Error('oops!'))