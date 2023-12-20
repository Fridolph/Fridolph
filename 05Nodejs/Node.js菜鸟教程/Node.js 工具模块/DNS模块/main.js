var dns = require('dns')

dns.lookup('www.github.com', function onLoopup(err, address, family) {
  console.log('IP地址：', address);

  dns.reverse(address, function(err, hostnames) {
    if (err) {
      console.log(err.stack);
    }

    console.log('反向解析 ' + address + ': ' + JSON.stringify(hostnames));
  })
})