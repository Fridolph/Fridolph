---

## 网络访问过程

* DNS解析 100~200ms可缓存
* 建立TCP连接 三次握手 100~200ms
* HTTP Request 半个RTT（Round-trip time 物理网络传输耗时）
* HTTP Response RTT不确定

### DNS

**网域名称系统**(Domain Name System)是互联网的一项服务。它作为将域名和IP地址相互映射的一个分布式数据库，能够使人更方便地访问互联网。

### TCP连接

TCP三次握手