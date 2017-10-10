/**
 !c 处理错误的中间件
 ?c 为了方便处理错误，最好使用try...catch将其捕获。但是，为每个中间件都写try...catch太麻烦
 ?c 我们可以让最外层的中间件，负责所有中间件的错误处理，下例：
 */

const Koa = require('koa')
const app = new Koa()

const handler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500
    ctx.response.body = {
      message: err.message
    }
  } 
}

// const main = (ctx, next) => {
//   ctx.response.body = 'Hello World'
//   next()
// }

const error = ctx => {
  ctx.throw(500);
}

// app.use(main)
app.use(error)

app.listen(3000)