## 基本代理

```bash
server {
  listen 80;
  server_name a.test.com;

  location / {
    proxy_pass http://127.0.0.1:8888;
    proxy_set_header Host $host;
  }
}
```

## 缓存配置

```bash
# 依次为 1.设置缓存路径  2.设置二级文件夹  3.缓存大小
proxy_cache_path cache levels=1:2 keys_zone=my_cache:10m;

server {
  listen 80;
  server_name a.test.com;

  location / {
    proxy_cache mycache;
    proxy_pass http://127.0.0.1:8888;
    proxy_set_header Host $host;
  }
}
```
