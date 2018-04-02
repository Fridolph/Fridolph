// 使用sort 重新排序元素，利用Math.random来随机排序
const shuffle = arr => arr.sort(() => Math.random() - 0.5)
console.log( shuffle([1,2,3,4,5,6,7,8,9]) )