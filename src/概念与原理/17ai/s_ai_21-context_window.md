# 上下文窗口

## 概念

上下文窗口（Context Window）是 LLM **一次能处理的最大 token 数量**，包括输入 prompt 和模型生成的输出。这是 LLM 的"短期记忆"容量上限。

- GPT-4：8K / 32K / 128K tokens
- Claude 3：200K tokens
- Gemini 1.5 Pro：1M tokens
- DeepSeek V3：128K tokens

## 为什么重要

### 决定了对话记忆长度

每次 API 调用需要把整个对话历史打包发送。随着对话进行，历史越来越长，最终会超出窗口限制。

### 影响信息密度

更大的窗口意味着可以：
- 一次上传整本书或长文档进行分析
- 进行更复杂的多步推理而不丢失上下文
- 同时参考多个文档做出综合判断

### 成本与延迟

上下文窗口越大：
- API 调用成本越高（输入 token 按量计费）
- 推理延迟越长（需要处理更多 token）
- 注意力计算复杂度 O(n²) 增长

## 上下文窗口的挑战

### Lost in the Middle

研究表明，LLM 对**开头和结尾**的信息关注最多，对中间部分关注最少。长文档中间的关键信息容易被忽略。

### KV Cache（键值缓存）

Transformer 推理时为每个 token 缓存 K 和 V 矩阵。KV Cache 大小与序列长度成正比：
- 8K tokens → 约 256MB
- 128K tokens → 约 4GB（单次推理）

### 位置编码限制

传统绝对位置编码（如 Sinusoidal）在训练长度之外会出现外推问题。RoPE 等相对位置编码改善了这一问题，但仍有效能衰减。

## 位置插值与扩展

为了让预训练时上下文较短的模型（如 4K）支持更长输入（如 32K），常用的方法：

- **Position Interpolation**：将新位置的索引线性压缩到训练范围内
- **NTK-aware 插值**：高频保留、低频压缩，RoPE 的优化版
- **YaRN**：进一步改进，成为长文本扩展的标准方法

## 前端实践

### 上下文管理策略

- **滑动窗口**：只保留最近 N 轮对话
- **摘要压缩**：用模型摘要历史对话替代原文
- **智能截断**：优先保留重要信息（最新对话 + 首轮系统 prompt）
- **分块处理**：大文档分块处理，每次只提交相关片段

### Token 计数

使用 tokenizer 工具预估 token 用量：
- `tiktoken`（Python/JS）
- 大致的估算：中文 1 字≈1~2 token，英文 1 词≈1.3 token

## 面试常问

- 上下文窗口大小如何影响前端架构设计？
- 对话进行到第 50 轮时，如何处理超出窗口的历史？
- "Lost in the Middle"现象对前端长文本处理有什么启示？

## 参考

- [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172)
- [RoPE: Rotary Position Embedding](https://arxiv.org/abs/2104.09864)
