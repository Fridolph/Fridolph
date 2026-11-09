# MCP 协议

## 概念

MCP（Model Context Protocol）是 Anthropic 于 2024 年发布的**开源标准协议**，为 AI 模型与外部工具、数据源之间的连接提供了一个统一的"USB 接口"。在此之前，每个 LLM 需要为每个外部工具编写专属的集成代码——MCP 的目标是让这种连接标准化、可复用。

简单理解：MCP 之于 AI，就像 HTTP 之于 Web、USB 之于外设——一个统一的协议让连接变得简单。

## 核心概念

### MCP 架构

```
┌──────────┐        MCP Protocol       ┌──────────┐
│  Client  │ ←────────────────────────→ │  Server  │
│ (Host)   │   JSON-RPC over stdio/SSE │          │
└──────────┘                            └──────────┘
     │                                      │
 Claude / GPT /                        外部工具、API、
你的应用                               数据库、文件系统
```

- **Host（宿主）**：运行 AI 模型的应用（Claude Desktop、VS Code、你的应用）
- **Client（客户端）**：Host 内部的协议客户端，管理与 Server 的连接
- **Server（服务端）**：暴露工具/资源/提示词的 MCP 服务

### 三种核心原语

| 原语 | 用途 | 示例 |
|------|------|------|
| **Tools（工具）** | 模型可调用的函数 | 查询数据库、搜索文件、发送邮件 |
| **Resources（资源）** | 模型可读取的数据 | 本地文件、知识库、API 响应 |
| **Prompts（提示词）** | 预定义的 prompt 模板 | 代码审查 prompt、翻译 prompt |

## 与 A2A 的关系

Google 的 A2A（Agent-to-Agent）协议与 MCP 互补而非竞争：

| 维度 | MCP | A2A |
|------|-----|-----|
| 目的 | 模型 ↔ 工具/数据 | Agent ↔ Agent |
| 层次 | 基础设施层 | 应用协作层 |
| 提出方 | Anthropic | Google |
| 角色 | "给 AI 装 USB 口" | "让 Agent 对讲" |

## 工作方式

### JSON-RPC 通信

MCP 基于 JSON-RPC 2.0，支持两种传输方式：

- **标准输入/输出（stdio）**：本地进程间通信
- **Server-Sent Events（SSE）**：远程 HTTP 通信

### 生命周期

```
初始化 → 能力协商 → 工具/资源发现 → 模型调用工具 → 返回结果
```

1. Client 向 Server 请求可用工具列表
2. Host 将工具列表注册到 LLM 的可用工具中
3. 用户提问 → LLM 决定调用某个 MCP 工具
4. Client 转发调用给 Server → Server 执行并返回结果
5. LLM 结合结果生成最终回答

## 对前端开发者的意义

### 为什么需要关注

- **连接任意数据源**：通过 MCP Server 将数据库、API、文件系统暴露给 AI
- **一站式集成**：不再为每个 LLM 单独写集成代码
- **社区生态**：已有数百个开源 MCP Server（Puppeteer、GitHub、Postgres、Filesystem 等）
- **Claude Code / Cursor 支持**：主流 AI 编程工具已集成 MCP

### 前端相关 MCP Server 示例

- **Browser MCP**：让 AI 操作浏览器
- **Figma MCP**：连接设计稿
- **Filesystem MCP**：读写本地文件
- **GitHub MCP**：操作 GitHub 仓库

## 面试常问

- MCP 解决了什么问题？和 Function Calling 有什么关系？
- MCP 和 A2A 的区别与应用场景？
- 作为前端开发者，你如何使用 MCP 来增强开发效率？

## 参考

- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [A2A Protocol - Google](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)
