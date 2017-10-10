/**
 !c Cookies
 ?c ctx.cookies用来读写cookie
 */

const Koa = require('koa')
const app = new Koa()

const main = ctx => {
  const n = Number(ctx.cookies.get('view') || 0) + 1
  
  ctx.cookies.set('view', n)
  ctx.response.body = n + 'views'
}

app.use(main)

app.listen(3000)