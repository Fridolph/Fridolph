var con = require('./mime.json')

function getText(text) {
  // console.log(con[text]); 
  return con[text]
}

getText('.html')