function validateIndex(n) {
  if (!Number.isSafeInteger(n) || n < 0) throw new RangeError('下标须为非负安全整数')
}

export function factorial(n) {
  validateIndex(n)
  let result = 1n
  for (let i = 2; i <= n; i++) result *= BigInt(i)
  return result
}

export function fibonacci(n) {
  validateIndex(n)
  let a = 0n
  let b = 1n
  for (let i = 0; i < n; i++) [a, b] = [b, a + b]
  return a
}
