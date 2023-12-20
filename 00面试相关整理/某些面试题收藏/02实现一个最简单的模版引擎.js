// 2.实现一个最简单的模板引擎
// render('我是{{name}}，年龄{{age}}，性别{{sex}}',{
// 	name:'姓名',
// 	age:18
// })
// 结果： 我是姓名，年龄18，性别undefined。
const render = (tpl, data) => {
  return tpl.replace(/\{\{(.+?)\}\}/g, (m, m1) => {
    return data[m1]
  })
}

console.log(
  render('我是{{name1}}，年龄{{age2}}，性别{{sex3}}', {
    name1: '姓名',
    age2: 18,
    sex3: '男'
  })
)

// 点1 正则表达式，向前替换
// 点2 replace用法