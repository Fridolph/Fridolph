// const KoaRouter = require('koa-router')
// const router = new KoaRouter()
const {user} = require('./user')
const {contents} = require('./contents')

module.exports = {
  user,
  contents
}
