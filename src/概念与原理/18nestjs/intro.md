# NestJS 学习入口

> 从前端经验走向服务端开发，整理 NestJS 的概念、分层与工程实践。当前收录 11 篇概念文章，随课程学习和实践持续补充。

## 零散笔记可以放在哪里？

| 内容 | 主要归属 | 原因 |
| --- | --- | --- |
| OOP、FP、FRP、AOP | [通用基础 → 编程模式](../16patterns/s_pn_24-programming_paradigms) | 可跨框架复用，结合 NestJS 举例理解 |
| IoC、DI、Provider 与容器 | [提供者与 DI](./s_nestjs_4-provider) | 补充已有概念文章，避免重复维护 |
| MVC、DTO、DAO 与 ORM 的关系 | [MVC 与分层](./s_nestjs_11-layering_dto_dao) | 说明请求、业务与持久化边界 |
| 需求分析、接口设计、模块、安全与测试 | [编码与实践 → 服务设计](/编码与实践/18nestjs/c_nestjs_1-service_design/c_nestjs_1-service_design) | 串成待实现、可验证的练习方案 |

建议先读编程范式与分层，再看 Provider 和请求生命周期，最后尝试完成设计练习。已有[基础认知自测](/学习自测/18nestjs/q_nestjs_5-basics)、[请求生命周期自测](/学习自测/18nestjs/q_nestjs_7-request_lifecycle)用于回顾；同一概念的详细解释主要维护在概念区。

## 目录

- :white_check_mark: [NestJS 概述](./s_nestjs_1-overview) — IoC/DI、与 Express/Koa 对比、设计理念
- :white_check_mark: [模块系统](./s_nestjs_2-module) — @Module、根/功能/共享/全局/动态模块
- :white_check_mark: [控制器](./s_nestjs_3-controller) — 路由装饰器、@Param/@Query/@Body、DTO
- :white_check_mark: [MVC 与 DTO / DAO 分层](./s_nestjs_11-layering_dto_dao) — 数据契约、运行时校验、ORM 与业务边界
- :white_check_mark: [提供者与 DI](./s_nestjs_4-provider) — @Injectable、自定义 Provider、作用域、循环依赖
- :white_check_mark: [中间件与守卫](./s_nestjs_5-middleware_guard) — 执行顺序、JWT 认证、角色权限
- :white_check_mark: [拦截器与管道](./s_nestjs_6-interceptor_pipe) — 响应转换、ValidationPipe、class-validator
- :white_check_mark: [异常过滤器](./s_nestjs_7-exception_filter) — 统一错误响应、业务异常、错误码体系
- :white_check_mark: [TypeORM & Prisma](./s_nestjs_8-orm) — Entity/Schema、Migration、选型对比
- :white_check_mark: [测试](./s_nestjs_9-testing) — 单元测试、E2E、TestingModule、Mock 依赖
- :white_check_mark: [全栈实践](./s_nestjs_10-fullstack) — 类型共享、Swagger、文件上传、WebSocket、部署
