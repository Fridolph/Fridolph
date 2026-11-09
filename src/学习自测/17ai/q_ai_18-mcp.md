# 学习自测：MCP 协议是什么？和 A2A 协议有什么区别？

> 📚 参考：[MCP 协议](/概念与原理/17ai/s_ai_27-mcp) | [AI Agent 智能体](/概念与原理/17ai/s_ai_24-agent) | [Multi-Agent 系统](/概念与原理/17ai/s_ai_29-multi_agent)

## 1. MCP 协议是什么？和 A2A 协议有什么区别？

**考察点**：是否理解 MCP 协议的核心定位（统一工具接口），能否区分 MCP（模型↔工具）和 A2A（Agent↔Agent）的适用场景。

::: details

## 核心回答

**MCP**（Model Context Protocol）是 Anthropic 开源的标准协议，定义了大模型与外部工具/数据源之间的统一交互方式。简单理解：**MCP 是 AI 世界的"USB-C 接口"**。

```text
MCP 架构：
┌─────────────────────────────────────────┐
│  MCP Host（AI 应用，如 Claude Desktop）   │
│       ↕ MCP Protocol                    │
│  MCP Client（协议客户端）                 │
│       ↕ 标准 JSON-RPC                   │
│  MCP Server（工具/数据提供方）            │
│    ├── 文件系统 Server                   │
│    ├── 数据库 Server                     │
│    ├── Web 搜索 Server                   │
│    └── 自定义业务 Server                 │
└─────────────────────────────────────────┘
```

**三大核心概念**：
- 📦 **Resources**：暴露数据（类似 GET 请求 —— 读取文件、数据库查询结果）
- 🔧 **Tools**：暴露操作（类似 POST 请求 —— 创建文件、发送消息）
- 📝 **Prompts**：预定义提示词模板

**MCP vs A2A 协议对比**：

| 维度 | MCP (Model Context Protocol) | A2A (Agent-to-Agent) |
|------|------------------------------|----------------------|
| **提出方** | Anthropic | Google |
| **核心场景** | 模型 ↔ 工具/数据 | Agent ↔ Agent |
| **交互模式** | Client → Server 请求-响应 | Agent 间对等通信 + 任务委派 |
| **类比** | USB-C 接口（统一外设连接） | 微服务间通信协议 |
| **传输层** | stdio / HTTP-SSE | gRPC / HTTP |

```text
MCP 解决什么问题：
├── 之前：每个 AI 应用都要单独开发 OAuth、文件系统、数据库集成
├── 现在：一次开发 MCP Server，所有 AI 应用都能用
└── 类比：就像 USB-C 统一了充电接口，MCP 统一了 AI 工具接口

A2A 解决什么问题：
├── MCP 是"模型怎么用工具"，A2A 是"Agent 之间怎么协作"
├── 场景：Agent A 做前端开发，Agent B 做测试
│        Agent C 做代码审查 → 三个 Agent 通过 A2A 协作
└── 可以理解为：MCP 是垂直协议（模型↔工具），A2A 是水平协议（智能体↔智能体）
```

**前端关注点**：
- MCP 是构建 AI 原生应用的关键协议
- 前端可以扮演 MCP Client 角色（Web 应用中集成 MCP 工具）
- 了解 MCP 有助于理解 AI 应用架构的未来趋势

## 面试回答要点

- MCP = 统一工具接口标准（USB-C 类比）
- 区分 MCP（模型↔工具）和 A2A（Agent↔Agent）
- 知道三种客户端-服务器传输方式：stdio、HTTP-SSE、WebSocket

:::

> 来源：[MCP 协议概念讲解](/概念与原理/17ai/s_ai_27-mcp)
