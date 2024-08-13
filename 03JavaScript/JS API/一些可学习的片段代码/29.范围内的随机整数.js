// 使用Math.random（）生成一个随机数并将其映射到所需的范围，使用Math.floor（）使其成为一个整数。
const randomInRangeInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
// randomInRange(4, 6) ->
console.log(`randomInRangeInt(4, 6) -->`, randomInRangeInt(4, 6))

// 求范围内的随机数同理
const randomInRangeFloat = (min, max) => Math.random() * (max - min) + min
console.log('🚀 ~ randomInRangeFloat(2,10):', randomInRangeFloat(2, 10))
