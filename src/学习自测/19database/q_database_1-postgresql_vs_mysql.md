# PostgreSQL 与 MySQL 对比及选型

> 从面试角度理解两者的差异：先讲共同点，再讲代表性优势，最后结合业务解释选型。
> 比较范围：PostgreSQL 与使用 InnoDB 的现代 MySQL（以 8.0 / 8.4 为例）；具体能力仍需核对版本和配置。

## 1. PostgreSQL 和 MySQL 有什么区别？PostgreSQL 的优势是什么？

::: details 参考回答

PostgreSQL 和 MySQL 都是成熟的关系型数据库，MySQL 使用 InnoDB 时，同样支持事务、MVCC 和外键。

PG 比较突出的优势，我会从三个方面看。第一是类型和扩展能力，比如 JSONB、数组、范围类型，还有 PostGIS 这类扩展，适合比较复杂的数据建模。第二是查询和索引工具丰富，比如部分索引、表达式索引，以及适合 JSONB 等数据的 GIN 索引。第三是很多 DDL 可以放进事务里回滚，这对数据库迁移设计有帮助。

并发这块也有区别，比如 PG 默认是 Read Committed，MySQL InnoDB 默认是 Repeatable Read，快照和锁的行为不能直接照搬。

对我的学习项目，如果要做简历编辑这类业务，我会考虑用普通列保存用户、归属、版本号，把结构可变的模块内容放进 JSONB，所以倾向选择 PG。当然 MySQL 也能实现这些需求；团队已经熟悉 MySQL、业务又以常规 CRUD 为主时，继续用它也很合理。最终还要看运维成本和实际查询负载。

:::

**回答节奏**：控制在一到两分钟。先讲类型、索引和事务化 DDL，稍停一下；面试官继续关注时，再展开并发差异和项目选型。

**追问入口**：JSONB 和普通列怎么选？两种默认隔离级别下，重复读取有什么差异？DDL 能回滚是否代表改表没有风险？

## 先说明共同点

两者都支持事务、约束、MVCC、索引和查询优化，现代版本也都有 JSON、CTE、窗口函数等能力。

区别主要在于具体能力、实现方式和使用体验。不要把答案说成“只有 PG 有事务、复杂查询或 JSON 索引”，也不要承诺 PG 在任何业务中都更快。

## 五个值得展开的差异

### 类型与扩展：PG 的工具比较丰富

PG 除了常规类型，还支持数组、范围类型、JSONB 和自定义类型，也可以通过扩展增加能力，比如使用 PostGIS 处理地理空间数据。

索引方面，PG 提供 B-tree、GIN、GiST 等机制，分别适配不同的数据和查询方式。MySQL 也有 JSON、空间类型和空间索引；PG 的特色在于类型、操作符和索引机制之间有比较丰富的组合。

**面试表达**：业务涉及半结构化数据、范围重叠或地理空间查询时，PG 往往有比较完整的工具可选。

### JSONB：适合部分结构可变的数据

例如，简历中不同的自定义模块可能有不同字段：

```json
{
  "type": "customText",
  "data": {
    "title": "个人优势",
    "content": "熟悉 TypeScript 全栈开发"
  }
}
```

PG 的 JSONB 支持丰富的查询操作符，可以按查询需求选择 GIN 或表达式索引。MySQL 的 JSON 也采用内部存储格式，并非简单的文本存储；可以通过提取字段的生成列、符合条件的函数索引，以及针对 JSON 数组的多值索引支持查询。具体支持范围取决于版本、表达式和数据类型。

结合学习场景，可以这样划分：

- 用户 ID、简历归属、版本号等稳定字段：使用普通列，方便约束、关联和索引。
- 字段结构随模块变化的内容：可以考虑 JSONB。
- 经常过滤、关联或需要严格约束的字段：优先评估是否应提取为普通列。

**JSONB 是关系模型的补充。** 它不替代数据建模，也不是加一个 GIN 索引就能优化所有 JSON 查询；索引是否有效，要看操作符、表达式和执行计划。

### MVCC 与并发：默认值和实现都有差异

| 对比项 | PostgreSQL | MySQL InnoDB |
| --- | --- | --- |
| 默认隔离级别 | Read Committed，可配置 | Repeatable Read，可配置 |
| 普通快照读 | 默认级别下，每条语句获取自己的快照 | 默认级别下，通常复用事务内首次一致性读建立的快照 |
| MVCC 的典型实现 | 表中保留不同元组版本，通过可见性规则选择版本 | 结合 undo 日志和 Read View 查找或重建可见版本 |
| 旧版本清理 | VACUUM / autovacuum 回收可清理的死元组空间供复用 | purge 等机制清理不再需要的历史版本 |
| 并发控制特点 | Serializable 使用 SSI 检测危险依赖，可能中止事务 | Repeatable Read 下，部分范围锁定读和写操作会涉及间隙锁、next-key lock |

这里的读取对比针对**普通一致性读取**，不能直接套用到 `SELECT ... FOR UPDATE` 等锁定读；长事务也可能阻碍旧版本清理。PG 的常规 VACUUM 通常用于让空间复用，不意味着立刻缩小数据文件。

**面试表达**：同一段 SQL，在两个数据库里可能有不同的可见性和锁行为。两者都可能出现锁等待或死锁，都需要控制事务长度，并按错误类型设计重试。

### 事务化 DDL：很多结构变更可以回滚

在 PG 中，很多建表、改表操作可以放进事务：

```sql
-- 假设 resumes 表已存在，且没有 remark 列
BEGIN;

ALTER TABLE resumes ADD COLUMN remark TEXT;

ROLLBACK;
```

回滚后，新增列的操作也会撤销。MySQL 的许多 DDL 则会触发隐式提交，不能通过用户事务中的 `ROLLBACK` 撤销。

需要记住三个边界：

- PG 并非所有 DDL 都能在事务块中执行，例如 `CREATE DATABASE` 和 `CREATE INDEX CONCURRENTLY` 就有这类限制。
- MySQL 的 atomic DDL 保证支持范围内的 DDL 自身及相关元数据等作为整体成功或失败，不等于用户可以用 `ROLLBACK` 撤销已经成功的 DDL。
- PG 的 DDL 即使能回滚，也可能持锁；长时间不结束事务，仍可能阻塞其他请求。

**面试表达**：事务化 DDL 为迁移提供了更多选择，但迁移仍要评估锁、执行时间和上线方案。

### 复杂查询与索引：工具丰富，性能仍需验证

PG 提供部分索引、表达式索引、物化视图等能力，适合复杂条件查询、聚合和数据建模。比如只给“未删除记录”建立部分索引，可以围绕实际查询减少索引覆盖的数据范围。

现代 MySQL 同样支持 CTE、窗口函数和符合条件的函数索引，不能把这些当作 PG 独有能力。

**面试表达**：PG 在高级查询和数据建模上工具比较丰富，但具体性能仍要通过执行计划、索引设计和真实负载验证。

## MySQL 的优势，以及如何选型

MySQL 在 Web 业务中使用广泛，工具、托管服务和运维生态成熟，对常规 CRUD 也能很好地满足需求。对于已经积累了 MySQL 经验和运维体系的团队，延续现有技术栈往往更省成本。

PG 也有成熟的 Web 和云服务生态，两者没有严格的应用领域分界。选择时可以依次考虑：

1. **业务能力**：是否依赖 JSONB 操作、范围类型、PostGIS 或特定索引等能力？
2. **数据与查询**：数据怎么建模，主要查询是什么，真实负载下表现如何？
3. **团队与运维**：谁负责备份恢复、监控、升级和故障处理？现有经验是否可以复用？

当前仓库是 VitePress 面试知识库，上述“简历编辑服务”是用于说明选型的学习示例。面试时应结合自己实际做过的功能、测过的负载来回答，避免把计划中的能力说成已经落地。

## 后续学习与追问

先围绕这四个问题逐步深入：

1. 哪些字段用普通列，哪些适合 JSONB？
2. 事务中的一次读取，到底能看到哪个版本的数据？
3. 查询为什么使用或不使用索引，如何读执行计划？
4. 数据库迁移能否回滚，会持有什么锁？

连接与停机问题可结合 [NestJS 应用生命周期](/学习自测/18nestjs/q_nestjs_6-app_lifecycle)继续复习。

## 记忆主线

**共同能力 → 类型与索引 → 并发差异 → 事务化 DDL → 结合业务选型。**

> 来源：[PostgreSQL 官方文档：JSON Types](https://www.postgresql.org/docs/current/datatype-json.html)

> 来源：[PostgreSQL 官方文档：Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html)

> 来源：[PostgreSQL 官方文档：Routine Vacuuming](https://www.postgresql.org/docs/current/routine-vacuuming.html)

> 来源：[PostgreSQL 官方文档：Indexes](https://www.postgresql.org/docs/current/indexes.html)

> 来源：[PostgreSQL 官方文档：CREATE DATABASE](https://www.postgresql.org/docs/current/sql-createdatabase.html) / [CREATE INDEX](https://www.postgresql.org/docs/current/sql-createindex.html)

> 来源：[MySQL 8.4 官方文档：The JSON Data Type](https://dev.mysql.com/doc/refman/8.4/en/json.html)

> 来源：[MySQL 8.4 官方文档：InnoDB Transaction Isolation Levels](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html) / [InnoDB Multi-Versioning](https://dev.mysql.com/doc/refman/8.4/en/innodb-multi-versioning.html)

> 来源：[MySQL 8.4 官方文档：Atomic Data Definition Statement Support](https://dev.mysql.com/doc/refman/8.4/en/atomic-ddl.html)
