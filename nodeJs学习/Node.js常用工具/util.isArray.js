var util = require('util')

util.isArray([])
// true

util.isArray(new Array)
// true

util.isArray({})
// false