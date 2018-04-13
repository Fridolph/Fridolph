## nginx默认配置语法

user  设置nginx服务的系统使用用户
worker_processes  工作进程数
error_log   nginx的错误日志
pid   nginx服务启动时候pid

events worker_connections  每个进程允许最大连接数
events use   工作进程数

默认配置语法：

```bash
http {
  server {
    listen 80;
    server_name localhost;

    location / {
      root /usr/share/nginx/html;
      index index.html index.htm;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
      root /usr/share/nginx/html;
    }
  }

  server {
    # ...
  }
}
```

