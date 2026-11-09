# 异常过滤器

## 概念

Exception Filter 是 NestJS 的**异常处理层**，负责捕获未被处理的异常并返回统一的错误响应格式。

## 内置异常

NestJS 提供了一系列标准 HTTP 异常：

```typescript
throw new HttpException('禁止访问', HttpStatus.FORBIDDEN)
throw new BadRequestException('参数错误')
throw new UnauthorizedException('未登录')
throw new NotFoundException('用户不存在')
throw new ForbiddenException('没有权限')
throw new ConflictException('数据冲突')
```

## 自定义异常过滤器

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = '服务器内部错误'

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      message = exception.message

      // 处理 ValidationPipe 的错误（数组格式）
      const res = exception.getResponse()
      if (typeof res === 'object' && 'message' in res) {
        message = Array.isArray(res.message) ? res.message.join('; ') : res.message
      }
    }

    response.status(status).json({
      code: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    })
  }
}
```

## 全局注册

```typescript
// main.ts
app.useGlobalFilters(new AllExceptionsFilter())

// 或使用 APP_FILTER Token（可注入依赖）
@Module({
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
```

## 统一错误码体系

在大型项目中，需要更精细的错误分类：

```typescript
// 自定义业务异常
export class BusinessException extends HttpException {
  constructor(code: number, message: string, httpStatus: HttpStatus = HttpStatus.BAD_REQUEST) {
    super({ code, message }, httpStatus)
  }
}

// 使用
throw new BusinessException(1001, '用户不存在')
throw new BusinessException(2001, '库存不足', HttpStatus.CONFLICT)
```

配合 ExceptionFilter 统一格式化：

```typescript
// 响应格式
{
  "code": 1001,
  "message": "用户不存在",
  "path": "/api/users/42",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 面试常问

- 如何实现全局统一错误响应格式？
- 如何区分业务异常和系统异常？
- 为什么用 APP_FILTER Token 而不是 useGlobalFilters？

## 参考

- [NestJS: Exception Filters](https://docs.nestjs.com/exception-filters)
