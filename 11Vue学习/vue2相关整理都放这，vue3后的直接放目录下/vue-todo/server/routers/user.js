const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  if (user.username === 'fridolph' && user.password === 'fridolph') {
    ctx.session.user = {
      username: 'fridolph'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'fridolph'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = userRouter
