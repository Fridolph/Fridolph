var fs = require('fs');

fs.readFile('./config.json', (err, buf) => {
  if (err) throw er;

  var config = JSON.parse(buf.toString());
  doThisThing(config);
});