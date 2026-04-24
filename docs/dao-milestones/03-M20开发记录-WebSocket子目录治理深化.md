# 开发记录：WebSocket子目录治理深化

这篇开发记录用于复盘 `M20` 的执行过程和结果。

## 背景

- 在 `M19` 完成 `01HTML5/HTML5存储` 治理后，仓库当前 `missingTitleCount` 为 `147`
- 当前质量热点第一位仍是 `05Nodejs`，但该区域仍不适合作为本轮治理目标
- 综合收益与安全边界后，选择 `01HTML5/websocket` 作为本轮治理对象，该目录当前还有 `1` 篇文档缺少一级标题，且原始文件名 `note` 语义较弱

## 目标

- 完成 `01HTML5/websocket` 的一轮子目录治理
- 继续压降全仓库 `missingTitleCount`
- 收敛弱语义标题，提升导航、搜索和阅读时的可理解性
- 按 Dao 流程同步沉淀设计、过程与结果

## 关键决策

- 选择 `websocket`，是因为它与上一轮 HTML5 主线连续、范围收敛、收益明确，并且不触碰 `05Nodejs`
- 该目录以协议原理说明为主，自动补 H1 后仍然需要人工语义化收口，否则会把 `note` 直接暴露给站点导航
- 本轮优先只治理 `websocket`，把 `全栈之路` 留给后续轮次，避免范围扩散

## 开发过程

- 已生成 `M20` 里程碑文档骨架
- 已补充任务拆解、详细设计与阶段推进快照
- 已新增脚本入口 `docs:fix-h1:h5-websocket`
- 已对目标文档统一做语义化收口，把弱标题整理为 `WebSocket学习：协议与作用`
- 已执行 `npm run docs:sync` 与 `npm run docs:check`

## 自测

- 已执行：
  - `npm run docs:fix-h1:h5-websocket`
  - `npm run docs:sync`
  - `npm run docs:check`
- 最终结果：
  - `placeholderCount: 14 -> 14`
  - `missingTitleCount: 147 -> 146`
  - `missingAssetCount: 0 -> 0`
  - `duplicateTitleCount: 24 -> 24`
- 说明：
  - 本轮在自动补齐 H1 后继续执行语义化收口，避免 `note` 弱语义标题残留
  - 最终校验通过，未引入重复标题回归

## 结果

- 已完成 `01HTML5/websocket` 的一轮子目录治理
- 全仓库 `missingTitleCount` 继续下降 `1`
- `duplicateTitleCount` 与 `placeholderCount` 保持稳定
- 当前质量基线已更新为：
  - `placeholderCount = 14`
  - `missingTitleCount = 146`
  - `missingAssetCount = 0`
  - `duplicateTitleCount = 24`
