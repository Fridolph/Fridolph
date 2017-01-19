const http = require('http')
const url = require('url')

let server = http.createServer((req, res) => {
  // 得到userurl
  let userurl = req.url

  res.writeHead(200, {"Content-Type": "text/html; charset=UTF8"})

  // substr 函数来判断此时的开头
  if (userurl.substr(0, 9) === '/student/') {
    let studentId = userurl.substr(9);
    console.log(`studentId: `, studentId);

    if (/\d{10}/.test(studentId)) {
      res.end(`你查询的学生信息，id为${studentId}`)
    } else {
      res.end('查询的学生学号错误')
    }
  } else if (userurl.substr(0,9) === '/teacher/') {
    let teacherId = userurl.substr(9);
    console.log(`teacherId: `, teacherId);
    if (/\d{6}/.test(teacherId)) {
      res.end(`你查询的老师信息，id为${teacherId}`)
    } else {
      res.end('查询的老师id有误')
    }
  } else {
    res.end('输入的查询信息有误')
  }
})

server.listen(8080, () => { console.log('open your broswer on http://127.0.0.1:8080'); })