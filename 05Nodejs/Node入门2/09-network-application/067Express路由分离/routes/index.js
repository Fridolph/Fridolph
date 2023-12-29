/* 一个不包括其他应用部分的路由模块 */
var db= require('./../db');

module.exports.index = (req, res, next) => {
  db.notes.findAll((err, notes) => {
    if (err) {
      return next(err);
    }
    res.send(notes);
  });
}

module.exports.create = (req, res, next) => {
  db.notes.create(req.body.note, (err, note) => {
    if (err) {
      return next(err);
    }
    res.send(note);
  });
}

module.exports.update = (req, res,next) => {
  db.notes.update(req.param('id'), req.body.note, (err, note) => {
    if (err) {
      return next(err);
    }
    res.send(note);
  });
}

module.exports.show = (req, res, next) => {
  db.notes.find(req.param('id'), (err, note) => {
    if (err) {
      return next(err);
    }
    res.send(note);
  });
}