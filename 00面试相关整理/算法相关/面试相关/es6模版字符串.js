function format(str, obj) {
  let reg = /\$\{([^{]+)\}/gm
  return str.replace(reg, (match, name) => name ? obj[name] : '')
}

console.log(format('hello ${name}', {name: 'world'}))
// 'hello, world'
