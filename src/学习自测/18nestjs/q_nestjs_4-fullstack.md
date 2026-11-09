# NestJS 全栈 & 部署实战

> 📚 **参考文档索引**（建议先掌握概念再来看实战）：
> - [全栈实践](/概念与原理/18nestjs/s_nestjs_10-fullstack) — 前后端协作、Swagger、WebSocket、部署
> - [测试](/概念与原理/18nestjs/s_nestjs_9-testing) — 单元测试/E2E 测试最佳实践
> - [TypeORM & Prisma](/概念与原理/18nestjs/s_nestjs_8-orm) — 数据库连接池与性能调优
> - [提供者与 DI](/概念与原理/18nestjs/s_nestjs_4-provider) — Provider 作用域与注入模式
> - [NestJS 概览](/概念与原理/18nestjs/s_nestjs_1-overview) — 项目结构与框架设计
>
> 以下问题考察 NestJS 在前后端协作和部署中的实践。

## 1. 前后端共享 DTO 类型的最佳实践？

**场景**：前端 TypeScript 项目，后端 NestJS。API 类型共享后，类型改了如何保证同步？

::: details

**Monorepo + shared package**：

```
packages/shared/src/
├── dto/
│   ├── create-user.dto.ts
│   └── update-user.dto.ts
├── types/
│   ├── api-response.ts
│   └── user.ts
└── index.ts
```

```typescript
// packages/shared/src/types/api-response.ts
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp: string
}

export interface PaginatedData<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}
```

**类型同步保障**：

1. **CI 检查**：`tsc --noEmit` 检查前后端类型一致性
2. **后端编译时生成 OpenAPI JSON** → 前端用 `openapi-typescript` 自动生成类型
3. **Git Hooks**：shared 包变化时触发前后端都重新类型检查

```bash
# 从 Swagger JSON 生成前端类型
npx openapi-typescript ./openapi.json -o ./src/api-types.ts
```
:::

## 2. Swagger 文档 + 自动生成前端 API 客户端

**场景**：手动维护 API 类型和管理前端请求代码，接口改动时经常忘更新。

::: details

```typescript
// NestJS Swagger 配置
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const config = new DocumentBuilder()
  .setTitle('FE Knowledge API')
  .setDescription('前端知识宝典后端API')
  .setVersion('1.0')
  .addBearerAuth()
  .addServer('http://localhost:3000', '本地环境')
  .addServer('https://api.example.com', '生产环境')
  .build()

const document = SwaggerModule.createDocument(app, config)
SwaggerModule.setup('api-docs', app, document)

// 导出 OpenAPI JSON（开发环境）
if (process.env.NODE_ENV === 'development') {
  writeFileSync('./openapi.json', JSON.stringify(document, null, 2))
}
```

**Controller 装饰器示例**：

```typescript
@ApiTags('用户管理')
@Controller('users')
export class UsersController {
  @Get()
  @ApiOperation({ summary: '获取用户列表' })
  @ApiQuery({ name: 'page', required: false })
  @ApiResponse({ status: 200, type: UserResponse })
  findAll(@Query('page') page?: number) {}

  @Post()
  @ApiOperation({ summary: '创建用户' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, type: UserResponse })
  create(@Body() dto: CreateUserDto) {}
}
```

**前端自动生成**：

```bash
npx @hey-api/openapi-ts -i ./openapi.json -o ./src/api -c @hey-api/client-fetch
```

自动生成类型安全的 API 调用函数，接口改了只需重新生成。
:::

## 3. 微服务场景下 NestJS 服务间通信选型

**场景**：系统需要拆分微服务，评估 TCP vs gRPC vs RabbitMQ。

::: details

| 通信方式 | 优点 | 缺点 | 适用 |
|---------|------|------|------|
| **TCP** | NestJS 内置，配置简单 | 不跨语言，无消息持久化 | 内部简单微服务 |
| **gRPC** | 高性能、跨语言、proto 强类型 | 学习曲线、浏览器不直接支持 | 高性能服务间调用 |
| **Redis** | 简单、支持发布订阅 | 消息可靠性不如 RabbitMQ | 简单事件通知 |
| **RabbitMQ** | 消息持久化、死信队列、重试 | 运维复杂 | 关键业务消息 |
| **Kafka** | 极高吞吐、消息回溯 | 重量级 | 日志/事件流 |

**NestJS 微服务模式**：

```typescript
// TCP
const app = await NestFactory.createMicroservice(AppModule, {
  transport: Transport.TCP,
  options: { host: '0.0.0.0', port: 3001 },
})

// gRPC
const app = await NestFactory.createMicroservice(AppModule, {
  transport: Transport.GRPC,
  options: { protoPath: 'proto/service.proto', package: 'users' },
})
```
:::

## 4. 生产部署：Docker + PM2 + Nginx

**场景**：NestJS 应用需要部署到生产环境，要求高可用。

::: details

**Dockerfile**：

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build

FROM node:20-alpine AS production
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

**PM2 配置**：

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'nest-app',
    script: './dist/main.js',
    instances: 'max',   // 使用所有 CPU 核心
    exec_mode: 'cluster',
    env: { NODE_ENV: 'production', PORT: 3000 },
    max_memory_restart: '2G',
    error_file: '/var/log/nest/err.log',
    out_file: '/var/log/nest/out.log',
  }],
}
```

**Nginx 反代**：

```nginx
upstream nest_upstream {
  least_conn;
  server 127.0.0.1:3000;
  server 127.0.0.1:3001;
  server 127.0.0.1:3002;
  server 127.0.0.1:3003;
}

server {
  listen 80;
  server_name api.example.com;
  client_max_body_size 100M;

  location / {
    proxy_pass http://nest_upstream;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_cache_bypass $http_upgrade;
  }

  # 前端静态资源（Nginx 直接托管）
  location / {
    root /var/www/client/dist;
    try_files $uri /index.html;
  }
}
```

**健康检查**：

```typescript
@Controller()
export class HealthController {
  @Get('health')
  @HealthCheck()
  check() {
    return { status: 'ok', uptime: process.uptime(), timestamp: new Date() }
  }
}
```

**优雅关闭**：
```typescript
// main.ts
let isShuttingDown = false
process.on('SIGTERM', async () => {
  if (isShuttingDown) return
  isShuttingDown = true
  console.log('Gracefully shutting down...')
  await app.close()
  process.exit(0)
})
```
:::

## 5. WebSocket 实时推送：消息已读、断线重连

**场景**：即时通讯功能，需要支持消息已读回执和断线后自动重连 + 补充离线消息。

::: details

**NestJS 服务端**：

```typescript
@WebSocketGateway({ cors: true, pingInterval: 10000, pingTimeout: 5000 })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private onlineUsers = new Map<string, Socket>()  // userId → socket

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string
    this.onlineUsers.set(userId, client)
    // 查询离线消息并推送
    this.pushOfflineMessages(userId, client)
  }

  handleDisconnect(client: Socket) {
    const userId = [...this.onlineUsers.entries()]
      .find(([, s]) => s === client)?.[0]
    if (userId) this.onlineUsers.delete(userId)
  }

  @SubscribeMessage('message:read')
  handleRead(@MessageBody() data: { messageId: string }, @ConnectedSocket() client: Socket) {
    // 标记消息已读，通知发送方
    const sender = this.onlineUsers.get(data.senderId)
    sender?.emit('message:read:ack', { messageId: data.messageId })
  }
}
```

**前端重连 + 离线兜底**：

```typescript
import { io, Socket } from 'socket.io-client'

let socket: Socket
let reconnectTimer: number

function connect(userId: string) {
  socket = io('wss://api.example.com', {
    query: { userId },
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 30000,
  })

  socket.on('connect', async () => {
    // 断线期间的离线消息通过 REST API 补拉
    const lastMessageId = getLastMessageId()
    const missed = await fetch(`/api/messages/since/${lastMessageId}`)
    // 渲染错过的消息
    missed.forEach(msg => renderMessage(msg))
  })

  socket.on('disconnect', (reason) => {
    console.warn('Socket 断开:', reason)
  })
}

// 心跳检测（WebSocket 层已内置 ping/pong，此为应用层兜底）
setInterval(() => {
  if (!socket.connected) connect(userId)
}, 5000)
```
:::

> 参考：NestJS WebSocket 文档，Socket.IO 文档，PM2 文档


## 部署知识延伸

通用的 Nginx、Docker、进程管理与发布回滚统一整理在[开发与部署](/概念与原理/20deploy/intro)；本篇保留 NestJS 业务上下文中的示例。
