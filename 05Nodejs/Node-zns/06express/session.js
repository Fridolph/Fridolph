var Express = require('express')
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')

var server = Express()

// cookie
server.use(cookieParser())
server.use(cookieSession({
  keys: ['aaa', 'bbb', 'ccc']
}))

server.use('/', function(req, res) {
  // console.log(req.session);
  if (req.session['count'] == null) {
    req.session['count'] = 1;
  } else {
    req.session['count']++;
  }

  console.log(req.session['count']);

  res.send('ok')
})

server.listen(8080)