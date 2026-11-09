# 中间件与守卫

## 概念

中间件和守卫都是 NestJS 的**请求拦截机制**，但职责不同：

- **中间件**：请求进入后的第一关，可访问 raw request/response
- **守卫**：在中间件之后、路由处理之前执行，主要用于**权限验证**

## 执行顺序

```
Request → 中间件 → 守卫 → 拦截器(前) → 管道 → Controller → 拦截器(后) → Response

未被当前执行链处理的异常 → 匹配的异常过滤器 / Nest 默认异常处理 → 错误响应
```

异常过滤器是异常分支，成功响应不必经过它。Guard 执行早于 Pipe，因此不能默认依赖已通过 DTO 校验的请求数据。完整说明见[请求生命周期](/学习自测/18nestjs/q_nestjs_7-request_lifecycle)。

## 中间件（Middleware）

实现 `NestMiddleware` 接口，处理原始请求/响应：

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.url} - ${Date.now()}`)
    next()
  }
}
```

### 注册中间件

```typescript
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('users')           // 特定路由
      // .forRoutes({ path: 'users', method: RequestMethod.POST })  // 特定方法+路由
      // .forRoutes('*')             // 所有路由
  }
}
```

### 适用场景

- 请求日志
- CORS 处理
- 请求体解析（body-parser）
- Cookie/Session 处理

## 守卫（Guard）

实现 `CanActivate` 接口，做权限验证：

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization?.split(' ')[1]

    if (!token) throw new UnauthorizedException('未登录')

    try {
      request.user = this.jwtService.verify(token)
      return true
    } catch {
      throw new UnauthorizedException('Token 无效')
    }
  }
}
```

### 使用守卫

```typescript
// 单一接口
@Get('profile')
@UseGuards(AuthGuard)
getProfile(@Req() req) { return req.user }

// 整个 Controller
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {}

// 自定义装饰器组合
const Auth = () => applyDecorators(UseGuards(AuthGuard), ApiBearerAuth())

@Get('profile')
@Auth()
getProfile() {}
```

### 角色守卫示例

```typescript
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) return true

    const { user } = context.switchToHttp().getRequest()
    return requiredRoles.some(role => user.roles?.includes(role))
  }
}

// 使用
@Roles('admin')
@UseGuards(AuthGuard, RolesGuard)
@Post()
create() {}
```

## 中间件 vs 守卫

| 维度 | 中间件 | 守卫 |
|------|--------|------|
| 访问原始 req/res | 可以 | 通过 ExecutionContext |
| 知道下一个 Handler | 不知道 | 知道 |
| 适用 | 日志/Body解析/通用处理 | 认证/授权/权限 |
| 返回 | 不返回（调用 next） | 返回 boolean |

## 面试常问

- 中间件和守卫的执行顺序？各适合什么场景？
- 如何实现 JWT 认证 Guard？
- 如何用装饰器 + Reflector 实现角色权限？

## 参考

- [NestJS: Middleware](https://docs.nestjs.com/middleware)
- [NestJS: Guards](https://docs.nestjs.com/guards)
