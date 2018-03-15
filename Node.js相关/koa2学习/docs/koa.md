Koa  Express

===============

HTTP 接受 解析 响应

中间件 执行上下文

Application Context
Request Response
Middlewares
Session Cookie

---

纯函数 唯一输入 对应唯一输出，无副作用

尾递归 自己调用自己 

koa一切皆中间件
HTTP进入koa中都会流经预先设定好的中间件 middlewares
中间件策略中 会通过compose把中间件组合在一起 
一个接一个把数组中的函数依次执行
通过next() 把控制权往下传递
每个中间件都会拿到HTTP请求的上下文context
koa的req, res是基于原生req, res的扩展对象
