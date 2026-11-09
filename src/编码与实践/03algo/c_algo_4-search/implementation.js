// 前置条件：升序排列的有限数值数组；不在函数内做 O(n) 的排序校验。
export function lowerBound(values, target) {
  let left = 0
  let right = values.length
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)
    if (values[mid] < target) left = mid + 1
    else right = mid
  }
  return left
}

export function binarySearch(values, target) {
  const index = lowerBound(values, target)
  return index < values.length && values[index] === target ? index : -1
}
