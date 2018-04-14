A记录 将域名映射到ip地址
CNAME 将一个域名 指向另一域名

---

pm2 list 查看pm2管理的进程

pm2 show app 查看进程的具体信息

---

## 配置Nginx反向代理Node.js端口


sudo service apache stop  管理权限停止apache服务
sudo service apache2 stop  

update-rc.d -f apache2 remove

sudo apt-get apache2 remove

sudo apt-get update

sudo apt-get install nginx 安装nginx

---

cd /etc/nginx
cd conf.d  pwd -> 新建一个配置文件

sudo vi imooc-com-8081.conf  域名 + 端口号， 对应哪个网站

```bash
upstream imooc {
  server 127.0.0.1:8081;
}

server {
  listen 80;
  server_name fridolph.wang; #定义使用的 地址访问

  location / {
    root /data/www/hexo; # 定义服务器的默认根目录位置
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-Nginx-Proxy true;
    # 这里就是设置要跳转的实际地址
    # proxy_pass http://fuyinsheng.top:8081;
    proxy_redirect off;
  }
}
```

保存后到上一文件夹 cd /etc/nginx   vi nginx.conf

include /etc/nginx/conf.d/*.conf; 有这一行，不用管

sudo nginx -t 检查nginx有没配置错误

通过之后重启 nginx 服务  sudo nginx -s reload

vi nginx.conf  -> server_tokens off 把注释取消， 前端查看 nginx版本信息就不会暴露太多

