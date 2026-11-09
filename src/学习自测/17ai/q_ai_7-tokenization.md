# 学习自测：Token 和分词是什么？为什么 Token 数量影响成本和性能？

> 📚 参考：[Token 与分词](/概念与原理/17ai/s_ai_8-tokenization) | [上下文窗口](/概念与原理/17ai/s_ai_21-context_window)

**场景**：学习自测"你知道 GPT 的 Token 是什么吗？为什么我们调用 API 是按 Token 计费？"

**考察点**：Token 概念、分词算法、Token 数量对成本和性能的影响

::: details

## 核心回答

**Token** 是大模型处理文本的最小单位，不完全等同于"字"或"词"。

```text
"你好世界 AI" 
BPE 分词后 → ["你", "好", "世界", " AI"]  ← 4 tokens
不一定是一字一 token，英文常见 1 word ≈ 1.3 tokens

中文每字约 1.5-2 tokens（视模型而定）
```

**分词方法**：

| 方法 | 原理 | 代表 |
|------|------|------|
| BPE | 统计高频子词合并 | GPT 系列 |
| WordPiece | 似然概率选择合并 | BERT |
| SentencePiece | 语言无关，直接处理原始文本 | LLaMA、T5 |

**Token 为什么影响成本和性能**：

```text
成本公式：总费用 = (输入 tokens × 输入单价) + (输出 tokens × 输出单价)
例如 GPT-4：输入 $0.03/1K token，输出 $0.06/1K token
一次 2000 token 的对话 ≈ $0.03~$0.10

性能影响：
├── 上下文窗口 = 最大 token 数量限制（如 4K/8K/128K）
├── 超过窗口的内容会被截断或遗忘
└── 理论上，Transformer 自注意力的计算复杂度是 O(n²)
    —— 输入翻倍，计算量大约翻 4 倍
```

**前端实用技巧**：
- 用 `tiktoken` 或 API 返回的 `usage.total_tokens` 统计用量
- 长文本先摘要再送入模型（节省 token）
- 视觉 LLM 中图片也计 token（约 85~170 token/图块）

## 面试回答要点

- 理解 Token 是大模型的最小处理单元，不是"字"
- 说明 token 数量的两个影响：成本 + 上下文窗口限制
- 知道 BPE 是最主流的分词算法

:::

> 来源：[Token 与分词概念讲解](/概念与原理/17ai/s_ai_8-tokenization)
