const {parse, format} = require('path')

const filepath = '/usr/local/node_modules/n/package.json'

const ret = parse(filepath)

console.log(ret)

console.log('--------------------\n',format(ret))