const reg = /<(\w+)>(.+)<\/\1>/g
const html = `<div class="container"><h1>Hello World</h1></div>`
const reg2 = /\{\{(\w+)\}\}/g
const html2 = `<div>{{title}}</div><div>{{name}}</div><div>{{age}}</div>`
const str = html2.replace(reg2, '\1')
console.log(html.match(reg))
// console.log(html2.match(reg2)))
// console.log(str)