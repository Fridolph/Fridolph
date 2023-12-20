Router —— 拆
/user/...  
/article/...

1. 创建router

var router = express.Router()

2. 把router添加到server

server.use('/user', router)

3. router内部

router.get('/index.html')
router.post('/form.html')