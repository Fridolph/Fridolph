var Express = require('express')

var server = Express()

// 目录1 /user/
var routeUser = Express.Router()

routeUser.get('/1.html', function(req, res) {
  res.send('user1')
})
routeUser.get('/2.html', function(req, res) {
  res.send('user2')
})

server.use('/user', routeUser)


// 目录2 /article/
var routeArticle = Express.Router()

routeArticle.get('/art1.html', function(req, res) {
  res.send('article1')
})

routeArticle.get('/art2.html', function(req, res) {
  res.send('article2')
})

server.use('/article', routeArticle)


server.listen(8080)