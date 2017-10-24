const fs = require('fs')
const {promisify} = require('util')
const read = promisify(fs.readFile)

// read('./test.txt').then(data => {
//   console.log(data.toString())
// }).catch(err => {
//   console.log(err)
// })

function readFile() {
  return new Promise((resolve, reject) => {
    let data
    fs.readFile('./test.txt', (err, data) => {
      if (err) throw err
      data = data
    })

    resolve(data)
  })
}

readFile().then(data => {
  console.log(data)
})