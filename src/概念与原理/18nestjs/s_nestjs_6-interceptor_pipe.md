# 拦截器与管道

## 概念

- **拦截器（Interceptor）**：在请求处理**前后**插入逻辑，用于响应转换、日志、缓存等
- **管道（Pipe）**：在请求到达 Controller **之前**，对参数做**校验和转换**

## 拦截器（Interceptor）

实现 `NestInterceptor` 接口：

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()

    return next.handle().pipe(
      tap(() => console.log(`耗时 ${Date.now() - now}ms`)),
      map(data => ({
        code: 0,
        message: 'success',
        data,
        timestamp: new Date().toISOString(),
      })),
    )
  }
}
```

### 常用场景

**统一响应格式**：

```typescript
// 原始返回 { name: 'John' }
// 拦截后返回 { code: 0, data: { name: 'John' }, message: 'success' }
```

**请求日志**：

```typescript
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest()
    console.log(`${req.method} ${req.url} - ${req.ip}`)
    return next.handle()
  }
}
```

**缓存**：

```typescript
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private cache: CacheService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const key = context.switchToHttp().getRequest().url
    const cached = await this.cache.get(key)
    if (cached) return of(cached)

    return next.handle().pipe(
      tap(data => this.cache.set(key, data, 60))
    )
  }
}
```

## 管道（Pipe）

实现 `PipeTransform` 接口：

```typescript
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string) {
    const val = parseInt(value, 10)
    if (isNaN(val)) throw new BadRequestException('必须是数字')
    return val
  }
}
```

### ValidationPipe

最常用的内置管道，配合 class-validator 自动校验：

```typescript
// 全局启用
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,          // 以校验装饰器确定允许的属性；单独使用会剥离额外属性
  forbidNonWhitelisted: true, // 配合白名单，拒绝额外属性
  transform: true,          // 将普通对象转换为 DTO 实例等；不保证所有字段自动转型
}))

// DTO 定义
export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name: string

  @IsEmail()
  email: string

  @IsInt()
  @Min(0)
  @Max(150)
  age: number
}
```

### 自定义管道

嵌套对象与数值转换需要显式设计，声明 TS 类型不等于运行时校验。参见[DTO 校验与分层边界](./s_nestjs_11-layering_dto_dao)。

```typescript
@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    const result = this.schema.safeParse(value)
    if (!result.success) {
      throw new BadRequestException(result.error.issues)
    }
    return result.data
  }
}

// 使用
@Post()
create(@Body(new ZodValidationPipe(createUserSchema)) dto: CreateUserDto) {}
```

## 执行顺序

```
Request → 中间件 → 守卫 → 拦截器(前) → 管道 → Handler → 拦截器(后)
```

拦截器可以在方法执行前后都有处理逻辑，管道只在执行前。

## 面试常问

- 拦截器和中间件的核心区别？执行顺序？
- ValidationPipe 的 `whitelist: true` 作用是什么？
- 如何实现统一响应格式包装？

## 参考

- [NestJS: Interceptors](https://docs.nestjs.com/interceptors)
- [NestJS: Pipes](https://docs.nestjs.com/pipes)
