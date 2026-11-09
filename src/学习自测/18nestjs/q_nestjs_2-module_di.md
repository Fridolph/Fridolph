# NestJS 模块与依赖注入实战

> 📚 **参考文档索引**（建议先掌握概念再来看实战）：
> - [模块系统](/概念与原理/18nestjs/s_nestjs_2-module) — Module 的五大类型与依赖规则
> - [提供者与 DI](/概念与原理/18nestjs/s_nestjs_4-provider) — 注入方式、作用域、循环依赖
> - [控制器](/概念与原理/18nestjs/s_nestjs_3-controller) — 路由、DTO 校验、请求参数
> - [NestJS 概览](/概念与原理/18nestjs/s_nestjs_1-overview) — IoC 容器设计思想
>
> 以下问题考察对 NestJS DI 和模块系统的深入理解。

## 1. Default Scope 和 Request Scope 的区别与性能影响？

**场景**：你需要存储本次请求的一些上下文信息（如当前用户），考虑用 Request Scope 的 Provider。

::: details

**Default Scope（单例）**：

```typescript
@Injectable()  // 默认 scope: DEFAULT
export class UserService {
  // 整个应用生命周期内只有一个实例
  // 不能存请求级状态（所有请求共享）
}
```

**Request Scope**：

```typescript
@Injectable({ scope: Scope.REQUEST })
export class RequestContext {
  tenantId: string
  userId: string
  // 每个 HTTP 请求创建一个新实例
  // 可以安全存储请求级数据
}
```

**性能影响**：

| 维度 | Default | Request |
|------|---------|---------|
| 实例创建 | 仅一次 | 每次请求 |
| 内存 | 1 份 | N 个请求各 1 份 |
| GC 压力 | 无 | 请求结束后 GC |
| 使用限制 | 所有依赖它的 Provider 也必须是 Request scope |

**选择建议**：默认用 DEFAULT，仅在确实需要请求级状态时用 REQUEST。避免 Request Scope 污染整个依赖链。
:::

## 2. 两个 Service 互相依赖导致循环依赖如何解决？

**场景**：`UserService` 需要调用 `AuthService.generateToken()`，`AuthService` 需要调用 `UserService.findByEmail()`。

::: details

```typescript
// users.module.ts
@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

// auth.module.ts
@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

// Service 中
@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}
}
```

**除了 forwardRef 还有别的方案吗？**

1. **重构**：提取公共逻辑到共享 Service，两个 Service 都依赖它
2. **事件驱动**：用 NestJS EventEmitter 解耦，A 发事件，B 监听
3. **Facade Pattern**：引入第三层 Service 协调调用，打破直接循环

**原则**：出现循环依赖通常是设计问题——优先考虑重构而非 forwardRef。
:::

## 3. 动态模块的典型应用场景？

**场景**：数据库连接模块需要根据配置文件加载不同连接字符串，如何设计？

::: details

```typescript
@Module({})
export class DatabaseModule {
  static forRoot(config: DbConfig): DynamicModule {
    const providers = [
      { provide: 'DB_CONFIG', useValue: config },
      {
        provide: 'DB_CONNECTION',
        useFactory: async (cfg: DbConfig) => {
          return await createConnection(cfg.url, cfg.options)
        },
        inject: ['DB_CONFIG'],
      },
    ]

    return {
      module: DatabaseModule,
      providers,
      exports: providers,
      global: true,  // 全局可用
    }
  }

  // 异步版本——从 ConfigService 读取
  static forRootAsync(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'DB_CONNECTION',
          useFactory: (config: ConfigService) => {
            return createConnection(config.get('DB_URL'))
          },
          inject: [ConfigService],
        },
      ],
      exports: ['DB_CONNECTION'],
    }
  }
}

// 使用
@Module({
  imports: [
    DatabaseModule.forRoot({
      url: 'postgres://localhost:5432/mydb',
      options: { pool: { min: 2, max: 10 } },
    }),
    // 或
    DatabaseModule.forRootAsync(),
  ],
})
export class AppModule {}
```

**适用场景**：任何需要外部参数初始化的模块——数据库、消息队列、配置管理、自定义 Logger、缓存。
:::

## 4. Monorepo 中多个 NestJS 微服务如何共享 Prisma Client 和 DTO？

**场景**：Monorepo 中有 3 个 NestJS 服务（user-service、order-service、notification-service），需共享类型和数据库客户端。

::: details

```
monorepo/
├── packages/
│   ├── shared/
│   │   ├── src/
│   │   │   ├── dto/         # 共享 DTO
│   │   │   ├── interfaces/  # 共享接口
│   │   │   └── prisma/
│   │   │       └── schema.prisma
│   │   └── package.json
│   ├── user-service/
│   ├── order-service/
│   └── notification-service/
```

**Prisma Client 共享**：

```typescript
// packages/shared/src/prisma.service.ts
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }
}

// 各服务引用
import { PrismaService } from '@my-project/shared'

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
```

**DTO 类型共享**：

```typescript
// packages/shared/src/dto/create-user.dto.ts
export class CreateUserDto {
  @IsString()
  name: string

  @IsEmail()
  email: string
}

// user-service 中使用
import { CreateUserDto } from '@my-project/shared'
```

**版本一致性**：通过 pnpm workspace + `"@my-project/shared": "workspace:*"` 确保所有服务使用同一版本。
:::

> 参考：NestJS 官方文档，pnpm workspaces 文档
