```yaml
apps:
  - script: ./server/server.js
    name: vue-todo
    env_production:
      NODE_ENV: production
      HOST: localhost
      PORT: 7000
```

npm i pm2 -g 全局安装pm2

pm2 start pm2.yml --env production 就可以用pm2启动进程了
pm2 restart @name  重启服务
pm2 stop @name 停止服务
pm2 list 查看已经启动的服务
pm2 log @name 查看日志
pm2 delete @name

---

yum install nginx

cd /etc/nginx 
cd conf.d

新项nginx 配置，对应 项目的名字

