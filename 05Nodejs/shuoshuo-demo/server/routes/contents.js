const KoaRouter = require('koa-router')
const Models = require('../models')

const router = new KoaRouter()

router.get('/contents', async ctx => {
  let page = ctx.query.page || 1
  let limit = ctx.query.limit || 2
  let offset = (page - 1) * limit

  let rs = await Models.Contents.findAndCountAll({
    limit,
    offset,
    include: {
      model: Models.Users
    }
  })

  return ctx.body = {
    code: 0,
    total: rs.count,
    data: rs.rows.map(v => ({
      id: v.id,
      title: v.title,
      content: v.content,
      user_id: v.user_id,
      username: v.User.username,
      created_at: v.createdAt,
      like_count: v.like_count,
      unlike_count: v.unlike_count,
      comment_count: v.comment_count
    }))
  }
})

router.post('/contents', async ctx => {
  let {title, content} = ctx.request.body
  let {uid: user_id} = ctx.session
  let username = ctx.cookies.get('username')
  // 校验
  if (title == '' || content == '') {
    return ctx.body = { code: 1, msg: '标题或内容不能为空' }
  } else if (!user_id && !username) {
    return ctx.body = { code: 1, msg: '用户未登录' }
  }
  // console.log(title, content, user_id, username);
  // console.log('可以新建contents')
  let newContent = await Models.Contents.build({
    user_id,
    title,
    content,
  }).save()
  return ctx.body = { code: 0, data: newContent }
})

router.post('/like', async ctx => {
  let {user_id, content_id} = ctx.request.body

  let rs = await Models.Contents.findById(content_id)
  // console.log('点赞的那条-------------------\n: ', rs);
  if (!rs) {
    return ctx.body = {
      code: 1,
      msg: '没有对应的内容'
    }
  }
  // 查询当前用户是否点过赞
  // SELECT * FROM likes WHERE content_id=1 and user_id=1
  let hasLike = await Models.Likes.findOne({
    where: {
      [Models.Sequelize.Op.and]: [
        { content_id },
        { user_id }
      ]
    }
  })
  // console.log('hasLike: ', hasLike);
  if (hasLike != null) {
    return ctx.body = {
      code: 1,
      msg: '不能重复点赞哦'
    }
  }
  // 对内容的点赞数据 +1
  await rs.set('like_count', rs.get('like_count') + 1)
  await rs.save()
  // 上面只保存了 点赞数+1 但还要保存 谁点的赞 是哪条内容的赞
  await Models.Likes.build({
    content_id,
    user_id
  }).save()
  return ctx.body = {
    code: 0,
    data: rs
  }
})

router.post('/unlike', async ctx => {
  let {user_id, content_id} = ctx.request.body

  let rs = await Models.Contents.findById(content_id)
  // console.log('点赞的那条-------------------\n: ', rs);
  if (!rs) {
    return ctx.body = {
      code: 1,
      msg: '没有对应的内容'
    }
  }
  // 查询当前用户是否点过赞
  // SELECT * FROM likes WHERE content_id=1 and user_id=1
  let hasUnlike = await Models.Unlikes.findOne({
    where: {
      [Models.Sequelize.Op.and]: [
        { content_id },
        { user_id }
      ]
    }
  })
  if (hasUnlike != null) {
    return ctx.body = {
      code: 1,
      msg: '不能重复点赞哦'
    }
  }
  // 对内容的点赞数据 +1
  await rs.set('unlike_count', rs.get('unlike_count') + 1)
  await rs.save()
  // 上面只保存了 点赞数+1 但还要保存 谁点的赞 是哪条内容的赞
  await Models.Unlikes.build({
    content_id,
    user_id
  }).save()
  return ctx.body = {
    code: 0,
    data: rs
  }
})


module.exports = {
  contents: router
}
