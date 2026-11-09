# 前端 + NestJS 全栈实践

## 概念

NestJS 作为企业级服务端框架，与前端框架配合可以构建完整的全栈应用。核心挑战在于**前后端类型共享、API 设计规范、部署协同**。

## 前后端类型共享

### Monorepo 结构

```
my-project/
├── packages/
│   ├── shared/          # 共享类型 + DTO
│   │   ├── src/
│   │   │   ├── types.ts
│   │   │   └── dto/
│   │   └── package.json
│   ├── server/          # NestJS 后端
│   └── client/          # React/Vue 前端
├── pnpm-workspace.yaml
└── package.json
```

```typescript
// packages/shared/src/dto/create-user.dto.ts
export class CreateUserDto {
  name: string
  email: string
  age: number
}

export interface UserResponse {
  id: string
  name: string
  email: string
  createdAt: string
}
```

前后端都从 `@my-project/shared` 导入类型，一处修改全局同步。

### API 响应类型

```typescript
// 统一的 API 响应格式
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
  timestamp: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  pageSize: number
}
```

## Swagger / OpenAPI

NestJS 内置 Swagger 支持，自动生成 API 文档：

```typescript
const config = new DocumentBuilder()
  .setTitle('API 文档')
  .setDescription('前端知识宝典 API')
  .setVersion('1.0')
  .addBearerAuth()
  .build()

const document = SwaggerModule.createDocument(app, config)
SwaggerModule.setup('api-docs', app, document)
```

前端可通过 `openapi-generator` 从 Swagger JSON 自动生成 API 客户端代码。

## 文件上传

NestJS 使用 Multer 处理文件上传：

```typescript
@Post('upload')
@UseInterceptors(FileInterceptor('file'))
uploadFile(@UploadedFile() file: Express.Multer.File) {
  // file.originalname, file.buffer, file.size, file.mimetype
  return { url: `https://cdn.example.com/${file.filename}` }
}
```

前端 FormData + fetch/axios：

```typescript
const formData = new FormData()
formData.append('file', file)
await fetch('/api/upload', { method: 'POST', body: formData })
```

## 实时通信

### WebSocket

NestJS 支持 Socket.IO：

```typescript
// 服务端
@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('message')
  handleMessage(@MessageBody() msg: string): void {
    this.server.emit('message', msg)
  }
}

// 前端
import { io } from 'socket.io-client'
const socket = io('http://localhost:3000')
socket.on('message', (msg) => console.log(msg))
```

### SSE（Server-Sent Events）

```typescript
@Sse('events')
sendEvents(): Observable<MessageEvent> {
  return interval(1000).pipe(
    map(() => ({ data: { time: new Date().toISOString() } })),
  )
}
```

## 部署

```
Nginx 反代 → NestJS (PM2 cluster) → PostgreSQL/Redis
              ↑
         前端静态资源（Nginx 直接托管）
```

Docker 化：

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --prod
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

## 面试常问

- 前后端共享 DTO 类型的最佳实践？类型不同步如何保障？
- Swagger 对于前后端协作的价值？
- NestJS 生产部署需要考虑哪些因素？

## 参考

- [NestJS: OpenAPI](https://docs.nestjs.com/openapi/introduction)
- [NestJS: WebSockets](https://docs.nestjs.com/websockets/gateways)


## 部署知识延伸

通用的 Nginx、Docker、进程管理与发布回滚统一整理在[开发与部署](/概念与原理/20deploy/intro)；本篇保留 NestJS 业务上下文中的示例。
