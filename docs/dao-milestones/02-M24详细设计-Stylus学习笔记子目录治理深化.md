# M24详细设计：Stylus学习笔记子目录治理深化

这份文档用于说明 `M24` 的详细设计。

## 设计目标

在 `M23` 完成 `02CSS相关/CSS重构` 治理后，继续选择高收益且安全的目标 `02CSS相关/stylus/stylus学习笔记`，在不触碰用户本地 `05Nodejs` 工作区的前提下进一步降低全站缺少一级标题规模，并验证编号笔记型目录也能稳定复用当前 Dao 治理闭环。

## 业务流程

### 主流程

1. 读取当前质量报告，确认 `02CSS相关/stylus/stylus学习笔记` 为本轮治理对象
2. 补充 `package.json` 脚本入口
3. 执行批量标题修复
4. 对修复结果做二次检查，并统一改为带上下文的语义标题
5. 执行 `docs:sync`
6. 执行 `docs:check`
7. 回写开发记录、开发笔记和质量基线
8. 完成 Dao Commit 子任务提交准备

### 分支流程

如果批量修复后没有新增重复标题和指标回归，仍然执行目录内语义化收口，避免编号标题缺少模块上下文且格式不统一。

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
- `02CSS相关/stylus/stylus学习笔记/*.md`
- `docs/dao-milestones/00-阶段里程碑规划.md`
- `docs/dao-milestones/01-M24任务拆解-Stylus学习笔记子目录治理深化.md`
- `docs/dao-milestones/02-M24详细设计-Stylus学习笔记子目录治理深化.md`
- `docs/dao-milestones/03-M24开发记录-Stylus学习笔记子目录治理深化.md`
- `docs/dao-milestones/04-M24里程碑开发笔记-Stylus学习笔记子目录治理深化.md`

标题收口策略：

- `01选择器.md` -> `Stylus学习笔记：01 选择器`
- `02变量.md` -> `Stylus学习笔记：02 变量`
- `03插值.md` -> `Stylus学习笔记：03 插值`
- `04运算符.md` -> `Stylus学习笔记：04 运算符`
- `05混合书写.md` -> `Stylus学习笔记：05 混合书写`
- `06其他未整理.md` -> `Stylus学习笔记：06 其他未整理`
- `12url.md` -> `Stylus学习笔记：12 url`

## 模块边界

- 仅治理 `02CSS相关/stylus/stylus学习笔记`
- 不触碰 `05Nodejs` 及其相关本地工作区
- 不修改 `scripts/fix-missing-h1.mjs` 本身
- 不把本轮扩展成 `02CSS相关/stylus` 全模块批量治理

## 自测设计

本轮自测顺序固定为：

1. `npm run docs:fix-h1:stylus-notes`
2. `npm run docs:sync`
3. `npm run docs:check`

全部通过后，才算 `M24` 当前轮次完成。
