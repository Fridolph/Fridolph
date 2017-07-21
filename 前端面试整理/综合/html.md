## web开发中回话跟踪的方法有哪些

1. cookie
2. session
3. url重写
4. 隐藏input
5. ip地址


## <img>标签的title和alt有什么区别

title用于显示元素提供的附加信息，当鼠标hover上时显示
alt是img标签的特有属性，用于描述，当图片无法加载时显示，搜索引擎会重点分析

## web语义化？有什么作用

web语义化指通过html标记显示页面包含的信息，包含标签语义化 css命名语义化
为什么语义化：
* 去掉样式后页面呈现清晰的结构
* 盲人阅读
* 搜索引擎
* 便于维护

## HTTP method

1. GET 用于请求服务器发送某个资源
2. HEAD 与GET类似，但服务器在响应中只返回首部，不返回实体的body
3. PUT 服务器用请求的主体部分来创建一个由所请求的URL命名的新文档，若url已存在就用主体替代
4. POST 向服务器输入数据，用于支持表单
5. TRACE 主要用于诊断，用于验证请求是否如愿穿过请求链
6. OPTIONS 请求web服务器告知其支持的各种功能，查询服务器支持哪些方法，或对特殊资源支持哪些方法
7. DELETE 请求服务器删除请求url指定的资源

# 从浏览器地址栏输入URL到显示页面 —— 这个过程

1. 在浏览器地址栏输入URL
2. 浏览器查看缓存
  i. 如果资源未缓存，发起新请求
  ii. 如果有缓存，检验缓存 Expires(绝对时间) Cache-Control(max-age以秒为单位的最大时间)

3. 浏览器解析URL获取协议，主机，端口，path
4. 浏览器组装一个HTTP请求(GET)报文
5. 浏览器获取主机IP地址
  i. 浏览器缓存
  ii. 本机缓存
  iii. hosts文件
  iv. 路由器缓存
  v. ISP DNS缓存
  vi. DNS递归查询 （可能存在负载均衡导致每次IP不一样）

6. 打开一个socket与目标IP地址，端口建立TCP连接，三次握手：
  i. 客户端发送一个TCP的SYN=1, Seq=X的包到服务器端口
  ii. 服务端返回一个 ACK=Y+1, Seq=Y的响应包
  iii. 客户端发送ACK=Y+1, Seq=Z

7. TCP连接建立后发送HTTP请求
8. 服务器接受请求并解析，将请求转发到服务程序，如虚拟主机使用HTTP Host头部判断请求的服务程序
9. 服务器检查HTTP请求头是否包含缓存验证信息，如果验证存在，返回304等对应状态码
10. 处理程序读取完整请求并准备HTTP响应，可能需要查询数据库等操作
11. 服务器将响应报文通过TCP连接发送回浏览器
12. 浏览器接收HTTP响应后，根据情况选择关闭TCP连接或者保留重用
13. 浏览器检查响应状态码
14. 如果资源可缓存，进行缓存，no-cache no-store则不进行缓存
15. 对响应进行解码 gzip压缩
16. 根据资源类型决定如何处理 Content-Type: text/html mime类型 
  i. 解析html文档 - 构建DOM树 构造CSSOM树 下载相关资源 css js img等
    reflow repain
  ii. 解析js脚本
    * 浏览器创建document对象并解析html,将解析到的元素和文本节点添加到文档中，此时document.readystate为loading
    * 没遇到sync和defer的script时，将它们添加到文档继续(同步)执行脚本, 反之则下载脚本并继续解析
    * 文档完成解析, document.readyState变成ineteractive
    * 浏览器在document对象上触发DOMContentLoaded事件
    * 文档解析完成，可能还有图片等在加载，等这些内容完成载入且所有异步脚本载入执行后，document.readyState变为complete, window触发load事件
  
17. 显示页面（HTML解析过程中会逐步显示页面）


## 如何进行网站性能优化

从内容上：
1. 减少HTTP请求，合并文件，css spirits，base64 img
2. 减少DNS查询： 查询完成前浏览器不能从主机下载任何文件
  方法： DNS缓存、将资源分布到恰当数量的主机名，平衡并行下载和DNS查询
3. 避免重定向：多余的中间访问
4. 使Ajax可缓存
5. 非必须组件延迟加载
6. 未来所需组件预加载
7. 减少DOM元素数量（从而加快解析, css, js等的压缩同理）
8. 将资源放到不同域下： 浏览器同时从一个域下载的数目有限，增加域可提高并行下载量
9. 减少iframe数量
10. 减少404

从服务器：
1. 使用CDN
2. 添加Expires或Cache-Control响应头
3. 对组件使用Gzip压缩
4. 配置Etag
5. Ajax使用GET请求
6. 避免空src的标签
7. 减小cookie大小
8. 引入资源的域名不要包含cookie

css样式方面：
1. 样式表放页面顶部
2. 不用css表达式  !import等
3. 少hack 

JS方面：
1. 将脚本放底部
2. js css从外部引入
3. 压缩js css文件
4. 减少DOM的访问 reflow repain
5. 合理设计事件监听

图片方面
1. 优化图片 压缩
2. webp
3. 尽量不要在html中拉伸图片
4. 保证favicon.ico小且可缓存


## 什么是渐进增强

指web设计时强调可访问性、语义化HTML标签、外部样式表和脚本。保证所有人都能访问页面的基本内容和功能同时为高级浏览器和高宽带用户提供更好的用户体验
核心原则如下：

* 让大部分浏览器必须能访问基本内容
* 让大部分浏览器能使用基本功能
* 外部css提供增强布局
* 通过非侵入式、外部js提供增强功能

## HTTP状态码及其含义

1XX: 信息状态码
2XX: 成功状态码
3XX: 重定向
4XX: 客户端错误
5XX: 服务器错误
