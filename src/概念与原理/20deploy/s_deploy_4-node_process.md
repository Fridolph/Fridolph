# Node 进程管理与优雅停机

## 进程活着，不代表服务健康

开发时的 `node app.js` 依赖当前终端。服务器需要明确进程由谁启动、异常后如何恢复、日志保留多久、发布时如何退出。健康检查还需要区分：进程是否存活（liveness）、是否可以接收业务（readiness）。短暂数据库故障不宜引发无休止的应用重启。

传统单机可选择 systemd 或 PM2；容器通常直接运行 Node，由容器平台管理重启。避免同时叠加多套进程守护，却不清楚信号由谁接收。

## PM2 的学习要点

使用 ecosystem 文件集中声明应用名、入口、工作目录、实例数和环境。ESM 项目中可使用 `ecosystem.config.cjs`：

```js
module.exports = {
  apps: [{
    name: 'learning-api',
    cwd: '/srv/learning-api/current',
    script: 'dist/main.js',
    instances: 1,
    exec_mode: 'fork',
    kill_timeout: 15000,
    env: { NODE_ENV: 'production', PORT: 3000 },
  }],
}
```

数据库口令等通过运行环境或密钥服务注入，不提交在配置中。`pm2 logs` 和 `pm2 describe learning-api` 用于观察；开机恢复需结合当前用户的 `startup` / `save` 流程验证。更换 Node 路径后也要核对恢复脚本。

cluster / reload 可以降低切换中断，但不自动保证请求不丢失；还需要就绪协调、排空和共享状态设计。多实例中的定时任务、内存 Session 和 WebSocket 会话不能默认继续保持单进程语义。

## 停机时数据库怎么处理？

```text
下线就绪状态 / 从流量入口摘除
  → 停止接收新工作（HTTP、队列、定时任务）
  → 在截止时间内等待在途请求和事务完成
  → 关闭应用拥有的连接池 / 数据库客户端
  → 完成退出；超时由上层管理器强制结束
```

NestJS 需调用 `enableShutdownHooks()` 接收支持的系统信号，主动 `app.close()` 也能触发关闭钩子。结合应用生命周期安排排空与资源释放，避免仍在执行的请求因提前关闭连接池失败。各层超时要协调，管理器留给应用的时间要覆盖预期清理窗口。

- **正常下线**：停止新查询，等待已开始的工作，然后调用 Prisma `$disconnect()` 或连接池对应的关闭方法；不要关闭共享 PostgreSQL 服务。
- **网络掉线**：应用未必能发送退出消息；数据库或代理会通过 TCP、超时等机制发现断开。未提交事务在会话终止后回滚，释放时间不一定立即。
- **提交响应丢失**：客户端看到超时不能证明事务未提交。写操作重试需要幂等键、唯一约束或结果查询；不要无限重试。
- **强杀 / 宿主机断电**：`SIGKILL` 不执行清理钩子；数据库服务自身依靠 WAL 等机制恢复，并不依赖应用完成清理。

连接池大小要按应用副本数合计，并为迁移和运维留连接。大查询与长事务应有执行时限，关闭时仍需要验证驱动 / ORM 的具体行为。

**自测：** 为什么不在进程退出回调里等待异步清理？应用中断后数据库是否立即知道？如何判断超时的订单创建是否已成功？

> 来源：[个人 PM2 笔记](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/部署相关知识/pm2)；[PM2 Graceful shutdown](https://pm2.keymetrics.io/docs/usage/signals-clean-restart/)；[NestJS 生命周期](https://docs.nestjs.com/fundamentals/lifecycle-events)；[PostgreSQL 连接配置](https://www.postgresql.org/docs/current/runtime-config-connection.html)。
