const fs = require('fs')

fs.readdir('./fs/', (err, files) => {
  if (err) throw err
  console.log(files)
})