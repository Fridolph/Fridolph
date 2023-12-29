var express = require('express');
var app = express();

app.get('/notes', (req, res, next) => {
  // 该路由用于展示一个笔记列表
  db.notes.findAll((err, notes) => {
    if (err) {
      return next(err);
    }
    res.send(notes);
  });
});

app.post('./notes', (req, res, next) => {
  // 这个路由是用于创建笔记的
  db.notes.create(req.body.note, (err, note) => {
    res.send(note)
  });
});