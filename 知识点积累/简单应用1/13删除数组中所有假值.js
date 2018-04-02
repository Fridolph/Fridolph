// 删除数组中的所有假值。
// 在JavaScript中，假值有false、null、0、""、undefined 和 NaN。

console.log(bouncer([7, 'ate', '', false, 9]));


function bouncer(arr) {
  return arr.filter((item, index, arr) => {
    return Boolean(item);
  })
}