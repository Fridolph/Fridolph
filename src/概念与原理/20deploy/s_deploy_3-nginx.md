# Nginx、反向代理与 HTTPS

## 入口如何分工？

静态站点可以由 Nginx 直接读取文件，API 请求代理到 Node。反向代理隐藏上游部署位置，统一处理 TLS、访问日志、大小限制和超时；它不会自动解决业务认证、数据库瓶颈和应用一致性。

```text
浏览器 → HTTPS / Nginx → 静态文件
                     → /api/ → 127.0.0.1:3000 / NestJS → PostgreSQL
```

## 最小学习配置

以下是 HTTP 本机学习示意，配置需放在现有 `http` 块包含的 server 配置中。域名、路径、端口需按环境替换；不是可直接覆盖线上配置的完整文件。

```nginx
server {
    listen 80;
    server_name example.com;
    root /srv/my-app/current;

    location / {
        try_files $uri $uri/ =404;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 5s;
        proxy_read_timeout 60s;
    }
}
```

这里 `proxy_pass` 没有 URI 部分，会保留 `/api/` 前缀。改成 `http://127.0.0.1:3000/` 时，在这个前缀 location 下会用 `/` 替换 `/api/`。应用全局前缀与代理规则要一起验证，不能靠试着增删斜杠修复。

`try_files ... /index.html` 适合需要客户端路由回退的 SPA；多页面文档站通常应寻找实际 HTML 或返回 404。VitePress 的路径、cleanUrls 和部署 base 要与生成产物匹配。本项目当前发布到 GitHub Pages，不需要额外部署一台 Nginx。

## HTTPS 与信任边界

证书需要匹配域名、提供完整证书链并自动续期；先验证 HTTPS 可用，再把 HTTP 重定向到 HTTPS。TLS 终止在代理时，应用应仅信任指定代理提供的转发头，否则客户端可能伪造来源 IP 或协议。

- WebSocket 升级需要额外的 Upgrade / Connection 配置，普通 HTTP 代理示例并未涵盖。
- SSE / 流式 AI 输出要评估代理缓冲、空闲超时和客户端中断，不能照搬普通 JSON 接口设置。
- 请求体大小限制、上游超时与应用超时要协调；超时后的写操作可能已成功，重试要考虑幂等。

```bash
sudo nginx -t
sudo systemctl reload nginx
```

先检查再 reload，核对访问日志与错误日志。502 常指向上游连接失败或响应异常，504 常涉及等待超时；需要结合日志定位。worker 数和 `worker_connections` 还受文件描述符、上游连接、CPU 与负载约束，不能用固定“除以四”的公式推算承载量。

> 来源：[个人 Nginx 笔记](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/部署相关知识/nginx) 与 [HTTP 代理笔记](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/HTTP/05nginx代理配置)；[Nginx 官方指南](https://nginx.org/en/docs/beginners_guide.html)；[proxy_pass 文档](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass)。
