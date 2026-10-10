# NestJS 模块开发模板

> 用于本项目的业务模块开发。每次只推进一个用例，先完成设计与伪代码，再实现和人工验证。

账号创建与登录的具体讨论、伪代码及 Apifox 请求见 [账号创建与登录业务讨论](./04_账号创建与登录_业务讨论.md)。

## 1. 先明确用例

开始写文件前，先回答：

```text
用例名称：
操作者：
目标：
输入：
成功结果：
拒绝条件：
本轮不处理：
```

不要先从 Controller 或 Prisma 查询开始。先明确“谁在什么条件下完成什么动作”，后面的文件才有边界。

## 2. 模块目录

业务模块默认采用扁平结构，基础模块与业务文件平级：

```text
<module>/
├── dto/
│   └── <module>.schema.ts
├── <module>.controller.ts
├── <module>.service.ts
├── <module>.repository.ts  # 仅在查询复杂或需要复用时添加
├── <module>.errors.ts       # 需要模块级持久化错误时添加
├── <module>.module.ts
└── README.md
```

不额外增加 `infrastructure/` 层。只有出现稳定的跨模块能力时，才考虑抽到 `common/` 或 `packages/common`。

## 3. 请求处理链路

```text
HTTP 请求
  ↓
Middleware：请求上下文、traceId
  ↓
全局 Guard：默认登录校验
  ↓
模块 Guard：角色与权限校验
  ↓
Schema/Pipe：运行时字段校验与规范化
  ↓
Controller：取参并调用 Service
  ↓
Service：编排一个完整业务用例
  ↓
PrismaService；复杂模块可改为 Repository
  ↓
Prisma Client
  ↓
PostgreSQL
```

成功结果由全局 `ApiResponseInterceptor` 包装；异常由全局 `ApiExceptionFilter` 统一包装。模块不自行返回另一套响应格式。

## 4. 各层只负责什么

| 层 | 负责 | 不负责 |
| --- | --- | --- |
| `dto/*.schema.ts` | 字段类型、格式、长度、默认值、输入规范化 | 查数据库、判断权限、执行写入 |
| `controller.ts` | 路径、HTTP 方法、参数绑定、Guard、调用 Service | 业务判断、密码哈希、Prisma 查询 |
| `Guard` | 当前请求是否已认证、是否具备该操作权限 | 创建数据、组装响应、数据库事务 |
| `service.ts` | 业务规则、用例步骤、业务错误、事务与 Prisma 操作 | Controller 细节、前端响应格式 |
| `repository.ts` | 仅在需要时承载复杂查询、复用查询或持久化隔离 | HTTP 状态码、前端文案 |
| `module.ts` | Controller、Service、Repository、Guard 的依赖注册与导出 | 业务逻辑 |
| `schema.prisma` | 数据模型、关系、数据库级约束 | HTTP 输入校验 |
| migration | 把结构变更应用到真实数据库 | TypeScript 类型生成 |
| `prisma generate` | 根据 schema 生成 Prisma Client 类型与 API | 创建或修改数据库表 |
| 全局异常 Filter | 统一错误响应、隐藏内部错误、记录日志 | 具体模块的业务决策 |

## 5. 推荐开发顺序

### 5.1 设计阶段

1. 写用例目标、非目标和拒绝条件。
2. 定义请求字段、响应字段和错误码。
3. 确认数据库实体、关系、唯一约束和软删除规则。
4. 写 Service 伪代码，明确每一步的职责。

### 5.2 实现阶段

1. 更新 `schema.prisma`。
2. 创建或修改 migration。
3. 编写 DTO/schema，完成输入校验和规范化。
4. 编写 Service，直接使用 PrismaService 串起业务步骤。
5. 如果查询复杂或需要复用，再抽出 Repository。
6. 编写 Controller、Guard 和 Module 接线。
7. 补充模块级错误映射与文档。

数据库约束与输入校验不是替代关系：校验改善请求体验，数据库约束保证并发下的数据不变量。

## 6. 创建类用例的标准伪代码

```text
Controller：
  接收 DTO
  交给全局/模块 Guard 判断访问资格
  调用 Service

Service：
  接收已通过 schema 的 DTO
  执行必要的业务预检查
  将 DTO 转换为持久化输入
  执行密码哈希等业务转换
  直接调用 PrismaService；复杂模块调用 Repository
  对需要业务语义的错误抛出 HttpException
  返回安全结果

Repository（可选）：
  承载复杂或复用查询
  使用 Prisma 写入
  需要时使用 nested write 或 transaction 保证原子性
  使用 select 排除密码哈希等敏感字段

全局异常 Filter：
  已知 HTTP/业务异常：返回对应状态和 errorCode
  未知异常：记录完整日志，向客户端返回统一 500
```

## 7. 错误边界

| 场景 | 处理层 | 对外结果 |
| --- | --- | --- |
| 字段缺失、格式错误、额外字段 | Schema/Pipe | 400 `Common.Validation:failed` |
| 没有 token | 全局 JWT Guard | 401 |
| 已登录但没有权限 | 模块 Guard | 403 |
| 资源不存在 | Service 根据 Repository 结果判断 | 404 |
| 唯一约束冲突 | 全局 Filter 转为通用冲突响应；需要字段级提示时由 Service 局部处理 | 409 |
| 未知数据库或程序异常 | 全局 Filter | 500，不暴露内部细节 |

Prisma 的 `P2002` 等错误码只属于数据库适配边界，不进入前端契约。全局 Filter 可将通用冲突转换为 `Common.Conflict:unique`；只有接口确实需要字段级提示时，才在 Service 局部转换。

不在每个方法里重复写错误响应。通用 ORM 错误由全局 Filter 统一输出；Filter 不猜测具体业务模块的含义。

## 8. Prisma 文件的关系

```text
schema.prisma
  ├── migrate deploy → 更新 PostgreSQL 的表、列、索引、外键
  ├── prisma generate → 更新 TypeScript Prisma Client
  └── prisma db seed  → 写入角色、权限、初始账号等数据
```

例如新增 `email String? @unique`：

1. `schema.prisma` 声明模型和唯一约束。
2. migration 写入 `ALTER TABLE` 与唯一索引。
3. `migrate deploy` 修改真实数据库。
4. `prisma generate` 让 `prisma.user.create()` 的输入和返回类型认识 `email`。
5. seed 只在需要初始化角色或账号时执行，不负责表结构。

## 9. 模块完成检查

```text
[ ] 用例、非目标和拒绝条件已明确
[ ] DTO/schema 与 API 契约一致
[ ] Service 直接操作 Prisma 时边界清晰
[ ] 若使用 Repository，其职责是复杂或复用查询
[ ] 数据库唯一约束覆盖并发下必须成立的规则
[ ] 用户与关联数据需要时使用原子写入
[ ] ORM 错误没有泄漏到前端
[ ] Controller 只负责 HTTP 接入
[ ] Module 注册了所有依赖
[ ] migration、generate、seed 的职责已区分
[ ] 模块 README 与业务讨论文档已同步
```

## 10. 本项目的学习协作方式

每个接口按以下循环推进：

```text
讨论模板
  → Owner 表达理解
  → AI 解释职责与风险
  → 完整伪代码
  → Owner 确认
  → 一层一层实现
  → Owner 人工验证
```

一次只解决一个用例。发现相邻问题时先记录，不顺手扩展；只有当前用例确实依赖它，才把依赖纳入本轮范围。

## 11. 既有项目参考结论

参考 `fullstack-mianshiwang/apps/ww-server/src/auth` 与 `src/common` 时，采用以下取舍：

- 保留单一全局异常 Filter 和单一响应 Interceptor，避免多个 Filter 产生不同响应格式。
- 响应类型、响应构造器和 Interceptor 只保留一个权威实现，避免 `ResponseDto`、`ResponseUtil`、Interceptor 各自维护一套结构。
- 通用 Prisma 错误由全局 Filter 转换；需要具体业务语义时，才由 Service 局部抛出业务异常。
- `@Public()` 与 JWT Guard 的职责可以复用；认证实现使用哪种策略由当前项目依赖与安全边界决定，不为了模仿旧项目强行引入 Passport。
- 敏感配置不使用公开默认值，尤其是 JWT 密钥；配置缺失应在启动阶段失败。
- 旧项目的实现用于解释取舍，不直接复制注释、目录或响应类型。

## 12. 方法注释与学习记录

模块方法使用多行 TSDoc，说明职责与必要的设计理由，便于学习和面试复盘。重点回答：为什么这样做、解决什么业务问题、依赖哪个约束、有哪些代价。

```ts
/**
 * 签发以 cuid 主键为 sub 的访问令牌。
 *
 * JWT 是签名而非加密，不放密码等敏感资料。
 * 权限每次按 sub 回查数据库，因此角色变化在下一次请求生效，
 * 代价是每次受保护请求需要身份查询；缓存与主动注销另行设计。
 */
```

不照抄旧注释：如果权限恢复策略变化，应同步更新描述。避免逐行复述语法；复杂流程与延伸问题写进讨论文档。DTO 参数使用对应类型的小驼峰名称，例如 `loginDto: LoginDto`。
