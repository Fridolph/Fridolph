# 后端约定（apps/api）

## 1. 这份文档要回答什么

不是"目录该怎么建"，而是 **"怎么保证写到第十个接口时还看得懂"**。
目录只回答"文件往哪放"，它不回答"东西长什么样"—— 后者要靠契约。

## 2. 为什么「目录骨架齐备」还是会乱

参考项目 `/apps/ww-server` 的骨架本身没错（`domain / application / infrastructure / transport`）。
但把它的 `common/` 逐文件读完，问题一目了然 —— **同一个"响应"有六份定义**：

| 文件                                       | 输出形状                                            |
| ------------------------------------------ | --------------------------------------------------- |
| `interceptors/response.interceptor.ts`     | `{ code, message, data, timestamp, path }`          |
| `filters/all-exceptions.filter.ts`         | `{ code, message, data, timestamp, path, error? }`  |
| `filters/http-exception.filter.ts`         | **`{ success, message }`**（完全不同的形状）        |
| `filters/unauthorized-exception.filter.ts` | **`{ success, message }`**（同上）                  |
| `utils/response.util.ts`                   | `{ code, message, data, timestamp }`（少了 `path`） |
| `dto/response.dto.ts`                      | 定义了 `ResponseDto`，**没有任何地方使用**          |

四条可复现的判断（不只是"写得乱"，而是**会反复复发**的机制）：

1. **同一件事存在多份实现** → 后来者不知道哪份是权威，于是各写各的；`ResponseDto` 就是这样被绕过去的。
2. **按"类型"而非"职责"切分** → 三个 `@Catch()` 各自成体系，401 与 500 各走一套形状；
   前端于是必须为每种状态写一套解析，而"解析"的分叉迟早会漏。
3. **框架机制会放大这个错误**：Nest 的异常过滤器**具体优先于泛化**，
   所以 `@Catch(UnauthorizedException)` 会**抢走**本该由统一过滤器处理的分支。
   也就是说 —— **多加一个 filter 往往不是"增加能力"，而是"悄悄修改契约"**。
4. **便利的默认值伪装成安全的默认值**：`config.get('JWT_SECRET') || 'wwzhidao-secret-key'`
   本地跑得通；生产忘了配环境变量，就用一个人人可见的字符串签发 token —— **不报错、不告警**。

> 一句话：**结构越齐整、契约越模糊，分歧就越隐蔽。**
> 所以本仓的做法是：先把契约钉死（§3），再谈目录（§4）。

## 3. 契约

### 3.1 唯一响应形状

成功与失败**同一个形状**，靠 `code` 区分；契约定义在 `packages/common/src/index.ts`（前端与后端共用）。

```jsonc
// 成功
{ "code": 200, "data": { /* ... */ }, "message": "ok", "timestamp": "…", "traceId": "…" }

// 失败（同形状 + 定位字段）
{
  "code": 401, "data": null, "message": "未携带访问令牌",
  "timestamp": "…", "path": "/api/auth/me",
  "errorCode": "AUTH.Token:missing", "traceId": "…"
}
```

出口只有两个，且都走同一份契约：

| 场景       | 出口                                                                    |
| ---------- | ----------------------------------------------------------------------- |
| 正常返回   | `ApiResponseInterceptor` → `createApiResponse()`（`code = 200`）        |
| 抛任何异常 | `ApiExceptionFilter`（**唯一一个 `@Catch()`**）→ `createApiErrorBody()` |

**不要新增 `@Catch(HttpException)` 之类的过滤器** —— 理由见 §2 第 3 条。

#### `code` 与 HTTP 状态码：两个不同的东西

|                 | 在哪                         | 表达什么                                                   |
| --------------- | ---------------------------- | ---------------------------------------------------------- |
| **HTTP 状态码** | 响应**行** `HTTP/1.1 200 OK` | 这次请求在**协议层**的结局：到没到、方法对不对、资源在不在 |
| **`code`**      | 响应**体**                   | 这次业务在**语义层**的结局                                 |

两者数值目前保持一致（HTTP 500 ↔ `code 500`），因为这样"看一眼就能对上"、排查最省事。
但它们是**独立设置**的：`response.status()` 由框架按协议层结局给出，`code` 由业务决定 ——
将来出现「HTTP 仍是 200、但业务失败」的接口（如"批量导入部分成功"）时，只改 `code` 即可。

码表在 `packages/common` 的 `API_CODE`（**共享**，不是后端私有 —— 前端也要判断成功与否）。

#### 前端判断成功请用 `isApiSuccess()`

```ts
import { isApiSuccess } from '@template/common'
if (response.ok && payload && isApiSuccess(payload)) {
  /* ... */
}
```

不要自己写 `payload.code === 200`：成功的边界将来可能调整（例如引入 `204` 表示"成功但无数据"），
收在一个函数里改一次即可，散落各处就会有人漏改。

### 3.2 两套码的分工：`code`（粗）与 `errorCode`（细）

它们**不是重复**，而是给前端两种粒度的判断依据：

|             | 例                                          | 用途                                         |
| ----------- | ------------------------------------------- | -------------------------------------------- |
| `code`      | `401`                                       | **类目**：这是"认证问题"，可以统一引导去登录 |
| `errorCode` | `AUTH.Token:missing` / `AUTH.Token:expired` | **具体原因**：过期就尝试刷新，缺失就直接登出 |

只给 `code` 的话，前端分不清"没带令牌"和"令牌过期"；只给 `errorCode` 的话，
又要为每个字符串维护映射才能知道该跳登录还是跳首页。两个都给，谁都不必猜。

- 命名沿用权限键的 `<域>.<资源>:<动作>` 风格：`AUTH.Token:expired`、`Common.Validation:failed`；
- 定义集中在 `apps/api/src/common/error-codes.ts`；
- 声明方式是 Nest 12 的官方途径：`throw new UnauthorizedException(msg, { errorCode: '…' })`；
- 没显式声明时，过滤器按 HTTP 状态**兜底推断**（`inferErrorCode`），保证前端永远拿得到码。

示例：`AUTH.Token:missing`（没带）/ `AUTH.Token:invalid`（伪造）/ `AUTH.Token:expired`（过期）——
分开是为了让前端能"过期的先刷新、伪造的直接登出"，而不是笼统一个 401。

### 3.3 鉴权

- **全局守卫 + 默认保护**：`JwtAuthGuard` 注册为 `APP_GUARD`，所有路由默认需要登录；
- **显式开放**：`@Public()` 标在方法或控制器上（登录、心跳这类）；
  漏标的后果是"需要登录"（安全一侧），反过来做的话漏标就是漏洞；
- **取当前用户**：`@CurrentUser()` / `@CurrentUser('nickname')`；
- **不使用 Passport**：自研守卫的全部逻辑 20 行、每行可读，少 3 个依赖与一层黑盒（详见 `jwt-auth.guard.ts` 注释）；
- **JWT 只放身份引用**：sub 为用户 cuid 主键，iat/exp 由库生成；JWT 是签名而非加密。每次按 sub 回查数据库恢复 email/nickname、角色和权限，不携带权限快照。

### 3.4 配置

- `ConfigModule.forRoot({ validate: validateEnv })`：**启动时**校验，缺项直接失败并指名道姓；
- **敏感项没有兜底默认值**（`JWT_SECRET` 缺失 → 启动失败）；非敏感项才有默认（`PORT` / `JWT_EXPIRES_IN`）；
- 业务代码统一 `configService.get(...)`，不直接摸 `process.env`（否则校验形同虚设）；
- 本机变量写 `.env`（不入库），需要的键在 `.env.example` 里列全。

### 3.5 请求上下文

- `TraceIdMiddleware` 给每个请求打 `traceId`（复用上游 `x-request-id`，否则生成），并回写响应头；
- 它在**守卫之前**执行 —— 所以连 401 的请求也有 traceId，日志能串起来（拦截器做不到这点）；
- 自定义字段（`req.traceId` / `req.user`）用 declaration merging 定义在 `common/http-context.ts`，全仓一处。

### 3.6 依赖注入的命名

**规则：注入的变量名 = 类名首字母小写。**

```ts
constructor(
  private readonly authService: AuthService,      // ✅
  private readonly configService: ConfigService,  // ✅
  private readonly prismaService: PrismaService,  // ✅
) {}

// ❌ constructor(private readonly auth: AuthService) {}
```

**为什么值得统一**：`this.auth` 这种"半截名字"在读代码时要回头翻构造函数才知道它是哪个类；
`this.authService` 自解释。类一多（`auth` / `authService` / `authGuard` 同时存在）时，
`this.` 后面那一截是辨认对象唯一可靠的线索 —— 命名在这一步省下的字，会在阅读时加倍还回去。

`private readonly` 两个修饰词也各有职责：`private` 表示不对外暴露，`readonly` 表示注入后不再替换
（依赖注入进来就应该是稳定的，重新赋值通常是 bug 的前兆）。
，而不是先把目录建好

本轮 `apps/api/src` 的形态：

```text
src/
├── common/               # 跨域公共设施：契约、错误码、过滤器、拦截器、中间件、请求上下文
├── config/               # 环境变量校验
├── auth/                 # 鉴权域
│   ├── decorators/       # @Public / @CurrentUser
│   ├── dto/              # 入参 DTO（class-validator）
│   ├── auth.controller.ts / auth.service.ts / auth.module.ts
│   └── jwt-auth.guard.ts
├── app.module.ts / app.controller.ts / main.ts
```

**暂时没有** `domain/` / `application/` / `infrastructure/`。这不是偷懒，而是判断：

> 那三层是**为"有领域规则"的模块准备的**。当模块只是在"取数据 → 返回"时，
> 一上来就铺四层，得到的是一堆只有一行 `return this.repo.x()` 的转发层 ——
> 它们不表达任何规则，只增加跳转次数，最后没人愿意维护（这正是"骨架齐备却读不懂"的另一种成因）。

**判据（什么时候引入下层）**：

| 出现这种情况                                                           | 才引入                         |
| ---------------------------------------------------------------------- | ------------------------------ |
| 有**不依赖框架的规则**（如"发布快照必须满足的约束"、"权限键校验"）     | `domain/`                      |
| 一个用例要**编排多个来源**（库 + 外部 API + 缓存），且逻辑值得单独命名 | `application/services/`        |
| 换了持久化实现（内存 → PostgreSQL / Redis），或要屏蔽第三方细节        | `infrastructure/repositories/` |
| 模块开始接收多种输入（HTTP + 队列 + 定时任务）                         | `transport/`                   |

`auth` 与 `user` 当前直接使用全局 PrismaService；仅当查询复杂或需要复用时引入平级 Repository，不因为使用数据库自动增加 infrastructure 层。

## 5. 加一个新接口的检查清单

- [ ] 控制器只做"取参 → 调 service → 返回数据"，不写业务规则、不手工拼响应体（拦截器会包壳）；
- [ ] 入参使用 Zod schema + z.infer DTO，通过 Nest StandardSchemaValidationPipe 校验并转换；strictObject 拒绝未声明字段；
- [ ] 需要登录就什么都不用做（全局守卫默认保护）；要开放就显式加 `@Public()` 并写清理由；
- [ ] 失败时抛 `HttpException` 子类，并给 `errorCode`（`error-codes.ts` 里登记常量）；
- [ ] 不要新增响应形状、不要新增异常过滤器；
- [ ] `pnpm --filter @template/api typecheck` + 用 `curl` 实测（成功 / 未授权 / 参数非法 三条路径）。

## 6. 技术选型（2026-10-09 定）

| 方面     | 选型                                  | 为什么                                                                                                      |
| -------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 数据库   | **PostgreSQL**                        | 简历数据是关系型（用户 → 简历 → 版本 → 权限），需要外键、唯一约束、事务；文档库能存，但约束得自己在代码里补 |
| ORM      | **Prisma**                            | schema 是**结构唯一真源** + `migrate` 成熟 + Studio 可视化；配 zod 生成器可把真源收敛成一条链               |
| 入参校验 | **Zod**（Nest 12 的 Standard Schema） | 校验规则与 TS 类型**同源**（`z.infer`），且纯值可共享给前端；替代 class-validator / class-transformer       |
| 鉴权     | **纯 `@nestjs/jwt` 自研 Guard**       | 少 3 个依赖、链路透明（见 §3.3）                                                                            |

### 6.1 为什么强调"单一真源链"

选型的关键不是"功能对比"，而是**别再造出多份真源**：

```text
schema.prisma ──generate──▶ Prisma Client 类型（数据库访问）
      │
      └──（待接 zod 生成器）──▶ Zod schema ──▶ 前端表单校验 + TS 类型
```

若 DB schema、Zod 校验、手写 TS 类型各存一份，就是参考项目 `common/` 里"六份响应定义"的同一种病。
⚠️ 生成 Zod 那一步**尚未接入** —— 等真有表、有接口要用时再加，现在接只会多一个要维护的生成器。

### 6.2 Prisma 7 的四处变化（都已踩过，务必按此写）

1. **`schema.prisma` 里不能再写 `url`** → 连接串移到 `prisma.config.ts` 的 `datasource.url`
   （报错原文：`The datasource property 'url' is no longer supported in schema files`）；
2. **generator 改名** `prisma-client-js` → `prisma-client`，且 **`output` 必填**；
   本项目 API 是 CJS，还要 `moduleFormat = "cjs"`；
3. **运行时必须传 driver adapter**（v7 移除了 Rust 查询引擎）：
   `@prisma/adapter-pg` 的 `new PrismaPg({ connectionString })` → `new PrismaClient({ adapter })`。
   ⚠️ **尚未安装**：本机还没有 PG 实例，装上也用不上；接 PrismaService 时一起加；
4. **`.env` 不再自动加载** → `prisma.config.ts` 里显式 `import 'dotenv/config'`。

> 连接串要写两处（CLI 一处、运行时 adapter 一处）是 v7 的**有意设计**，不是重复配置。

### 6.3 两个构建坑（各花了一次排查）

| 现象                                                                                    | 根因                                                                                                                                                                              | 处置                                                                 |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `prisma migrate dev` 之后，client 上 `prisma.permission` 之类的模型访问器是 `undefined` | v7 的 `migrate dev` **不会**顺带重新生成 client                                                                                                                                   | 迁移后手动跑一次 `pnpm exec prisma generate`（写进脚本，别靠记忆）   |
| `nest build` 退出码 0 但 `dist/` 是空的、`main.js` 不存在                               | `tsconfig` 的 `incremental: true` 与 `nest-cli.json` 的 `deleteOutDir: true` **互相打架**：build 先把 dist 删掉，增量缓存却认为"没变化"→ 一个文件都不输出。**这是必现，不是偶发** | 去掉 `incremental`（本项目规模全量编译足够快），换来"不会静默不输出" |
| 编译产物变成 `dist/src/main.js`                                                         | 新增 `prisma.config.ts`（在项目根）被 tsconfig 扫到 → TypeScript 推断的 `rootDir` 被拉高到项目根                                                                                  | `tsconfig.json` 明确 `include: ["src/**/*"]` + `rootDir: "src"`      |

### 6.5 数据模型：RBAC 五张表

```text
users ──< user_roles >── roles ──< role_permissions >── permissions
```

| 决定                                          | 理由                                                                                                       |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `UserRole` 做**多对多**（而非 `User.roleId`） | 现在只有两档角色，但"既是编辑又是审核"迟早出现；那时改表 + 改所有查询，比一开始就留一张关联表贵            |
| `Permission` 表由**代码常量 seed**            | 键名写在代码里能进类型、能被前端镜像、能 diff；库只维护"谁拥有它"的**关系**（避免再出现"多份真源"）        |
| **软删除** `deletedAt`                        | 可审计、可恢复；代价是每条查询都要带 `deletedAt: null` —— 因此该过滤**统一收在 repository 层**，不散到各处 |
| 密码用 `node:crypto` 的 scrypt                | 零依赖；存储格式 `scrypt$N$r$p$salt$hash` **把参数写进字符串**，将来调强参数时旧密码仍可验证、可静默升级   |

> 权限键常量在 `apps/api/src/auth/permission-keys.ts`，与前端 `apps/web/app/config/permissions.ts` 是**镜像**关系（理想做法是放 `packages/common`，待解决 ESM/CJS 后合并）。
