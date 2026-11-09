# 基础场景题

## 将数字转换千分位

::: details

整理思路：数字转字符串，整体部分低位往高位遍历

```js
function formatWithArray(number) {
  // 转为字符串，是否有小数点，来拆分
  let arr = (number + '').split('.')
  let int = arr[0].split('')
  let fraction = arr[1] || ''
  // 返回的变量
  let r = ''
  let len = int.length
  // 倒叙并遍历
  int.reverse().forEach((v, i) => {
    // 非第一位且位置是3的倍数，添加 ','
    if (i !== 0 && i % 3 === 0) {
      r = v + ',' + r
    }
    // 正常添加字符
    else {
      r = v + r
    }
  })
  // 整数部分和小数部分拼接
  return r + (!!fraction ? '.' + fraction : '')
}

console.log(formatWithArray(1234567.89)) // 1,234,567.89
```

:::

### 字符串 + substring 截取

::: details

整理思路：数字转字符串，整数部分高位往低位遍历，三位分组

```js
function formatWithSubstring(number) {
  // 分割小数
  let arr = (number + '').split('.')
  let int = arr[0] + ''
  let fraction = arr[1] || ''

  // 多余的位数处理
  let f = int.length % 3
  let r = int.substring(0, f)
  for (let i = 0; i < Math.floor(int.length / 3); i++) {
    r += ',' + int.substring(f + i * 3, f + (i + 1) * 3)
  }
  if (f === 0) r = r.substring(1)
  // 整数部分和小数部分拼接
  return r + (!!fraction ? '.' + fraction : '')
}
```

:::

### Intl.NumberFormat

基本功能：国际化的数字处理方案，它可以用来显示不同国家队数字处理偏好

语法：`new Intl.NumberFormat([locales[, options]])`

### toLocalString

功能：能把数字转为特定语言环境下的表示字符串

语法：`numObj.toLocalString([locales[, options]])`
