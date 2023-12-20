function countdown(seconds) {
  return new Promise((resolve, reject) => {
    for (let i = seconds; i >= 0; i--) {
      setTimeout(() => {
        if (i === 13) {
          return reject(new Error('DEFINITELY NOT COUNTING THAT.'))
        }
        if (i > 0) {
          console.log(i + '...')
        } else {
          resolve(console.log('Go!'))
        }
      }, (seconds - i) * 500)
    }
  })
}

const p = countdown(15);

p.then(() => {
  console.log('countdown completed successfully!')
})
p.catch(err => {
  console.log('countdown experienced an error: ' + err.messages);
})