# NestJS AOP & 数据库实战

> 📚 **参考文档索引**（建议先掌握概念再来看实战）：
> - [中间件与守卫](/概念与原理/18nestjs/s_nestjs_5-middleware_guard) — 请求拦截与权限验证
> - [拦截器与管道](/概念与原理/18nestjs/s_nestjs_6-interceptor_pipe) — 响应转换与参数校验
> - [异常过滤器](/概念与原理/18nestjs/s_nestjs_7-exception_filter) — 统一异常处理
> - [TypeORM & Prisma](/概念与原理/18nestjs/s_nestjs_8-orm) — ORM 选型与实践
> - [控制器](/概念与原理/18nestjs/s_nestjs_3-controller) — 请求参数与 DTO 校验
>
> 以下问题考察 AOP 机制和数据库在生产环境中的实践。

## 1. 不同接口需要不同认证方式如何设计？

**场景**：用户端 API 用 JWT，第三方 API 接入用 API Key，公开接口（如登录）不需要认证。

::: details

```typescript
// 策略：组合多个 Guard，用 Reflector 标记需要的认证方式
export const AuthType = (type: 'jwt' | 'apikey' | 'none') =>
  SetMetadata('authType', type)

@Injectable()
export class CompositeAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtGuard: JwtAuthGuard,
    private apiKeyGuard: ApiKeyGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authType = this.reflector.get<string>('authType', context.getHandler())

    switch (authType) {
      case 'none': return true
      case 'apikey': return this.apiKeyGuard.canActivate(context)
      case 'jwt':
      default: return this.jwtGuard.canActivate(context)
    }
  }
}

// 使用
@Controller('users')
@UseGuards(CompositeAuthGuard)
export class UsersController {
  @Get('profile')
  @AuthType('jwt')       // 用户端，需要 JWT
  getProfile() {}

  @Get('public')
  @AuthType('none')      // 公开接口
  getPublic() {}
}

@Controller('api/v1')
@UseGuards(CompositeAuthGuard)
export class ApiV1Controller {
  @Get('data')
  @AuthType('apikey')    // 第三方，需要 API Key
  getData() {}
}
```
:::

## 2. 响应格式统一包装 + 特殊场景处理（分页/文件下载）

**场景**：统一返回 `{ code, message, data }`，但分页要多返回 `total`，文件下载不包装。

::: details

```typescript
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler()

    // 如果标记了 @RawResponse，跳过包装
    if (this.reflector.get('raw', handler)) {
      return next.handle()
    }

    return next.handle().pipe(
      map(data => {
        if (data instanceof StreamableFile) return data  // 文件下载不包装

        const isPaginated = data && typeof data === 'object' && 'items' in data

        return isPaginated ? {
          code: 0,
          message: 'success',
          data: data.items,
          total: data.total,
          page: data.page,
        } : {
          code: 0,
          message: 'success',
          data,
        }
      })
    )
  }
}

// 文件下载
@Get('export')
@RawResponse()
async export(@Res() res: Response) {
  const file = createReadStream('./report.xlsx')
  res.set({ 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  file.pipe(res)
}
```
:::

## 3. ValidationPipe 生产配置与嵌套校验

**场景**：DTO 中有嵌套对象和数组，需要深度校验。

::: details

```typescript
// 全局配置
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,              // 🔑 自动删除 DTO 未定义的属性
  forbidNonWhitelisted: true,   // 🔑 遇到未定义属性直接报错
  transform: true,              // 自动类型转换（字符串→数字）
  transformOptions: { enableImplicitConversion: true },
  stopAtFirstError: true,       // 第一个错误就停止，减少错误信息量
}))

// DTO 嵌套校验
import { ValidateNested, IsArray } from 'class-validator'
import { Type } from 'class-transformer'

class OrderItemDto {
  @IsString()
  productId: string

  @IsInt()
  @Min(1)
  quantity: number
}

export class CreateOrderDto {
  @IsString()
  userId: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)  // 🔑 必须加，否则 ValidateNested 对数组无效
  items: OrderItemDto[]
}
```

**为什么 Type(() => OrderItemDto) 是必须的**：TypeScript 的 class-validator 运行时无法获取泛型数组的类型信息，需要 class-transformer 的 `@Type()` 显式告知。
:::

## 4. TypeORM vs Prisma 真实选型对比

**场景**：新项目需要选择 ORM，技术负责人要求你给出分析。

::: details

| 维度 | TypeORM | Prisma | 结论 |
|------|---------|--------|------|
| Schema 定义 | 装饰器写在 Entity 类中 | `.prisma` 文件，更直观 | Prisma |
| 类型安全 | 手动维护 Entity | 自动生成，零额外代码 | Prisma |
| 关联查询 | `relations: ['posts']` 或 QueryBuilder | `include: { posts: true }` | Prisma 更简洁 |
| 复杂查询 | QueryBuilder 能力强 | Prisma Client 能力有限，需 `$queryRaw` | TypeORM |
| Migration | `typeorm migration:generate` | `prisma migrate dev` | 平手 |
| 生产坑 | 懒加载懒查询 N+1 问题 | `select` 默认全部字段，需手动指定 | 两者都有坑 |
| NestJS 集成 | `@nestjs/typeorm` 深度集成 | 需手动封装 Module | TypeORM |
| 社区趋势 | 成熟但缓慢 | 增长迅速 | Prisma |

**结论**：
- 新项目、团队人少、数据模型不太复杂 → **Prisma**
- 需要复杂 SQL 查询、团队已熟悉 TypeORM → **TypeORM**
- 大型项目 → 两者都行，团队共识更重要
:::

## 5. 数据库连接池设置与连接泄漏排查

**场景**：生产环境间歇性出现 `too many clients` 错误，服务重启后暂时恢复。

::: details

**连接池大小计算**：

```
max_connections = (core_count * 2) + effective_spindle_count

4核 + 1 SSD：约 10 连接（PostgreSQL 默认 100，通常够用）
```

Prisma 配置：
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  connection_limit = 10   // 不是越大越好
}
```

**连接泄漏排查**：

```typescript
// 添加连接日志
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    })
  }

  async onModuleInit() {
    await this.$connect()
    // 打印连接池状态
    setInterval(() => {
      console.log('Active connections:', /* 通过 PG stats 查询 */)
    }, 30000)
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
```

**常见泄漏原因**：
- 使用了 `$transaction` 但事务内抛出异常没有正确处理
- 手动创建了连接但没有释放
- ORM 配置的 `connection_limit` 超过数据库实际 max_connections
:::

> 参考：PostgreSQL 官方文档，Prisma 文档，TypeORM 文档
