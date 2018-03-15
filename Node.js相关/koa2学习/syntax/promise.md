回顾一下Node中写调用异步API的方式

1. 最开始的, 错误回调优先的一种方式

```js
const fs = require('fs')
fs.readFile('./package.json', (err, data) => {
  if (err) throw Error(err)
  let name = JSON.parse(data).name
  console.log(name)
})
```

2. 后面开始流行的Promise

```js
const fs = require('fs')
const readAsync = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}
readAsync('./package.json').then(res => {
  let name = JSON.parse(res).name
  console.log(name)
}).catch(err => {
  console.log(err)
})
```

3. 使用 util.promisify

```js
const fs = require('fs')
const util = require('util')
const readAsync = util.promisify(fs.readFile)

readAsync('./package.json').then(res => {
  let name = JSON.parse(res).name
  console.log(name)
}).catch(err => {
  console.log(err)
})
```

4. 使用 co 和 util

```js
const co = require('co')
const util = require('util')

co(function *() {
  let data = yield util.promisify(fs.readFile)('./package.json')
  data = JSON.parse(data)
  console.log(data.name)
})
```


5. async + util.promisify方式

```js
const fs = require('fs')
const util = require('util')
const readFileAsync = util.promisify(fs.readFile)
const yewu = async (path) => {
  try {
    let data = await readFileAsync(path)
    let name = JSON.parse(data).name
  } catch (err) {
    console.log(err)
  }
}
console.log(yewu('./package.json'))
```