var fs = require('fs');
fs.readdir('./path/to/dir', (err, files) => {
  console.log(files);
});