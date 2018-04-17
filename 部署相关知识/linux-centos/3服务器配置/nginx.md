yum install nginx -y 安装

ps -ef |grep nginx 查看nginx 是否启动

service nginx stop 服务停止

service nginx restart 服务重启

service nginx reload 服务重载


---

配置静态服务器

```bash
server {
  listen 80;
  server_name test.fridolph.wang;

  root /data/www;
  index index.html index.htm;

  # 实现伪静态操作
  location / {
    rewrite ^(.*)\.htmp$ /index.html; # 任意.htmp文件都转发到 /index.html上
  }
}
```

tail -f /var/log/nginx/access.log

### 反向代理

反向代理（Reverse Proxy）方式是指以代理服务器来接受internet上的连接请求，然后将请求转发给内部网络上的服务器。
并将从服务器上得到的结果返回给internet上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。

```bash
upstream aly {
  server www.fridolph.top;
}

server {
  listen 80;
  server_name test.fridolph.wang;

  root /data/www;
  index index.html index.htm;

  location / {
    proxy_set_header Host www.fridolph.top;
    proxy_pass http://aly;
  }
}
```

### 负载均衡

负载均衡 建立在现有网络结构之上，它提供了一种廉价有效透明的方法扩展网络设备和服务器的带宽、增加吞吐量、加强网络数据处理能力、提高网络的灵活性和可用性。

负载均衡，英文名称为Load Balance，其意思就是分摊到多个操作单元上进行执行，例如Web服务器、FTP服务器、企业关键应用服务器和其它关键任务服务器等，从而共同完成工作任务。

```bash
upstream aly {
  server www.fridolph.top:80 weight=5;
  server www.fridolph.wang:80 weight=1;
}

server {
  listen 80;
  server_name test.fridolph.wang;

  root /data/www;
  index index.html index.htm;

  location / {
    proxy_set_header Host www.fridolph.top;
    proxy_pass http://aly;
  }
}
```


### 调试技巧

```bash
upstream aly {
  server www.fridolph.top:80 weight=5;
  server www.fridolph.wang:80 weight=1;
}

server {
  listen 80;
  server_name test.fridolph.wang;

  add_header Content-Type "text/plain;charset=utf-8";

  root /data/www;
  index index.html index.htm;

  location / {
    proxy_set_header Host www.fridolph.top;
    proxy_pass http://aly;
  }
}
```
