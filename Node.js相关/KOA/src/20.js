/**
 !c 表单 
 ?c Web应用离不开处理表单，本质上，表单就是POST方法发送到服务器的键值对
 ?c koa-body 模块可以用来从POST请求的数据体里面提取键值对
 */
const Koa = require('koa')
const koaBody = require('koa-body')
const app = new Koa()

const main = async function(ctx) {
  const body = ctx.request.body
  if (!body.name) ctx.throw(400, '.name required') 
  ctx.body = {name: body.name}
}

app.use(koaBody())
app.use(main)
app.listen(3000)