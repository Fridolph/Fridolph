## 可缓存性

* public    HTTP返回内容所经过路径，都可对其内容进行缓存
* private   只有发起请求的浏览器才可对内容进行缓存
* no-cache  任何节点都不进行缓存(会经过服务端验证)
* max-age   缓存到期时间
* s-maxage  代替max-age，只在代理服务器中生效
* max-stale 当max-age过期后，还可使用过期缓存而不请求服务器

**重新验证**

* must-revalidate  在max-age已过期必须到源服务端发起请求获取数据
* proxy-revalidate 指定缓存服务器在过期时必须到源服务器重新发起请求

**其他**

* no-store  不缓存，每次都到服务端取
* no-transform

以上头只是起限制性和生命的作用，没有任何强制的约束力

---

浏览器 -> 创建请求 -> 本地缓存 -> 代理缓存 -> 源服务器

### 验证头


**强缓存**

* Cache-Control
* Expires

**协商缓存**

* Last-Modified 对比上次修改时间以验证资源是否需要更新，配合If-Modified-Since使用
* Etag 对比资源签名判断是否使用缓存，配合If-Match或者If-None-Match使用
