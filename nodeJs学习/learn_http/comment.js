var http = require('http')
var querystring = require('querystring')

var postData = querystring.stringify({
  'content': '一起期待下一期的课程',
  'cid': 348
})

var options = {
  hostname: 'www.imooc.com',
  port: 80,
  path: '/course/document',
  method: 'POST',
  headers: {
    'Accept':'application/json, text/javascript, F:/; q=0.01',
    'Accept-Encoding':'gzip, deflate',
    'Accept-Language':'zh-CN,zh;q=0.8',
    'Connection':'keep-alive',
    'Content-Length': postData.length,
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie':'imooc_uuid=76bfd8a1-e0d1-4f55-932a-39f1066a75b5; imooc_isnew_ct=1456668528; loginstate=1; apsid=VlNTRmMzA3MmM2YjU2Nzk4MmRjNzAyODk4MzE5YWIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjY0OTQ2MgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyNDkxMjE0ODZAcXEuY29tAAAAAAAAAAAAAAAAAAAAADQ0YWM0MTIzMGQ2Y2NiMDViMTk4MmFlMDJlYmY2NDEyvVBUV71QVFc%3DMm; last_login_username=249121486%40qq.com; PHPSESSID=brt7tstrpeueaot33f9elt5sf2; jwplayer.qualityLabel=è¶æ¸; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1467435244,1467441215,1467541522,1467541525; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1467544832; imooc_isnew=2; cvde=5778e814d0795-17',
    'Host':'www.imooc.com',
    'Origin':'http://www.imooc.com',
    'Referer':'http://www.imooc.com/video/8837',
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36 Core/1.47.516.400 QQBrowser/9.4.8142.400',
    'X-Requested-With':'XMLHttpRequest'
  } 

}

var req = http.request(options, function (res) {

  console.log('Status: ' + res.statusCode)
  console.log('headers: ' + JSON.stringify(res.headers))

  res.on('data', function (chunk) {
    console.log(Buffer.isBuffer(chunk))
    console.log(typeof chunk)
  })

  res.on('end', function () {
    console.log('评论完毕');
  })  

})

req.on('error', function (e) {
  console.log('Error: ' + e.message);
})

req.write(postData)
req.end()