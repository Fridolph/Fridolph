var express = require('express');
var app = express();
// 加载多个路由
var routes = require('./routes');

app.use(express.bodyParser());
// 将路由和HTTP动词及部分URL进行绑定
app.get('/notes', routes.notes.index);
app.post('/notes', routes.notes.create);
app.patch('/notes/:id', routes.notes.update);
app.get('/notes:id', routes.notes.show);

module.exports = app;