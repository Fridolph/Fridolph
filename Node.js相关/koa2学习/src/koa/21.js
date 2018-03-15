/**
 !c 文件上传
 ?c koa-body 模块还可以用来处理文件上传
 */
const Koa = require('koa')
const os = require('os')
const path = require('path')
const koaBody = require('koa-body')
const app = new Koa()

const main = async function(ctx) {
  const tmpdir = os.tmpdir()
  const filePaths = []
  const files = ctx.request.body.files || {}

  for (let key in files) {
    const file = files[key]
    const filePath = path.join(temdir, file.name)
    const reader = fs.createReadStream(file.path)
    const writer = fs.createWriteStream(filePath)
    reader.pipe(writer)
    filePaths.push(filePath)
  }

  ctx.body = filePaths
}

app.use(koaBody({
  multipart: true
}))
app.use(main)
app.listen(3000)