# 提供者与依赖注入

## 概念

Provider（提供者）是由 NestJS 容器管理、通过 Token 查找的依赖。最常见的是 Service、Repository 等类，也可以是配置对象、已有实例或工厂返回的值。

**IoC（Inversion of Control，控制反转）是一种设计思想；DI（Dependency Injection，依赖注入）是实现它的常见方式。** 以依赖管理为例，业务类不再自己 `new` 数据库客户端，而是把依赖的组装交给外部，使用构造函数等方式接收依赖。

IoC 不局限于面向对象，也不等于某个装饰器；DI 也可以手动实现。NestJS 的容器进一步负责管理注册、解析、实例化和作用域，使对象的创建与使用分离。

本文代码主要是配置片段；示例中的 Controller、数据库与配置服务需要在实际应用中定义并注册。

## @Injectable

用 `@Injectable()` 标记类，配合编译元数据让容器解析类的依赖。**它不会扫描并自动注册项目中所有带此装饰器的类**，还需要模块注册或由导入模块导出。

```typescript
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,  // 自动注入
    private readonly config: ConfigService,  // 自动注入
  ) {}

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }
}
```

## 注册 Provider

在 Module 的 `providers` 数组中注册：

```typescript
@Module({
  controllers: [UsersController],
  providers: [UsersService],     // 简写
  exports: [UsersService],
})
```

等价于完整的 Token 写法：

```typescript
providers: [
  { provide: UsersService, useClass: UsersService },
]
```

`providers` 声明本模块提供什么；`exports` 声明哪些依赖可以被其他模块使用；消费方通过 `imports` 导入对应模块。上例的 PrismaService、ConfigService 同样必须在当前模块可见，不能仅靠 TypeScript 的 `import` 语句完成 DI 注册。

## DI 容器怎样工作？

```text
从根模块扫描 imports / providers / controllers 等模块元数据
  → 建立 Token 到 Provider 的注册关系与模块可见性
  → 根据构造参数元数据或 @Inject(Token) 解析依赖
  → 递归获取依赖，再创建消费方实例
  → 按 Provider 作用域管理和复用实例
```

创建默认作用域应用实例是启动过程的重要工作，请求作用域实例则随请求上下文创建；不是所有实例都在 `NestFactory.create()` 时一次创建完。异步工厂返回 Promise 时，容器会等待结果，再注入依赖它的组件。

### 为什么 interface 不能直接作为注入标识？

TypeScript 的 interface 在运行时会被擦除，容器无法拿它查找对象。可以使用类本身作为 Token，也可以显式使用字符串或 Symbol：

```typescript
import { Inject, Injectable, Module } from '@nestjs/common'

// 实际项目把 Token 和接口放在独立契约文件，供各模块共同导入
export const NOTE_STORE = Symbol('NOTE_STORE')

export interface NoteStore {
  save(title: string): Promise<void>
}

@Injectable()
export class MemoryNoteStore implements NoteStore {
  private readonly titles: string[] = []

  async save(title: string): Promise<void> {
    this.titles.push(title)
  }
}

@Injectable()
export class NotesService {
  constructor(@Inject(NOTE_STORE) private readonly store: NoteStore) {}

  async create(title: string): Promise<void> {
    await this.store.save(title)
  }
}

@Module({
  providers: [
    NotesService,
    { provide: NOTE_STORE, useClass: MemoryNoteStore },
  ],
  exports: [NotesService],
})
export class NotesModule {}
```

这里是内存教学实现，不会持久化数据。以后可将 `NOTE_STORE` 绑定到数据库仓储；测试时也可以替换成只记录调用和结果的替身。使用 Symbol 时，应导入同一个常量，不能在两处分别创建 `Symbol('NOTE_STORE')`，因为它们不是同一个 Token。

## 自定义 Provider

### useValue（注入常量）

```typescript
providers: [
  { provide: 'FEATURE_FLAGS', useValue: { enableNoteSearch: false } },
]
```

### useFactory（动态创建）

```typescript
providers: [
  {
    provide: 'DATABASE_URL',
    useFactory: (config: ConfigService) => {
      const host = config.get('DB_HOST')
      return `postgresql://${host}:5432/mydb`
    },
    inject: [ConfigService],
  },
]
```

### useExisting（给已有 Provider 起别名）

```typescript
providers: [
  MemoryNoteStore,
  { provide: NOTE_STORE, useExisting: MemoryNoteStore },
]
```

`useExisting` 复用已有 Provider；`useClass` 为该注册创建对应实现。把同一类重复注册到不同 Token 或模块，不应想当然认为会自动共享同一个实例。

### useClass（根据条件选类）

```typescript
providers: [
  {
    provide: LoggerService,
    useClass: process.env.NODE_ENV === 'production'
      ? ProdLoggerService
      : DevLoggerService,
  },
]
```

## Provider 作用域

| 作用域 | 行为 | 设计时注意 |
|--------|------|------|
| DEFAULT（默认） | 在同一注册和容器上下文中复用实例 | 通常优先使用；避免在实例字段保存请求私有数据 |
| REQUEST | 每个请求上下文获取独立实例 | 请求作用域依赖可能使依赖它的消费方也变成请求作用域 |
| TRANSIENT | 不同消费方获得各自实例 | 不是每次调用方法都创建实例；按消费者隔离有额外创建成本 |

```typescript
@Injectable({ scope: Scope.REQUEST })
export class TenantService {
  // 每个请求独立实例，可存储请求级上下文
}
```

上例的 `Scope` 需从 `@nestjs/common` 导入。单例是容器管理实例的语义，不是跨进程全局单例；多个应用实例、Worker 或容器副本不会共享同一块内存。请求作用域的 Provider 不参与应用级生命周期钩子，见[应用生命周期](/学习自测/18nestjs/q_nestjs_6-app_lifecycle)。

## 循环依赖

遇到循环依赖，优先检查职责：是否需要提取共享能力，或把用例协调放入第三个服务？确实无法消除时，可用 `forwardRef` 延迟引用解析。下面展示的是**模块之间**的双向引用：

```typescript
@Module({
  imports: [forwardRef(() => AuthModule)],
})
export class UsersModule {}

@Module({
  imports: [forwardRef(() => UsersModule)],
})
export class AuthModule {}
```

如果同时存在 Provider 构造函数互相注入，还需要在相应注入点使用 `@Inject(forwardRef(() => OtherService))`，并正确处理双方注册。它不会消除架构耦合，也不应依赖循环对象的构造先后顺序。

## 测试与依赖替换

`TestingModule` 可以通过 `.overrideProvider(NOTE_STORE).useValue(fakeStore)` 在编译测试模块前替换实现，从而测试 Service 的规则，不必每次连接真实数据库。不过这只能证明业务与替身交互正确；SQL、事务与约束仍需要数据库集成测试。参见[测试](./s_nestjs_9-testing)。

## 口述回顾

> IoC 是把依赖组装等控制权交给外部，DI 是通过构造函数等方式把依赖提供进来。Nest 先通过模块注册 Provider，再按 Token 和模块可见性解析依赖，按作用域管理实例。`@Injectable()` 不等于自动注册，接口也不能直接作为运行时 Token。这样业务类可以依赖抽象，测试时能替换数据库等外部依赖。

与 AOP 的区别见[基础认知自测](/学习自测/18nestjs/q_nestjs_5-basics)，更一般的编程思路见[OOP、FP、FRP 与 AOP](../16patterns/s_pn_24-programming_paradigms)。

## 面试常问

- useClass / useValue / useFactory / useExisting 分别解决什么问题？
- 类已经标记了 @Injectable，为什么仍然报无法解析依赖？
- useExisting 与 useClass 在实例复用上有什么区别？
- REQUEST scope 和默认 scope 的区别？什么场景需要 REQUEST？
- 循环依赖如何解决？forwardRef 的工作原理？

## 参考

- [NestJS: Providers](https://docs.nestjs.com/providers)
- [NestJS: Custom Providers](https://docs.nestjs.com/fundamentals/custom-providers)
- [NestJS: Injection scopes](https://docs.nestjs.com/fundamentals/injection-scopes)
- [NestJS: Circular dependency](https://docs.nestjs.com/fundamentals/circular-dependency)

> 来源：以上 NestJS 官方文档，结合依赖管理学习场景整理。
