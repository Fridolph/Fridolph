# TypeORM & Prisma

## 概念

ORM（Object-Relational Mapping）帮助在关系数据与应用对象之间建立映射，不一定都使用 TypeScript 类定义模型。TypeORM 常用装饰器 Entity，Prisma 则通过 Schema 生成客户端。两者都是 NestJS 项目中常见的选择。

ORM 是实现数据访问的工具，不等同于 DAO / Repository 的职责设计；也不能代替索引、事务和 SQL 知识。概念区分见[MVC 与 DTO / DAO 分层](./s_nestjs_11-layering_dto_dao)。

## TypeORM

TypeORM 同时支持 Active Record 与 Data Mapper，可通过 `@nestjs/typeorm` 集成 NestJS。下面的普通 Entity 配合 Repository 使用，属于 Data Mapper 风格；Active Record 通常由实体继承 `BaseEntity` 并直接调用持久化方法。

```typescript
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ default: true })
  isActive: boolean

  @OneToMany(() => Post, post => post.author)
  posts: Post[]
}
```

Repository 模式：

```typescript
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } })
  }

  async findWithPosts(id: string) {
    return this.usersRepo.findOne({
      where: { id },
      relations: ['posts'],
    })
  }
}
```

## Prisma

Schema-first 方式，更直观：

```prisma
// prisma/schema.prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  isActive  Boolean  @default(true)
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String?
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
}
```

使用 Prisma Client：

```typescript
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async findWithPosts(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    })
  }
}
```

## TypeORM vs Prisma

| 维度 | TypeORM | Prisma |
|------|---------|--------|
| 设计方式 | Code First（装饰器） | Schema First（.prisma 文件） |
| TypeScript 类型 | 手动定义 | 自动生成（无额外代码） |
| 迁移（Migration） | `typeorm migration:generate` | `prisma migrate dev` |
| 关联查询 | relations 选项 | include 语法 |
| 学习曲线 | 较高（概念多） | 中等 |
| 查询性能 | 都需要关注 SQL、索引、关联加载与 N+1 | 都需要关注 SQL、索引、关联加载与 N+1 |
| 社区 | 成熟 | 快速增长 |
| NestJS 集成 | @nestjs/typeorm | 需手动封装 Module |

## 迁移最佳实践

**开发环境**：
```bash
# Prisma
prisma migrate dev --name add-user-table

# TypeORM
typeorm migration:generate -n AddUserTable
typeorm migration:run
```

**生产环境**：迁移应作为 CI/CD 的一部分，先备份数据库再执行。

## 面试常问

- TypeORM 和 Prisma 的核心设计差异？各适合什么场景？
- 如何处理 N+1 查询问题？
- 数据库迁移在生产环境的安全实践？

## 参考

- [TypeORM 文档](https://typeorm.io/)
- [Prisma 文档](https://www.prisma.io/docs)
- [NestJS: Database](https://docs.nestjs.com/techniques/database)
