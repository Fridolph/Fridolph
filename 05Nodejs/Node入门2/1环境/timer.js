console.log('----start----')

setImmediate(() => {
  console.log('setImmediate')
})

setTimeout(() => {
  console.log('setTimeout')
}, 0)

process.nextTick(() => {
  console.log('process.nextTick')
  process.nextTick(() => {
    console.log('nextTick2')
  })
})

