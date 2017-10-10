/**
 !c 错误处理
 ?c 如果代码运行过程中发生错误，我们需要把错误信息返回给用户。
 *c HTTP协定约定这时要返回500状态码。KOA提供了ctx.throw()方法，用来抛出错误，看下面的例子：
 */

const Koa = require('koa')
const app = new Koa()

const error = ctx => {
  ctx.throw(404)
}

app.use(error)
app.listen(3000)