const debug = require('./prefix');

debug('started first debugger!')
debug('started second debugger!')

setTimeout(() => {
  debug('after some time...')
  debug('what happends?')
}, 1000)
