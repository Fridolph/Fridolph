let template = '我是{name}，年龄{age}，性别{sex}'
let data = {
  name: 'fri',
  age: 24
}

const render = (template, regroup) => {
  let result = ''
  for (key in regroup) {
    if (data[key] == undefined) {
      result = (result || template).replace()
    }
  }
  return result
}
