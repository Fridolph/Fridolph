async function foo() {
  console.log(1)
  const r1 = await new Promise((resolve, reject) => {
    console.log(2)
    setTimeout(() => {
      console.log(3)
      resolve(true)
      console.log(4)
      reject(false)
    }, 1000)
  })
  setTimeout(() => console.log(5), 0)
  setImmediate(() => console.log(6))
  process.nextTick(() => console.log(7))
  const r2 = await Promise.resolve(true)
  console.log(8)
}

foo().then(() => {
  console.log(9)
  setTimeout(() => console.log(10))
})

// 1
// 2 过一秒
// 3
// 4
// 8
// 9
// 7
// 6
// 5
// 10
