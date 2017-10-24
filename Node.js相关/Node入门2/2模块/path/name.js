const {
  basename,
  dirname,
  extname
} = require('path')

const filepath = '/usr/local/bin/no.txt'

console.log('basename:',basename(filepath))
console.log('dirname:',dirname(filepath))
console.log('extname:',extname(filepath))