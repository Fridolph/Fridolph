# M12详细设计：LearnTypeScript子目录治理深化

这份文档用于说明 `M12` 的详细设计。

## 设计目标

在 `M11` 完成 TailwindCss 目录治理后，继续选择高收益且安全的目标 `06TypeScript/LearnTypeScript`，在不触碰用户本地 Node 工作区的前提下进一步降低全站缺少一级标题规模，并验证 TypeScript 学习型目录也能稳定复用当前 Dao 治理闭环。

## 为什么选择 `06TypeScript/LearnTypeScript`

- 当前质量报告显示该子目录仍有 `12` 篇文档缺少一级标题，是安全目录中的高收益目标
- 目录内同时包含基础学习笔记、类型专题、函数重载、声明文件等多种内容形态，适合验证多样标题来源下的统一收口策略
- 该目录还存在 `10装饰器/note.md` 空页面，可在不扩散范围的情况下顺带降低 `placeholderCount`
- 当前全站热点第一位仍是 `05Nodejs`，但用户本地正在编辑 `Node入门2`，本轮继续优先避开该区域

## 业务流程

### 主流程

1. 读取当前质量报告，确认 `LearnTypeScript` 为本轮治理对象
2. 补充 `package.json` 脚本入口
3. 执行批量标题修复
4. 对修复结果做二次检查，并统一改为带上下文的语义标题
5. 对目录内空页面做最小可读补充
6. 执行 `docs:sync`
7. 执行 `docs:check`
8. 回写开发记录、开发笔记和质量基线
9. 完成 Dao Commit 提交

### 分支流程

如果批量修复后未出现重复标题和指标回归，仍执行目录内语义化收口，避免 `学习笔记`、`note`、`泛型`、`函数重载` 这类弱上下文标题继续残留在站点导航与搜索结果中。

### 异常流程

如果出现以下任一情况：

- 标题重复数量增加
- 构建失败
- 校验指标回归

则必须在当前轮次内继续修复，直至 `docs:check` 重新通过。

## 结构设计

本轮涉及资产：

- `package.json`
- `scripts/docs-quality-baseline.json`
- `06TypeScript/LearnTypeScript/**/*.md`
- `docs/dao-milestones/00-阶段里程碑规划.md`
- `docs/dao-milestones/01-M12任务拆解-LearnTypeScript子目录治理深化.md`
- `docs/dao-milestones/02-M12详细设计-LearnTypeScript子目录治理深化.md`
- `docs/dao-milestones/03-M12开发记录-LearnTypeScript子目录治理深化.md`
- `docs/dao-milestones/04-M12里程碑开发笔记-LearnTypeScript子目录治理深化.md`

## 模块边界

- 仅治理 `06TypeScript/LearnTypeScript`
- 不触碰 `05Nodejs/Node入门2` 及其相关本地改动
- 不修改 `scripts/fix-missing-h1.mjs` 本身
- 不把本轮扩展成 `06TypeScript` 全模块批量治理

## 自测设计

本轮自测顺序固定为：

1. `npm run docs:fix-h1:learn-ts`
2. `npm run docs:sync`
3. `npm run docs:check`

全部通过后，才算 `M12` 当前轮次完成。
