# NestJS 生产场景实战

> 📚 **参考文档索引**（建议先掌握概念再来看实战）：
> - [NestJS 概览](/概念与原理/18nestjs/s_nestjs_1-overview) — 框架核心设计与项目结构
> - [中间件与守卫](/概念与原理/18nestjs/s_nestjs_5-middleware_guard) — 请求拦截与权限验证
> - [拦截器与管道](/概念与原理/18nestjs/s_nestjs_6-interceptor_pipe) — 日志/缓存/参数校验
> - [异常过滤器](/概念与原理/18nestjs/s_nestjs_7-exception_filter) — 统一错误码与异常处理
> - [全栈实践](/概念与原理/18nestjs/s_nestjs_10-fullstack) — 前后端协作与部署
>
> 以下问题模拟真实项目中 NestJS 开发会遇到的实际需求。

## 1. 设计多租户 SaaS 后端如何进行数据隔离？

**场景**：SaaS 平台服务多个企业客户，每个企业的数据需要完全隔离。如何设计多租户架构？

::: details

**数据隔离方案**：
- **Database 级别**：每个租户独立数据库（最强隔离，成本最高）
- **Schema 级别**：同一数据库不同 Schema（PostgreSQL 支持，中等隔离）
- **Row 级别**：所有数据同表，用 `tenant_id` 字段区分（最灵活，需应用层保障）

**NestJS REQUEST Scope 实现**：

```typescript
@Injectable({ scope: Scope.REQUEST })
export class TenantService {
  private tenantId: string

  constructor(@Inject(REQUEST) private req: Request) {
    this.tenantId = req.headers['x-tenant-id'] as string
  }
}
```

**动态数据源**：

```typescript
// 根据 tenantId 切换数据库连接
const getConnectionName = (tenantId: string) => `tenant_${tenantId}`

@Injectable()
export class DatabaseService {
  async getConnection(tenantId: string) {
    const name = getConnectionName(tenantId)
    try {
      return getConnection(name)
    } catch {
      return await createConnection({
        name,
        type: 'postgres',
        url: `postgres://user:pass@host/${tenantId}_db`,
      })
    }
  }
}
```
:::

## 2. 设计统一错误码体系覆盖业务异常和系统异常

**场景**：前端需要根据后端返回的错误码做差异化处理（1001=用户不存在，2001=库存不足），且所有异常格式统一。

::: details

```typescript
// 自定义业务异常
export class BusinessException extends HttpException {
  constructor(code: number, message: string, httpStatus: HttpStatus = 400) {
    super({ code, message }, httpStatus)
  }
}

// 错误码枚举
export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  PASSWORD_INVALID = 1002,
  STOCK_INSUFFICIENT = 2001,
  ORDER_EXPIRED = 3001,
}

// 使用
throw new BusinessException(ErrorCode.USER_NOT_FOUND, '用户不存在')
throw new BusinessException(ErrorCode.STOCK_INSUFFICIENT, '库存不足', HttpStatus.CONFLICT)
```

**全局异常过滤器**：

```typescript
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    if (exception instanceof BusinessException) {
      const res = exception.getResponse() as any
      response.status(exception.getStatus()).json({
        code: res.code,
        message: res.message,
      })
      return
    }

    // 处理 ValidationPipe 错误
    if (exception instanceof HttpException) {
      const status = exception.getStatus()
      const res = exception.getResponse()
      response.status(status).json({
        code: status,
        message: typeof res === 'string' ? res
          : Array.isArray(res['message']) ? res['message'].join('; ') : res['message'],
      })
      return
    }

    // 未预期的错误
    console.error(exception)
    response.status(500).json({ code: 500, message: '服务器内部错误' })
  }
}
```
:::

## 3. 设计全链路请求日志（零侵入）

**场景**：需要记录每个请求的方法、URL、耗时、用户信息、响应状态码，且不能在每个 Controller 手动加。

::: details

```typescript
// 请求日志拦截器
@Injectable()
export class RequestLogInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Request')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest()
    const { method, url } = req
    const userId = req.user?.id || 'anonymous'
    const start = Date.now()

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse()
        this.logger.log(
          `${method} ${url} ${res.statusCode} ${Date.now() - start}ms - user:${userId}`
        )
      }),
      catchError(err => {
        this.logger.warn(
          `${method} ${url} FAILED ${Date.now() - start}ms - user:${userId} - ${err.message}`
        )
        throw err
      })
    )
  }
}

// main.ts 全局注册
app.useGlobalInterceptors(new RequestLogInterceptor())
```

**进阶：结构化日志输出**（便于 ELK 采集）：

```typescript
this.logger.log({
  method, url, status: res.statusCode,
  duration: `${Date.now() - start}ms`,
  userId, timestamp: new Date().toISOString(),
})
```
:::

## 4. 接口限流：同一用户每分钟最多调用某接口 10 次

**场景**：防止恶意刷接口，需要基于用户维度的接口限流。

::: details

```typescript
import { Redis } from 'ioredis'

@Injectable()
export class ThrottleGuard implements CanActivate {
  constructor(
    private readonly redis: Redis,  // 或内存存储
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const limit = this.reflector.get<number>('throttleLimit', context.getHandler()) || 10
    const ttl = this.reflector.get<number>('throttleTTL', context.getHandler()) || 60

    const req = context.switchToHttp().getRequest()
    const key = `rate:${req.user?.id || req.ip}:${req.url}:${req.method}`

    const count = await this.redis.incr(key)
    if (count === 1) await this.redis.expire(key, ttl)

    if (count > limit) {
      throw new HttpException('请求过于频繁，请稍后再试', HttpStatus.TOO_MANY_REQUESTS)
    }
    return true
  }
}

// 装饰器
export const Throttle = (limit: number, ttl = 60) =>
  applyDecorators(
    SetMetadata('throttleLimit', limit),
    SetMetadata('throttleTTL', ttl),
    UseGuards(ThrottleGuard),
  )

// 使用
@Post()
@Throttle(5, 60)  // 60秒内最多5次
create() {}
```

**生产建议**：Redis 比内存方案可靠（多实例共享计数）；加入 `Retry-After` 响应头告知客户端何时可重试。
:::

## 5. 大文件分片上传 + 断点续传，前后端如何配合？

**场景**：用户上传 500MB 视频文件，需要支持断点续传。

::: details

**前端分片**：

```typescript
async function uploadFile(file: File, chunkSize = 5 * 1024 * 1024) {
  const totalChunks = Math.ceil(file.size / chunkSize)
  const fileId = `${Date.now()}_${file.name}`

  for (let i = 0; i < totalChunks; i++) {
    const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize)
    const form = new FormData()
    form.append('chunk', chunk)
    form.append('fileId', fileId)
    form.append('index', String(i))
    form.append('totalChunks', String(totalChunks))
    form.append('filename', file.name)

    await fetch('/api/upload/chunk', { method: 'POST', body: form })
  }

  // 通知后端合并
  await fetch('/api/upload/merge', {
    method: 'POST',
    body: JSON.stringify({ fileId, filename: file.name, totalChunks }),
    headers: { 'Content-Type': 'application/json' },
  })
}
```

**NestJS 后端**：

```typescript
const CHUNK_DIR = './uploads/chunks'

// 接收分片
@Post('chunk')
@UseInterceptors(FileInterceptor('chunk'))
async uploadChunk(@UploadedFile() chunk: Express.Multer.File, @Body() body) {
  const dir = join(CHUNK_DIR, body.fileId)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, body.index), chunk.buffer)
  return { received: body.index }
}

// 检查已上传分片（断点续传）
@Get('progress/:fileId')
async checkProgress(@Param('fileId') fileId: string) {
  const dir = join(CHUNK_DIR, fileId)
  if (!existsSync(dir)) return { uploaded: [] }
  return { uploaded: readdirSync(dir) }
}

// 合并分片
@Post('merge')
async mergeChunks(@Body() body: { fileId: string, filename: string, totalChunks: number }) {
  const dir = join(CHUNK_DIR, body.fileId)
  const dest = join(UPLOAD_DIR, body.filename)
  const writeStream = createWriteStream(dest)

  for (let i = 0; i < body.totalChunks; i++) {
    const chunkPath = join(dir, String(i))
    const data = readFileSync(chunkPath)
    writeStream.write(data)
  }
  writeStream.end()
  rmSync(dir, { recursive: true })  // 清理分片
  return { url: `/uploads/${body.filename}` }
}
```
:::

## 6. 设计 RBAC 权限系统：角色 + 接口权限

**场景**：系统有三种角色（admin/editor/viewer），不同角色能调用的 API 不同。

::: details

```typescript
// 角色装饰器
export const Roles = (...roles: string[]) => SetMetadata('roles', roles)

// 角色守卫
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles?.length) return true

    const { user } = context.switchToHttp().getRequest()
    return requiredRoles.some(role => user.roles?.includes(role))
  }
}

// 使用：守卫执行顺序——先验证身份，再检查权限
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  @Get()
  list() {}  // 不需要特殊角色

  @Post()
  @Roles('admin')
  create() {}  // 仅 admin

  @Delete(':id')
  @Roles('admin')
  remove() {}  // 仅 admin

  @Patch(':id')
  @Roles('admin', 'editor')
  update() {}  // admin 或 editor
}
```

**权限数据模型**：

```
Role: admin → permissions: [user:read, user:write, user:delete, ...]
Role: editor → permissions: [user:read, article:write, ...]
Role: viewer → permissions: [user:read, article:read, ...]
```
:::

> 参考：NestJS 官方文档，个人实践经验
