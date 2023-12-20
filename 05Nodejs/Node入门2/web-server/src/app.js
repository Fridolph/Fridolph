const http = require('http')
const chalk = require('chalk')
const {hostname, port} = require('./config/defaultConfig')

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html')
  res.write(`
    <html>
    <body>
      Hello Body!
    </body>    
    </html>
  `)
  res.end('</html>')
})

server.listen(port, hostname, () => {
  const addr = `http://${hostname}:${port}`
  console.log(`Server started at ${chalk.green(addr)}`)
})