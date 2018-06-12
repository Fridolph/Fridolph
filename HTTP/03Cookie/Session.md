## Session定义

在Web开发中，服务器可以为每个用户浏览器创建一个会话对象(session对象)。注意：一个浏览器独占一个session对象（默认）。因此，在需要保存用户数据时，服务器可以把用户数据写到用户浏览器独占的session中，当用户使用浏览器访问时，可以从用户的session中取出该用户的数据。

注：新开浏览器窗口会生成新的Session，子标签页除外。子标签页公用父窗口的Session

### Session用途

1. 记录用户登录与行为数据. 考虑到这些数据用户修改随意性大，没必要直接存到数据库
2. 用户执行刷新时，可直接根据session打开上次访问网页的状态，优化体验
3. 通过session把用户行为联系起来，构建出完整模型，进行数据挖掘

> session其实就是会话变量的保存地，只要是能使用变量的地方，都能使用session变量。一般地session就是像一个临时容器，来存放临时东西。


### Session和Cookie的区别和联系

> 具体来说cookie机制采用的是在客户端保持状态的方案，而session机制采用的是在服务端保存状态的方案。两者存储的都是用户相关行为信息

* cookie是把用户的数据写在本地浏览器上，其他网站也可以扫描使用该cookie，容易泄漏自己网站的用户隐私，且一般浏览器对单个网站站点有cookie数量与大小限制

* session是把用户数据写在用户独占的session上，存储在服务端，一般只将session的id存储在cookie中。但将数据存储在服务器，成本相对高些

* session是由服务端创建，开发人员可以在服务器上通过request对象拿到

* 一般情况，登录信息等重要信息存储在session中，其他信息存储在cookie中

### Session的实现原理

服务器会为每一个访问服务器的用户创建一个session对象，且把session对象的id保存在本地cookie上，只要用户再次访问服务器时，带着session id，服务器就会匹配用户在服务器上的session。根据session中的数据，还原用户上次的浏览状态或提供其他人性化服务。

### 浏览器禁用Cookie后如何实现Session

**URL地址重写**

原理是将用户session的id信息重写到url地址中。服务器能够解析重写后的url以获取sessionId。这样即时客户端不支持Cookie，也可以使用Session来记录用户状态。

### Session和Cookie有效时长

* session

服务器会把长时间没有活动的session从服务器内存中清除，此时session便失效。具体根据服务端设置

* cookie

主要内容包括：Key、value、过期时间、路径和域。路径与域一起构成cookie的作用范围，通过过期时间expires设置cookie的有效时长

> 若不设置过期时间，表示这个cookie的生命周期为浏览器的会话期间，关闭访问服务器的浏览器窗口，cookie就消失，一般称为会话cookie。若保存在内存中设置了过期时间，则cookie会存储在硬盘上直到超过有效时间