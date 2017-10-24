const fs = require('fs')

const rs = fs.createReadStream('../fs/stat.js')

rs.pipe(process.stdout)