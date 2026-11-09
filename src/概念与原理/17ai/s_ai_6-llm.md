# 大语言模型（LLM）

## 概念

大语言模型（Large Language Model，LLM）是一种基于 Transformer 架构的大规模神经网络，通过在海量文本数据上训练，获得了**理解和生成自然语言**的能力。LLM 的核心能力是**预测下一个 token**——给定前文，预测最可能出现的后续内容。

LLM 的标志性突破包括：

- 2018：GPT-1 和 BERT 开创预训练范式
- 2020：GPT-3（175B 参数），证明 Scaling Law 有效
- 2022：ChatGPT（GPT-3.5），RLHF 对齐让模型可用
- 2023：GPT-4、Claude 2、Llama 2、Gemini
- 2024：GPT-4o、Claude 3.5、Llama 3、DeepSeek V3

## 核心能力

### 涌现能力（Emergent Abilities）

当模型参数规模超过某个阈值时，会出现一些**小模型不具备**的能力，如：

- **上下文学习（In-Context Learning）**：仅通过 prompt 中的示例学习新任务，无需微调
- **思维链推理（Chain-of-Thought）**：通过逐步推导解决复杂问题
- **指令遵循（Instruction Following）**：理解和执行自然语言指令

### Scaling Law

模型性能随**参数数量、训练数据量、计算量**的增长而**可预测地提升**。这是 LLM 不断"变大"的理论基础。

## 主流 LLM 对比

| 模型 | 开发方 | 特点 | 开源 |
|------|--------|------|------|
| GPT-4o | OpenAI | 多模态、全能型 | 否 |
| Claude 3.5 | Anthropic | 长上下文、安全性强 | 否 |
| Gemini | Google | 多模态、Google 生态 | 否 |
| Llama 3 | Meta | 开源最强之一 | 是 |
| DeepSeek V3 | DeepSeek | 高性价比、MoE 架构 | 是 |
| Qwen 2.5 | 阿里 | 中文能力强 | 是 |
| Mistral | Mistral AI | 轻量高效 | 部分 |
| DeepSeek R1 | DeepSeek | 推理能力强（CoT 特化） | 是 |

## LLM 的工作方式

1. **输入**：用户输入 prompt 文本
2. **分词**：将文本切分为 token 序列
3. **编码**：将 token 序列通过 Transformer 网络处理
4. **预测**：在最后一层产生每个可能 token 的概率分布
5. **采样**：根据概率采样生成下一个 token
6. **循环**：将生成的 token 追加到输入，重复 4-5 步，直到遇到结束标记

## 面试常问

- LLM "大"在哪些方面？为什么大更有效？
- 你用过哪些 LLM？通过什么方式集成到前端？
- LLM 的局限性有哪些（幻觉、时效性、算力成本等）？

## 参考

- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [GPT-4 Technical Report](https://arxiv.org/abs/2303.08774)
- [Awesome-LLM](https://github.com/Hannibal046/Awesome-LLM)
