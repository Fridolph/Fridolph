> UDP 与 TCP 的区别是什么？

UDP协议是面向无连接的，也就是说不需要在正式数据传递之前先连接起双方。
UDP协议只是数据报文的搬运工，不保证有序且不丢失地传递到对端，并且UDP协议也么有任何控制流量的算法，总的来说，UDP相较于TCP更加的轻便


## TCP

建立和断开连接都需要先进行握手。在数据传输过程中，通过各种算法保证数据的可靠性

### 三次握手

客户端 -> SYN -> 服务端

服务端 -> SYN + ACK -> 客户端

客户端 -> ACK + 1 -> 服务端 = 校验成功开始通信


### 四次挥手

客户端 -> 发送释放请求 FIN -> 服务端
服务端 -> 发送ACK 并进入close状态 -> 客户端
服务端 -> FIN -> 客户端
客户端 -> ACK + 1 -> 服务端确认并关闭

---

> HTTP GET和POST方法的区别

从本质上来说 Get是幂等 无副作用的，POST是非幂等

从技术上说：

- Get请求能缓存，POST不能
- POST相对安全，放于request body，但在抓包下都一样
- URL有长度限制 会影响GET请求
- POST支持更多编码且不对数据类型限制

## HTTP Headers

### General

|通用字段|作用|
|-------|----|
|Cache-Control|	控制缓存的行为|
|Connection|	浏览器想要优先使用的连接类型，比如 keep-alive|
|Date	|创建报文时间|
|Pragma|	报文指令|
|Via|	代理服务器相关信息|
|Transfer-Encoding|	传输编码方式|
|Upgrade|	要求客户端升级协议|
|Warning|	在内容中可能存在错误|

### 请求头 Request Headers

|请求首部|作用|
|-------|----|
|Accept|	能正确接收的媒体类型|
|Accept-Charset|	能正确接收的字符集|
|Accept-Encoding|	能正确接收的编码格式列表|
|Accept-Language|	能正确接收的语言列表|
|Expect|	期待服务端的指定行为|
|From|	请求方邮箱地址|
|Host|	服务器的域名|
|If-Match|	两端资源标记比较|
|If-Modified-Since|	本地资源未修改返回 304（比较时间）|
|If-None-Match|	本地资源未修改返回 304（比较标记）|
|User-Agent|	客户端信息|
|Max-Forwards|	限制可被代理及网关转发的次数|
|Proxy-Authorization|	向代理服务器发送验证信息|
|Range|	请求某个内容的一部分|
|Referer|	表示浏览器所访问的前一个页面|
|TE|	传输编码方式|

### 响应头 Response Headers

|响应首部|	作用|
|------|-------|
|Accept-Ranges	|是否支持某些种类的范围|
|Age	|资源在代理缓存中存在的时间|
|ETag	|资源标识|
|Location	|客户端重定向到某个URL|
|Proxy-Authenticate	|向代理服务器发送验证信息|
|Server	|服务器名字|
|WWW-Authenticate	|获取资源需要的验证信息|

## HTTP 状态码

状态码表示了响应的一个状态，可以让我们清晰的了解到这一次请求是成功还是失败，如果失败的话，是什么原因导致的，当然状态码也是用于传达语义的。如果胡乱使用状态码，那么它存在的意义就没有了。

状态码通常也是一道常考题。

### 2XX 成功

200 OK，表示从客户端发来的请求在服务器端被正确处理
204 No content，表示请求成功，但响应报文不含实体的主体部分
205 Reset Content，表示请求成功，但响应报文不含实体的主体部分，但是与 204 响应不同在于要求请求方重置内容
206 Partial Content，进行范围请求

### 3XX 重定向

301 moved permanently，永久性重定向，表示资源已被分配了新的 URL
302 found，临时性重定向，表示资源临时被分配了新的 URL
303 see other，表示资源存在着另一个 URL，应使用 GET 方法获取资源
304 not modified，表示服务器允许访问资源，但因发生请求未满足条件的情况
307 temporary redirect，临时重定向，和302含义类似，但是期望客户端保持请求方法不变向新的地址发出请求

### 4XX 客户端错误

400 bad request，请求报文存在语法错误
401 unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息
403 forbidden，表示对请求资源的访问被服务器拒绝
404 not found，表示在服务器上没有找到请求的资源

### 5XX 服务器错误

500 internal sever error，表示服务器端在执行请求时发生了错误
501 Not Implemented，表示服务器不支持当前请求所需要的某个功能
503 service unavailable，表明服务器暂时处于超负载或正在停机维护，无法处理请求

## HTTP 2 / 3

1. HTTP2引入新的编码机制，所有传输数据会被分隔，采用二进制编码
2. 多路复用，在一个TCP连接中 可发送多个请求
3. Header压缩
4. 服务端Push
