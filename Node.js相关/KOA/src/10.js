/**
 !c 异步中间件 
 ?c 迄今为止，所有例子的中间件都是同步的，不包含异步操作，那么我们来看看异步操作
 */

const Koa = require('koa')
const fs = require('fs.promised')
const app = new Koa()

const main = async function(ctx, next) {
  ctx.response.type = 'html'
  ctx.response.body = await fs.readFile('./demos/template.html', 'utf8')
  next()
}

app.use(main)

app.listen(3000)