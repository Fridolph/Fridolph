# MVC 与分层：理解 DTO、DAO 和业务边界

> Module、Controller、Service 是 NestJS 的常见组织方式；MVC 是架构模式，DTO 是数据契约，DAO / Repository 负责数据访问。它们处在不同层面，可以配合使用。

## MVC 与 NestJS 的关系

MVC 是 Model–View–Controller，即模型、视图、控制器：

| 角色 | 核心职责 | 在 Web 应用中怎样理解 |
| --- | --- | --- |
| Model | 管理业务状态、规则与相关数据访问 | 不只是数据库表，也包含业务概念及约束 |
| View | 展示模型数据 | 服务端模板生成的 HTML 等 |
| Controller | 接收输入并协调模型与展示 | 识别请求，调用业务能力，返回结果 |

NestJS 可以借助 Express 适配器与 `hbs`（Handlebars）等模板引擎实现服务端 MVC，也可以使用 Pug、EJS 等适配的模板引擎。官方 HTTP 适配器主要是 **Express 与 Fastify**；Koa 并不是与它们等价的官方内置替换项，需要额外适配。

对于前后端分离的 REST API，通常由前端负责界面，Nest 返回 JSON，不一定存在服务端模板 View。Controller、Service、Repository 是常见的分层方式，不能机械地把三者分别等同于 MVC 的三个字母。

## DTO：定义一次数据交换的契约

DTO 是 Data Transfer Object，数据传输对象，用来说明边界上交换哪些数据，例如创建请求、列表查询参数或响应数据。

它不一定对应一张表，也不一定是某个实体的字段子集。例如注册 DTO 可以包含 `confirmPassword`，但数据库不应保存它；响应 DTO 可以包含多个来源计算出来的统计信息。

### DTO 的类型声明不等于运行时校验

外部 JSON 不会因为 TypeScript 标注就自动可信。`interface` 在运行时会被擦除；采用 Nest 内置 ValidationPipe 结合 class-validator 时，通常使用带校验装饰器的 class。

以下代码片段用于说明契约，需放入已有 NestJS 应用，配置 `class-validator` 与 `class-transformer` 后使用：

```ts
import { IsString, MaxLength, MinLength } from 'class-validator'

export class CreateNoteDto {
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  title!: string

  @IsString()
  @MaxLength(20000)
  content!: string
}
```

在 `main.ts` 创建 app 后注册：

```ts
import { ValidationPipe } from '@nestjs/common'

app.useGlobalPipes(new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
}))
```

- `whitelist` 依据 **class-validator 的校验装饰器**确定白名单，不是依据 TS 中是否声明了字段；需要保留但不限制的属性可使用 `@Allow()`。
- 配合 `forbidNonWhitelisted` 时，额外属性会被拒绝；仅启用白名单时，额外属性会被剥离。
- `transform` 可把普通对象转换成 DTO 实例，但不保证任意嵌套字段都自动转换、校验。嵌套对象通常还需 `@ValidateNested()` 与 `@Type()`；数字等应明确使用 `@Type(() => Number)` 或对应 Pipe。
- `@MinLength(1)` 会接受空格。若标题需要去空格，应明确规范化规则，并对规范化后的结果再次校验。

DTO 主要校验数据形状和输入约束；“笔记是不是我的”“当前状态是否允许修改”等规则仍需业务层处理，数据库也应维护唯一性、外键等最终约束。

### 请求 DTO 与响应 DTO 分开考虑

创建用户可能接收密码，但响应必须避免泄露密码哈希、重置令牌等字段。仅声明 `UserResponseDto` 返回类型不会自动过滤数据；需要显式映射，或正确配置序列化机制。

```ts
// 显式选择可返回的字段，而不是直接返回整个 ORM 实体
return { id: user.id, displayName: user.displayName }
```

## DAO、Repository、Entity 与 ORM 有什么不同？

| 概念 | 含义 | 例子 |
| --- | --- | --- |
| DAO | Data Access Object，封装持久化访问细节 | 查询、插入、更新和删除数据 |
| Repository | 通常以领域对象集合的方式提供访问接口 | `findOwnedById()`、`save()` |
| Entity / 持久化模型 | 表达领域对象或数据库映射，具体含义随架构而异 | TypeORM 的 `@Entity()` 类 |
| ORM | Object-Relational Mapping，辅助对象与关系数据映射的工具 | TypeORM、Prisma 等 |

DAO 与 Repository 的边界在项目中常被混用。学习阶段选一个清楚的命名即可，不需要为了术语同时叠加两层一模一样的转发。

**ORM 可以帮助实现数据访问层，但“用了 ORM”不等于已经设计好了 DAO。** TypeORM 的 Repository 可以直接供简单 Service 使用；查询复杂、需要隔离持久化细节时，再封装业务自己的仓储接口。

数据库异常可以在数据访问边界做有选择的转换，但不能把所有错误都吞掉并返回 `null`，否则无法区分不存在与连接故障。跨多个仓储操作的事务，也需要在业务用例层协调，确保参与操作使用同一个事务上下文。

TypeORM 可通过 Nest 官方维护的 `@nestjs/typeorm` 集成，但并不是 Nest 强制或唯一推荐使用的数据库方案。它支持 Active Record 与 Data Mapper；通过 Repository 使用普通 Entity 的例子属于 Data Mapper 风格。继续阅读[TypeORM 与 Prisma](./s_nestjs_8-orm)。

## 用一次“创建学习笔记”串起分层

```text
HTTP 请求
  → Middleware：请求上下文、requestId
  → Guard：验证身份与接口访问资格
  → Interceptor：进入阶段
  → Pipe：转换与校验 CreateNoteDto
  → Controller：读取身份与参数，调用用例
  → Service：检查业务规则、组织事务
  → Repository / DAO：使用 ORM 或参数化 SQL 访问 PostgreSQL
  → Service / Controller：映射需要返回的数据
  → Interceptor：返回阶段
  → HTTP 响应

未被当前执行链处理的异常 → 匹配的异常过滤器 / Nest 默认异常处理
```

这是常规 HTTP 处理路径，Service 和 Repository 是项目分层选择，不是 Nest 强制的生命周期步骤。Guard 在 Pipe 之前，因此不能默认认为 Guard 拿到的请求体已通过 DTO 校验。Redis 是可选的会话、缓存等基础设施，不是 Guard 必须依赖的组件。

几个值得守住的边界：

1. **身份来自可信认证上下文**：创建笔记的 `ownerId` 由服务端从已验证身份取得，不能信任客户端自行指定。
2. **控制器保持简洁**：负责 HTTP 输入输出；业务规则由 Service / 领域逻辑表达，数据访问由仓储承担。
3. **避免批量赋值越权**：不要把整个请求体直接合并进实体，明确允许修改的字段，尤其是角色、归属和状态。
4. **约束与并发共同考虑**：先查询再判断不能替代唯一约束；读版本再写入也不能替代带版本条件的原子更新。

## 口述回顾与进阶追问

> MVC 是模型、视图、控制器的架构划分。Nest 可以渲染模板，也可以只提供 JSON API。日常我会用 Controller 接收请求，Service 处理业务，Repository 封装数据访问。DTO 定义接口的数据契约，Entity 表达持久化映射，两者不应该直接混用。DAO 或 Repository 是访问层的设计，ORM 是实现它的工具；输入校验、业务权限和数据库约束也分别有自己的职责。

可以用下面的问题检验理解：

- 声明 DTO class 后，为什么非法请求仍可能进入 Service？
- 响应标注了 DTO 类型，为什么仍可能返回密码哈希？
- 两个请求同时创建相同邮箱，为什么应用层“先查一下”不够？
- 一个用例调用两个仓储，怎样保证它们共享事务？
- 查询笔记时，怎样避免只根据客户端传来的 `ownerId` 判断权限？

对应练习：[从需求到接口的最小闭环](/编码与实践/18nestjs/c_nestjs_1-service_design/c_nestjs_1-service_design)。已有简短回答：[IoC / DI / AOP](/学习自测/18nestjs/q_nestjs_5-basics)；完整时序：[请求生命周期](/学习自测/18nestjs/q_nestjs_7-request_lifecycle)。

> 来源：[NestJS：MVC](https://docs.nestjs.com/techniques/mvc)、[NestJS：Validation](https://docs.nestjs.com/techniques/validation)、[NestJS：Serialization](https://docs.nestjs.com/techniques/serialization)、[NestJS：Database](https://docs.nestjs.com/techniques/database)、[TypeORM：Active Record vs Data Mapper](https://typeorm.io/docs/guides/active-record-data-mapper/)
