const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

const main = ctx => {
  ctx.response.type = 'html'
  ctx.response.body = fs.createReadStream('./demos/template.html')
}

app.use(main)
app.listen(3000)