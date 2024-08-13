// 从b创建一个Set，然后在a上使用Array.filter（），只保留b中不包含的值。
const difference = (a, b) => {
  const s = new Set(b)
  return a.filter((x) => !s.has(x))
}

// difference([1,2,3], [1,2]) -> [3]
console.log(`difference([1,2,3], [1,2]) -> [3] -->`, difference([1, 2, 3], [1, 2]))
