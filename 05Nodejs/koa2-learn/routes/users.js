const router = require('koa-router')()
const Person = require('../db/models/person')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/addPerson', async (ctx, next) => {
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age
  })
  let code
  try {
    await person.save()
  } catch (err) {
    code = -1
  }
  ctx.body = {
    code
  }
})

router.post('/getPerson', async (ctx, next) => {
  const result = await Person.findOne({
    name: ctx.request.body.name
  })
  const results = await Person.find({
    name: ctx.request.body.name
  })
  ctx.body = {
    code: 0,
    result,
    results
  }
})

router.post('/updatePerson', async (ctx, next) => {
  const result = await Person.where({
    name: ctx.request.body.name
  }).update({
    age: ctx.request.body.age
  })
  ctx.body = {
    code: 0
  }
})

module.exports = router
