// 输入为有限数值数组；返回原数组下标，找不到时返回 null。
export function twoSum(values, target) {
  const seen = new Map()
  for (let i = 0; i < values.length; i++) {
    const complement = target - values[i]
    if (seen.has(complement)) return [seen.get(complement), i]
    if (!seen.has(values[i])) seen.set(values[i], i)
  }
  return null
}

export function characterCounts(text) {
  const counts = new Map()
  for (const character of text) counts.set(character, (counts.get(character) ?? 0) + 1)
  return counts
}

// 约定：忽略非字母/数字，NFC 归一化并忽略大小写；不是自然语言字形识别。
export function isPalindrome(text) {
  const chars = [...text.normalize('NFC').toLowerCase()].filter(char => /[\p{L}\p{N}]/u.test(char))
  let left = 0
  let right = chars.length - 1
  while (left < right) {
    if (chars[left++] !== chars[right--]) return false
  }
  return true
}

// 约定以空白分词，标点保留；同长度取最先出现者，按 Unicode 码点计长。
export function longestWord(text) {
  let best = ''
  let bestLength = 0
  for (const word of text.match(/\S+/gu) ?? []) {
    const length = [...word].length
    if (length > bestLength) { best = word; bestLength = length }
  }
  return best
}

// 仅接受自有可枚举字符串属性，忽略非有限数值；并列时保留首个。
export function maxNumericEntry(object) {
  let result = null
  for (const [key, value] of Object.entries(object)) {
    if (typeof value === 'number' && Number.isFinite(value)
        && (result === null || value > result[1])) result = [key, value]
  }
  return result
}
