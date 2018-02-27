// /a/.test('A') // false
// /a/i.test('A') // true

// console.log('hello hell hoo'.match(/h.*?\b/))
// console.log('hello hell hoo'.match(/h.*?\b/g))

// console.log('aaa\nbbb\nccc'.match(/^[\s\S]*?$/g))
// console.log('aaa\nbbb\nccc'.match(/^[\s\S]*?$/gm))
/*
  \A 字符串开头 类似^ 但不受处理多行选项的影响
  \Z 字符串结尾或行尾，不受处理多行选项的影响
  \z 字符串结尾，类似$，不受处理多行选项的影响
*/