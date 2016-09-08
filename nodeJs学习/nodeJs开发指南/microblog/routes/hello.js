var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/hello', function(req, res, next) {
  res.send('The time is ' + new Date().toString()); 
});

module.exports = router.hello;
