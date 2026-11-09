# NestJS 概述

## 概念

NestJS 是 Node.js 生态中以 TypeScript 为主要开发语言的服务端框架，底层默认使用 Express（也可切换为 Fastify）。它将 Angular 的模块化、依赖注入等设计理念引入服务端开发。

## 核心设计理念

### IoC（控制反转）

IoC 是把部分控制权交给框架或容器的设计思想。以依赖管理为例，业务对象不再自己创建依赖，由容器负责组装和管理；框架调度生命周期钩子也是理解控制反转的另一个角度。

### DI（依赖注入）

对象不自己创建依赖，而是由框架注入。这使代码松耦合、易测试。

```typescript
@Injectable()
class UserService {
  constructor(private readonly db: PrismaService) {}  // 自动注入
}
```

## NestJS vs Express vs Koa

| 维度 | Express | Koa | NestJS |
|------|---------|-----|--------|
| 设计理念 | 极简 | 极简 + async | 企业级架构 |
| TypeScript | 可选 | 可选 | 原生支持 |
| 模块化 | 无内置 | 无内置 | @Module 系统 |
| 依赖注入 | 无内置，可自行集成 | 无内置，可自行集成 | 内置 DI 容器 |
| 管道/守卫/拦截器 | 通过中间件或其他库组织 | 通过中间件或其他库组织 | 内置职责明确的扩展点 |
| 学习曲线 | 低 | 低 | 中高 |

## 项目结构

```
src/
├── main.ts              # 入口，创建 Nest 应用
├── app.module.ts        # 根模块
├── app.controller.ts    # 根控制器
├── app.service.ts       # 根服务
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── dto/             # 数据传输对象
```

## 第一个 NestJS 应用

```typescript
// main.ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()

// app.controller.ts
import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!'
  }
}
```

## 面试常问

继续学习：[编程范式 OOP / FP / FRP / AOP](../16patterns/s_pn_24-programming_paradigms)、[提供者与 DI](./s_nestjs_4-provider)、[MVC 与 DTO / DAO 分层](./s_nestjs_11-layering_dto_dao)。

- NestJS 和 Express/Koa 的核心区别？
- 什么是 IoC 和 DI？NestJS 如何实现？
- NestJS 为什么适合企业级应用？

## 参考

- [NestJS 官方文档](https://docs.nestjs.com/)
- [NestJS GitHub](https://github.com/nestjs/nest)
