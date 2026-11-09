# 学习自测：上下文窗口的限制？超过限制怎么办？

> 📚 参考：[上下文窗口](/概念与原理/17ai/s_ai_21-context_window) | [RAG 检索增强生成](/概念与原理/17ai/s_ai_23-rag)

## 1. 上下文窗口的限制？超过限制怎么办？

**考察点**：是否了解上下文窗口的概念、不同模型的窗口大小、Lost in the Middle 现象，以及超过限制时的处理策略。

::: details

## 核心回答

**上下文窗口**是指模型一次能处理的最大 token 数量（输入 + 输出）。超过限制的内容会被截断或遗忘。

| 模型 | 上下文窗口 | 约等于 |
|------|:---:|------|
| GPT-3.5 | 4K/16K | ~3000/~12000 字 |
| GPT-4 | 8K/32K/128K | ~6000/24000/96000 字 |
| Claude 3 | 200K | ~150000 字（一本书） |
| Gemini 1.5 | 1M | 可处理整部《三体》 |

**窗口限制带来的问题**：
- **截断**：超长文档后半部分被丢弃
- **遗忘**：早先的对话轮次在窗口满后被忽略
- **Lost in the Middle**：模型对窗口中间部分的信息利用最差

```text
model.input  ←──────────────── 上下文窗口 ────────────────→ model.output
┌──────────────┬──────────────────────┬──────────────────────┬──────────┐
│ System Prompt│   最近 3 轮对话       │   历史对话            │  生成中   │
│ (常驻)       │   (优先保留)          │   (可淘汰)            │          │
└──────────────┴──────────────────────┴──────────────────────┴──────────┘
```

**前端处理超窗口的策略**：

| 策略 | 做法 | 适用场景 |
|------|------|----------|
| **滑窗** | 保留最近 N 轮对话，丢弃旧的 | 常规对话 |
| **摘要压缩** | 用模型把长对话压缩为摘要再传入 | 需要长期记忆 |
| **RAG 检索** | 不传全文，只传检索到的相关片段 | 长文档问答 |
| **分批处理** | 大文档分段处理，合并结果 | 书籍/论文处理 |

```ts
// 前端简单滑窗管理
class ChatContextManager {
  private messages: { role: string; content: string }[] = []
  private systemPrompt: string
  
  constructor(systemPrompt: string, private maxTokens = 4096) {
    this.systemPrompt = systemPrompt
  }

  addMessage(message: { role: string; content: string }) {
    this.messages.push(message)
    this.trim()  // 超限时裁减
  }

  getMessages() {
    return [{ role: 'system', content: this.systemPrompt }, ...this.messages]
  }

  private trim() {
    while (this.estimateTokens() > this.maxTokens * 0.8) {
      this.messages.shift()  // 移除最早的对话
    }
  }
}
```

## 面试回答要点

- 知道不同模型的窗口大小，至少说出 GPT-4 的常见配置（8K-128K）
- 解释"Lost in the Middle"现象
- 能说出至少 3 种超窗口的处理策略

:::

> 来源：[上下文窗口概念讲解](/概念与原理/17ai/s_ai_21-context_window)
