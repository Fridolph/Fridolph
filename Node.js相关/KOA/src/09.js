/**
 ?c 中间件栈    多个中间件会形成一个栈结构，以先进后出的顺序执行
 *c 1. 最外层的中间件首先执行
 *c 2. 调用next函数，把执行权交给下一个中间件
 *c 3. 最内层的中间件最后执行
 *c 4. 执行结束后，把执行权交回上一层中间件
 *c 5. 最外层的中间件收回执行权后，执行next函数后面的代码
 */

const Koa = require('koa')
const app = new Koa()

const one = (ctx, next) => {
  console.log('one start')
  next()
  console.log('one end')
}

const two = (ctx, next) => {
  console.log('two start')
  next()
  console.log('two end')
}

const three = (ctx, next) => {
  console.log('three start')
  next()
  console.log('three end')
}

app.use(one)
app.use(two)
app.use(three)

app.listen(3000)

//todo 如果将 two 中的next()注释掉
//?  其结果， one start two start two end one start 
//?  不会进入到three中间件里，提前结束