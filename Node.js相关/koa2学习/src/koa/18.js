/**
 !c 释放error事件
 ?c 需要注意的是，如果错误被try...catch捕获，就不会触发error事件，
 ?c 必须调用 ctx.app.emit() 手动释放error事件，才能让监听函数生效
 */

const Koa = require('koa')
const app = new Koa()

const handler = async (err, ctx) => {
  try {
    await next()
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500
    ctx.response.type = 'html'
    ctx.response.body = '<p>Something wrong, please contact administrator.</p>'
    ctx.app.emit('error', err, ctx);
  }
}

const main = ctx => {
  ctx.throw(500)
}

app.on('error', err => {
  console.log('logger error', err.message)
  console.log(err)
})

app.use(handler)
app.use(main)

app.listen(3000)