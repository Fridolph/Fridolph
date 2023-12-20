const fs = require('fs')

fs.unlink('./fs/123.txt', err => {
  if (err) throw err
})