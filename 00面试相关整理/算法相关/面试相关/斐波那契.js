// function fibonacci(n) {
//   if (n === 0) return 0
//   if (n === 1) return 1

//   return fibonacci(n - 2) + fibonacci(n - 1)
// }

// 改良版
// function fibonacci(n) {
//   if (n === 0) return 0
//   if (n === 1) return 1

//   let a = 0
//   let b = 1
//   let t = 0
//   for (let i = 2; i <= n; i++) {
//     t = a + b
//     a = b
//     b = t
//   }
//   return t
// }

// 最优
// const fibonacci = (s => (
//   f = i => s[i] || (s[i] = f(i - 1) + f(i - 2))
// ))([0, 1, 1])

const fibonnaci = n => {
  const fib = (prev, next, count) => {
    if (count === 0) {
      return prev
    } else {
      return fib(next, prev + next, count - 1)
    }
  }
  return fib(0, 1, n)
}

fibonnaci(10)
