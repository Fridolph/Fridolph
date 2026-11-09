# 控制器

## 概念

Controller 负责处理**入站 HTTP 请求**并返回响应。它是 NestJS 的"门口接待员"——接收请求、调用服务、返回结果。

## 路由装饰器

```typescript
import { Controller, Get, Post, Put, Delete, Param, Query, Body, HttpCode } from '@nestjs/common'

@Controller('users')  // 路由前缀 /users
export class UsersController {

  @Get()
  findAll(@Query('page') page?: number) {
    // GET /users?page=1
    return this.usersService.findAll(page)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // GET /users/42
    return this.usersService.findOne(id)
  }

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    // POST /users
    return this.usersService.create(createUserDto)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // PUT /users/42
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // DELETE /users/42
    return this.usersService.remove(id)
  }
}
```

## 请求参数提取

| 装饰器 | 提取来源 | 示例 |
|--------|---------|------|
| `@Param('id')` | 路由参数 | `/users/:id` |
| `@Query('page')` | 查询字符串 | `?page=1` |
| `@Body()` | 请求体 | POST/PUT body |
| `@Headers('token')` | 请求头 | |
| `@Req()` | 完整请求对象 | NestJS 包装的 Request |
| `@Res()` | 完整响应对象 | 需手动处理响应 |

## DTO（Data Transfer Object）

定义边界上的数据契约。下面定义请求字段与规则；要实际校验，还需注册 ValidationPipe 并配置对应校验库，TS 类型声明本身不能校验外部输入：

```typescript
import { IsString, IsEmail, IsInt, Min, Max, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsInt()
  @Min(0)
  @Max(150)
  age: number

  @IsOptional()
  @IsString()
  avatar?: string
}
```

DTO 也可以描述响应，不一定是数据库实体的子集。响应类型标注不会自动过滤敏感字段；应明确映射或配置序列化机制。完整说明见[MVC 与 DTO / DAO 分层](./s_nestjs_11-layering_dto_dao)。

## 控制器最佳实践

- Controller 只做**路由和请求处理**，不包含业务逻辑
- 业务逻辑放在 Service 中
- 善用 DTO + ValidationPipe 自动校验
- 返回值和参数都用 TypeScript 类型标注

## 面试常问

- Controller 的职责是什么？和 Service 如何分工？
- @Param 和 @Query 的区别？
- DTO 的作用？如何让校验自动生效？

## 参考

- [NestJS: Controllers](https://docs.nestjs.com/controllers)
- [class-validator 文档](https://github.com/typestack/class-validator)
