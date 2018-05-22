function fibonacci(n) {
  if (n === 0) return 0
  if (n === 1) return 1

  return fibonacci(n - 2) + fibonacci(n - 1)
}

// 改良版
function fibonacci(n) {
  if (n === 0) return 0
  if (n === 1) return 1

  let a = 0
  let b = 1
  let t = 0
  for (let i = 2; i <= n; i++) {
    t = a + b
    a = b
    b = t
  }
  return t
}
