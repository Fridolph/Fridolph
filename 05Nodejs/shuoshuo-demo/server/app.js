;(async () => {
  const Koa = require('koa')
  const KoaStatic = require('koa-static-cache')
  const KoaSession = require('koa-session')
  const bodyParser = require('koa-bodyparser')

  const app = new Koa()

  app.use(KoaStatic('./public', {
    prefix: '/',
    gzip: true,
    cache: false
  }))

  // 使用session中间件
  app.keys = ['fys']
  app.use(KoaSession({
    key: 'yk',
    maxAge: 600000,
    signed: true
  }, app))
  app.use(bodyParser())

  const useRouter = arr => {
    arr.forEach(item => {
      app.use(item.routes())
    })
  }
  // router
  const {contents, user} = require('./routes')
  useRouter([contents, user])

  app.listen(4002, () => {
    console.log('shuo shuo api-server is running at port 4002...')
  })
})()
