const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const session = require('koa-generic-session')
const koaRedis = require('koa-redis')
const mongoose = require('mongoose')
const dbConfig = require('./db/config')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

app.keys = ['keys', 'keyskeys']
app.use(session({
  key: 'mt',
  prefix: 'mtpr',
  store: new koaRedis()
}))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})

module.exports = app
