var fs = require('fs')

function async(err, files) {
  console.log(files)
}

require('fs').readdir('.', async)