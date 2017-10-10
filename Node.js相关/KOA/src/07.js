// Koa的最大特色，中间件的设计
const Koa = require('koa')
const app = new Koa()

const main = ctx => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
  ctx.response.body = 'Hello World'
}

app.use(main)
app.listen(3000)