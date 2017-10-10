const Koa = require('koa')
const app = new Koa()

const main = ctx => {
  ctx.response.body = 'hello world'
}

app.use(main)
app.listen(3000)

// 上述代码中，main函数用来设置ctx.response.body，然后使用app.use方法加载main函数
// ctx.response代表HTTP Response同样的，ctx.request代表HTTP Request