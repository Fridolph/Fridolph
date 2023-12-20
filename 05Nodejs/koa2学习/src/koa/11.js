/**
 !c 中间件的合成
 ?c koa-compose模块可以将多个中间件合并成一个 
 */

const Koa = require('koa')
const compose = require('koa-compose')
const app = new Koa()

const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
  next()
}

const main = ctx => {
  ctx.response.body = 'Hello World'
}

const middlewares = compose([logger, main])

app.use(middlewares)
app.listen(3000)

