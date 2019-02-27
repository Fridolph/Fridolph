// 依次遍历数组中的每一项，让每一项的值作为对象的属性名和属性值，属性值存啥都可
// 每一次存储前验证当前对象中是否已存在该属性（in/hasOwnProperty 属性值不是undefined）
// 如果有属性，说迷宫数组存在，把当前项在数组中移除； 若不存在，存储到对象中即可
function unique(arr) {
  let obj = {}
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i]
    if (obj.hasOwnProperty(item)) {
      // obj已有item属性
      arr.splice(i, 1)
      i--
      continue
    }
    obj[item] = item
  }
}
