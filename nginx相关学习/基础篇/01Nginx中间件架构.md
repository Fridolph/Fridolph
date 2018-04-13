## Nginx简述

Nginx是一个开源、高性能、可靠的HTTP中间件代理服务

### 常见的HTTP服务

* HTTPD - Apache 基金会
* IIS 微软
* GWS - Google

### 选择Nginx

参考资料 https://www.cnblogs.com/aspirant/p/6877350.html?utm_source=itdadao&utm_medium=referral

多线程，轮询 X

事件主动上报 -> 立即响应

---

**什么是IO多路复用**

多个描述符的IO操作都能再一个线程内并发交替地顺序完成，这就叫IO多路复用，这里的复用指的是复用同一个线程。

**IO多路复用epoll**

IO多路复用的实现方式： select、poll、epoll

select的缺点：
* 能够监视文件描述符的数量存在最大限制
* 线性扫描效率低下

**epoll模型**

每当FD就绪，采用系统的回调函数之间将FD放入，效率更高
最大连接无限制

2. 轻量级

3. CPU亲和
  是一种把CPU核心和Nginx工作进程绑定方式，把每个worker进程固定在一个CPU上执行，减少切换CPU的cache miss获得更好的性能

4. sendfile机制
  把文件传输通过内核直接传输给socket

