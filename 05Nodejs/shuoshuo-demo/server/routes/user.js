const KoaRouter = require('koa-router')
const Models = require('../models')
const md5 = require('md5')
const router = new KoaRouter()

router.post('/register', async ctx => {
  let {username, password} = ctx.request.body
  // console.log('username & password: ', username, password)
  // 校验逻辑，为保证逻辑完整 - 前后端都应该添加
  let user = await Models.Users.findOne({
    where: {
      username
    }
  })
  // console.log('has user: -------------------\n', user )
  // 用户名存在
  if (user != null) {
    return ctx.body = {
      code: 1,
      msg: '当前用户名已存在'
    }
  } else {
    let newUser = await Models.Users.build({
      username,
      password: md5(password)
    }).save()
    // console.log('newUser: ', newUser)
    // 服务器发送一个约定好的cookie，来表示当前是登录的
    // ctx.cookies.set('uid', newUser.id)
    // ctx.cookies.set('username', newUser.username)
    ctx.cookies.set('username', newUser.get('username'), {
      httpOnly: false
    });
    ctx.session.uid = newUser.get('id')
    return ctx.body = {
      code: 0,
      data: {
        id: newUser.get('id'),
        username: newUser.get('username')
      }
    }
  }
})

router.post('/login', async ctx => {
  let {username, password} = ctx.request.body
  let user = await Models.Users.findOne({
    where: {
      username,
      password: md5(password)
    }
  })
  // console.log('has user: -------------------\n', user)
  if (user != null) {
    console.log('login post user: ', user)
    await ctx.cookies.set('username', user.get('username'), {
      httpOnly: false
    });
    ctx.session.uid = user.get('id')

    return ctx.body = {
      code: 0,
      data: {
        id: user.get('id'),
        username: user.get('username')
      }
    }
  } else {
    return ctx.body = {
      code: 1,
      msg: '用户名或密码错误'
    }
  }
})

router.post('/logout', async ctx => {
  let uid = ctx.cookies.get('uid')
  let username = ctx.cookies.get('username')

  if (uid && username) {
    await ctx.cookies.set('uid', '')
    await ctx.cookies.set('username', '')
  }

  return ctx.body = {
    code: 0,
    msg: `用户 ${username} 已注销`
  }
})

module.exports = {
  user: router
}
