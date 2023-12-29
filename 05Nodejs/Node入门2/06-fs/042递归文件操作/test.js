var finder = require('./finder');

try {
  var results = finder.findSync(/file.*/, '/');

  console.log(result);
} catch (err) {
  console.error(err);
}