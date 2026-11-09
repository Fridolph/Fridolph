# Multi-Agent 系统

## 概念

Multi-Agent 系统是将多个 AI Agent 组织起来**分工协作**完成复杂任务的架构模式。每个 Agent 有自己的角色、职责和工具集，通过通信和协调共同解决问题。

类比：一个软件团队有产品经理、前端、后端、QA——各司其职，通过沟通完成任务。Multi-Agent 同理。

## 为什么需要 Multi-Agent

单 Agent 的局限性：

- **上下文溢出**：单次对话无法装下复杂任务的所有信息
- **角色冲突**：一个模型很难同时扮演产品、开发、测试
- **能力边界**：不同 Agent 可使用不同的模型（便宜模型做简单任务，强模型做推理）
- **可靠性**：Agent 间互相检查，减少错误

## 核心架构模式

### 顺序编排（Sequential）

Agent A → Agent B → Agent C → 结果

流水线模式，适合有明确阶段的流程：

```
需求分析 Agent → 技术方案 Agent → 代码生成 Agent → 代码审查 Agent
```

### 路由/分发（Router）

根据任务类型分发给专门的 Agent：

```
用户提问 → 路由器
    ├→ 前端 Agent（React 问题）
    ├→ 后端 Agent（API 问题）
    └→ DevOps Agent（部署问题）
```

### 层级/管理（Hierarchical）

一个管理者 Agent 调度多个子 Agent：

```
            管理 Agent
          /    |     \
    子Agent1  子Agent2  子Agent3
```

管理 Agent 负责任务分解、分配、结果整合。

### 协作/辩论（Collaborative）

多个 Agent 自由对话，形成共识：

```
Agent A 提出方案 → Agent B 质疑 → Agent C 补充 → Agent A 修正 → 共识
```

### 群集/蜂群（Swarm）

大量轻量 Agent 各自执行小任务，结果聚合。

## 通信机制

### 共享上下文

所有 Agent 写入共享的消息池，彼此可见。

### 消息传递

Agent 间通过结构化消息（JSON）定向通信。

### 协议标准

- **A2A（Agent-to-Agent）**：Google 提出的 Agent 间通信协议
- **MCP**：Agent 与外部工具的通信协议
- 两者互补：MCP 连接工具，A2A 连接 Agent

## 实现框架

| 框架 | 特点 |
|------|------|
| **LangGraph** | Python/JS，状态图驱动 |
| **CrewAI** | Python，角色驱动的简单抽象 |
| **AutoGen** | 微软，对话驱动 |
| **MetaGPT** | 模拟软件公司 SOP 流程 |
| **OpenAI Swarm** | 轻量实验性框架 |
| **Vercel AI SDK** | 前端友好，支持 Agent 模式 |

## 前端应用场景

- **全栈开发 Agent 团队**：需求→UI 设计→前端代码→后端 API→测试
- **代码 Review Agent 系统**：代码提交后多个审查 Agent 并行检查（性能、安全、可访问性等）
- **客服升级系统**：简单问题 → 基础 Agent，复杂问题 → 专家 Agent，敏感问题 → 人工

## 主要挑战

- **协调复杂度**：Agent 数量增加，协调成本指数级上升
- **成本控制**：多 Agent 意味着多次 LLM 调用
- **一致性**：多个 Agent 对同一问题可能给出矛盾答案
- **循环死锁**：Agent 间可能陷入无效争论

## 面试常问

- 什么时候应该用 Multi-Agent 而不是单 Agent？
- Multi-Agent 的几种架构模式？各适合什么场景？
- A2A 协议解决的是什么问题？

## 参考

- [Building effective agents - Anthropic](https://www.anthropic.com/research/building-effective-agents)
- [LangGraph Multi-Agent](https://langchain-ai.github.io/langgraph/tutorials/multi_agent/)
- [A2A Protocol](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)
