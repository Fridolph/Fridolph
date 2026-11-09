# 模块系统

## 概念

Module 是 NestJS 架构的核心组织单元。每个应用至少有一个根模块（Root Module），其他功能模块围绕根模块组织。

## @Module 装饰器

```typescript
import { Module } from '@nestjs/common'

@Module({
  imports: [],        // 导入其他模块
  controllers: [],    // 该模块的控制器
  providers: [],      // 该模块的提供者（Service 等）
  exports: [],        // 导出给其他模块使用的提供者
})
export class UsersModule {}
```

## 模块类型

### 根模块（Root Module）

应用的入口模块：

```typescript
@Module({
  imports: [UsersModule, AuthModule, DatabaseModule],
})
export class AppModule {}
```

### 功能模块（Feature Module）

封装特定业务领域：

```typescript
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

### 共享模块（Shared Module）

被多个模块引用的通用能力：

```typescript
@Module({
  providers: [PrismaService],
  exports: [PrismaService],  // 关键：导出后才能被其他模块使用
})
export class DatabaseModule {}
```

### 全局模块（Global Module）

无需在 imports 中声明即可全局使用：

```typescript
@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
```

注意：全局模块应谨慎使用，通常只用于配置、数据库连接等基础能力。

### 动态模块（Dynamic Module）

需要外部参数配置的模块：

```typescript
@Module({})
export class DatabaseModule {
  static forRoot(config: DbConfig): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        { provide: 'DB_CONFIG', useValue: config },
        DatabaseService,
      ],
      exports: [DatabaseService],
    }
  }
}

// 使用
@Module({
  imports: [
    DatabaseModule.forRoot({ url: 'postgres://...', pool: 10 }),
  ],
})
```

## 模块间依赖关系

- Module A 的 providers 对 Module B **不可见**，除非 A 通过 `exports` 导出
- Module B 需要在 `imports` 中引入 Module A 才能使用其 exports

## 面试常问

- @Module 的四个属性分别是什么用途？
- 动态模块的典型应用场景？
- 全局模块适合放什么？为什么不建议过多使用？

## 参考

- [NestJS: Modules](https://docs.nestjs.com/modules)
