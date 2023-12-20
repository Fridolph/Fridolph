const crypto = require('crypto')


console.log(md5(md5('123456').substr(11,7) + md5('123456')));

function md5(mingma) {
  let md5 = crypto.createHash('md5')
  let password = md5.update(mingma).digest('base64')

  return password;
}


