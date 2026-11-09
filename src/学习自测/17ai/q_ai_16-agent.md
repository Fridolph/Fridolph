# 学习自测：什么是 AI Agent？前端 Agent 有哪些应用场景？

> 📚 参考：[AI Agent 智能体](/概念与原理/17ai/s_ai_24-agent) | [Function Calling](/概念与原理/17ai/s_ai_25-function_calling) | [Multi-Agent 系统](/概念与原理/17ai/s_ai_29-multi_agent)

## 1. 什么是 AI Agent？前端 Agent 有哪些应用场景？

**考察点**：是否理解 Agent 与普通 LLM 的核心区别，是否知道 ReAct 循环，能否举例前端 Agent 的实际应用场景。

::: details

## 核心回答

AI Agent 是一个能**自主规划、使用工具、执行多步骤任务**的智能体。相比普通 LLM（一问一答），Agent 能：
- 🧠 **规划**：将复杂任务拆解为子步骤
- 🔧 **使用工具**：调用搜索、代码执行、API
- 📝 **记忆**：维护短期和长期记忆
- 🔄 **反思**：检查结果并决定下一步

```text
Agent 核心循环（ReAct 模式）：
┌──────────────────────────────────────┐
│  Thought:  我需要做什么？              │
│     ↓                                │
│  Action:   执行操作（调用工具/回答问题） │
│     ↓                                │
│  Observation: 观察结果                │
│     ↓                                │
│  (循环直到任务完成)                   │
└──────────────────────────────────────┘
```

**Agent 三大组件**：
- 📐 **规划器**：制定执行计划，如任务拆解（Plan-and-Solve）
- 🔧 **工具集**：Function Calling、搜索 API、代码执行器
- 🧠 **记忆系统**：短期（上下文窗口）、长期（向量数据库存储）

**前端 Agent 应用场景**：

| 场景 | 流程 |
|------|------|
| **智能表单** | 用户描述需求 → Agent 拆解为表单字段 → 自动填充校验 |
| **代码助手** | "帮我重构这个组件" → Agent 分析代码 → 生成重构方案 |
| **数据看板 AI** | "本月销售额最高的 3 个品类" → Agent 调 API → 可视化 |
| **自动化测试** | "测试登录流程" → Agent 规划步骤 → 执行操作 → 报告结果 |
| **智能客服** | 用户问题 → Agent 查知识库/查订单/转人工 |

```ts
// 前端 Agent 简化框架思路
async function agentLoop(goal: string, tools: Tool[]) {
  let messages = [{ role: 'user', content: goal }]
  
  for (let i = 0; i < 10; i++) {  // 最多 10 轮
    const response = await chat(messages, tools)  // LLM 调用 + 工具定义
    
    if (response.finishReason === 'stop') {
      return response.content  // 任务完成
    }
    
    if (response.toolCalls) {
      for (const call of response.toolCalls) {
        const result = await executeTool(call)
        messages.push({ role: 'tool', content: result, toolCallId: call.id })
      }
    }
  }
}
```

## 面试回答要点

- 说清 Agent ≠ LLM：Agent 多了规划、工具、记忆、反思
- 知道 ReAct 循环：Thought → Action → Observation
- 能举例 3 个前端 Agent 应用场景

:::

> 来源：[AI Agent 智能体概念讲解](/概念与原理/17ai/s_ai_24-agent)
