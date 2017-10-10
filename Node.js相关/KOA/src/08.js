// 将Logger单独拆分成一个独立函数
const Koa = require('koa')
const app = new Koa()

const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
  next()
}

app.use(logger)

app.listen(3000)

/* 
 * a  像上面代码中的logger函数就叫作中间件middleware，因为它处在HTTP Request和HTTP Response中间
 * a  用来实现某种中间功能。 app.use()用来加载中间件  
 * a  基本上，Koa所有功能都是通过中间件实现的。每个中间件默认接受两个参数，
 * a  第一个是Context对象，第二个是next函数，只要调用next函数，就可以把执行权交给下一个中间件
 */

// ? 蓝色的
// ! 红色的
// * 绿色的
// // 删除线
// TODO 橘黄色