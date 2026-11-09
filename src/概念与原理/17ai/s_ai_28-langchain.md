# LangChain & AI SDK

## 概念

LangChain 是构建 LLM 应用最流行的**开源框架**，提供了连接模型、工具、数据源的统一抽象。对于前端开发者来说，还有更贴合前端生态的 **Vercel AI SDK** 等替代方案。

这些框架的目标是让开发者不用关心底层 API 细节（token 管理、重试、流式处理等），专注于业务逻辑。

## LangChain 核心模块

### Models（模型）

统一的模型接口，支持 OpenAI、Anthropic、Google、开源模型等：

```python
from langchain_openai import ChatOpenAI
llm = ChatOpenAI(model="gpt-4o")
response = llm.invoke("你好")
```

### Chains（链）

将多个操作串联成流水线：

```
prompt 模板 + LLM + 输出解析器 = 一个 Chain
```

LangChain Expression Language（LCEL）是声明式链构建语法。

### Agents

结合 LLM 推理和工具调用，自主决策任务执行路径。

### Retrieval

文档加载 → 分块 → 嵌入 → 向量库 → 检索的完整 RAG 链路。

### Memory

管理对话历史和上下文，支持多种存储后端。

## Vercel AI SDK

专门面向前端/全栈开发者的 AI 框架，更贴合 Web 生态：

### 核心 API

```typescript
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

const { text } = await generateText({
  model: openai('gpt-4o'),
  prompt: '用一句话解释 React 的 useState',
})
```

### 前端流式 Hook

```typescript
import { useChat } from '@ai-sdk/react'

function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  // 开箱即用：流式输出、消息管理、状态处理
}
```

### 主要特性

- 开箱即用的流式支持
- React / Vue / Svelte 原生 Hook
- 多模型提供商统一接口
- 内置 prompt 管理
- 支持 Function Calling / Tool Use

## 其他相关框架

| 框架 | 定位 | 适用 |
|------|------|------|
| **LlamaIndex** | 数据框架，专注 RAG/索引 | Python，复杂数据管道 |
| **CrewAI** | Multi-Agent 编排 | Python，多 Agent 协作 |
| **LangGraph** | Agent 状态机 | 复杂 Agent 流程 |
| **Dify / FastGPT** | 低代码 AI 平台 | 非开发者或快速原型 |

## 前端选型建议

| 场景 | 推荐 |
|------|------|
| 纯前端/Hook 风格 | Vercel AI SDK |
| 全栈 Node.js | LangChain.js + Vercel AI SDK |
| Python 后端 + 前端 | LangChain (Python) + Vercel AI SDK (前端) |
| 快速原型 | Dify / FastGPT |
| 复杂 Agent 系统 | LangGraph |

## 面试常问

- LangChain 解决了什么问题？为什么这么多 AI 应用都基于它？
- Vercel AI SDK 和 LangChain 的设计理念有什么不同？
- 你使用过哪些 AI 框架？在什么场景下选择的？

## 参考

- [LangChain Documentation](https://js.langchain.com/)
- [Vercel AI SDK](https://sdk.vercel.ai/)
- [LlamaIndex](https://docs.llamaindex.ai/)
