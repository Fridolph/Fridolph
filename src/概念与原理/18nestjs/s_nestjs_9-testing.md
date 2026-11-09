# NestJS 测试

## 概念

NestJS 内置了完整的测试工具链，默认使用 **Jest**，通过 `@nestjs/testing` 包的 `Test` 工具类创建测试模块。

## 单元测试

测试单个 Service——通过 Mock 隔离依赖：

```typescript
import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { PrismaService } from '../prisma/prisma.service'

describe('UsersService', () => {
  let service: UsersService
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  it('应该返回用户', async () => {
    const mockUser = { id: '1', name: 'John', email: 'john@test.com' }
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser)

    const result = await service.findOne('1')
    expect(result).toEqual(mockUser)
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } })
  })

  it('用户不存在应抛异常', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null)
    await expect(service.findOne('999')).rejects.toThrow()
  })
})
```

## E2E 测试

测试完整的 HTTP 请求-响应链路：

```typescript
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('UsersController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ name: 'John', email: 'john@test.com', age: 25 })
      .expect(201)
      .expect(res => {
        expect(res.body.name).toBe('John')
      })
  })

  it('/users/:id (GET) - 不存在应返回 404', () => {
    return request(app.getHttpServer())
      .get('/users/nonexistent')
      .expect(404)
  })
})
```

## overrideProvider 替换依赖

```typescript
const module = await Test.createTestingModule({
  imports: [UsersModule],
})
  .overrideProvider(DatabaseService)
  .useClass(MockDatabaseService)
  .compile()
```

## 测试策略

| 测试层级 | 范围 | 工具 | 比例 |
|---------|------|------|:--:|
| 单元测试 | 单个 Service/Guard/Pipe | Jest + Mock | 70% |
| 集成测试 | Module 内协作 | @nestjs/testing | 20% |
| E2E | 完整 HTTP 链路 | supertest | 10% |

## 面试常问

- NestJS 的 TestingModule 如何创建？overrideProvider 用途？
- 单元测试和 E2E 测试的区别及适用场景？
- 如何 Mock 数据库依赖进行单元测试？

## 参考

- [NestJS: Testing](https://docs.nestjs.com/fundamentals/testing)
- [Jest 官方文档](https://jestjs.io/)
