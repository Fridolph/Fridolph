var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send('Hello Node.js');  
});

app.listen(3000);

