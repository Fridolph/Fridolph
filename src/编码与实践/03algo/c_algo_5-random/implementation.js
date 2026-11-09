// RNG 应提供 [0, 1) 的均匀随机值；依赖注入便于复现测试。
function sample(rng) {
  const value = rng()
  if (!Number.isFinite(value) || value < 0 || value >= 1) {
    throw new RangeError('随机源必须返回 [0, 1) 内的数')
  }
  return value
}

export function randomInt(min, max, rng = Math.random) {
  const span = max - min + 1
  if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max)
      || min > max || !Number.isSafeInteger(span)) {
    throw new RangeError('需要有效且跨度安全的整数闭区间')
  }
  return min + Math.floor(sample(rng) * span)
}

export function randomArray(length, min, max, rng = Math.random) {
  if (!Number.isSafeInteger(length) || length < 0) throw new RangeError('长度须为非负安全整数')
  // 即使空数组也验证范围；长度的实际内存预算由调用方约束。
  if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max)
      || min > max || !Number.isSafeInteger(max - min + 1)) throw new RangeError('无效范围')
  return Array.from({ length }, () => randomInt(min, max, rng))
}

export function shuffle(values, rng = Math.random) {
  const result = [...values]
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(0, i, rng)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
