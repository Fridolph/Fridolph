# 学习自测：Transformer 架构为什么是革命性的？相比 RNN 有什么优势？

> 📚 参考：[Transformer 架构](/概念与原理/17ai/s_ai_7-transformer) | [Attention 注意力机制](/概念与原理/17ai/s_ai_10-attention)

**考察点**：Self-Attention 机制的核心原理、与 RNN/LSTM 的对比优势、Encoder-Decoder 结构理解

::: details
## 核心回答

Transformer 是 2017 年 Google 提出的架构，革命性在于**自注意力（Self-Attention）机制 + 并行计算**：

```text
Transformer 结构：
├── Encoder（编码器）：理解输入文本
│   ├── Self-Attention：每个词关注整个句子的所有词
│   └── Feed Forward：非线性变换
└── Decoder（解码器）：生成输出文本
    ├── Masked Self-Attention：只看左边的词（防止偷看答案）
    ├── Cross-Attention：关注 Encoder 输出
    └── Feed Forward
```

| 对比 | RNN/LSTM | Transformer |
|------|----------|-------------|
| **计算方式** | 串行（step by step） | 并行（矩阵乘法） |
| **长距离依赖** | 容易遗忘 | Attention 直接关联 |
| **训练速度** | 慢（不可并行） | 快（GPU 友好） |
| **梯度问题** | 梯度消失/爆炸 | 残差连接缓解 |

**核心公式**：`Attention(Q, K, V) = softmax(QK^T / √d_k) × V`

- Q (Query)：我在找什么？
- K (Key)：我能提供什么？
- V (Value)：我实际的内容是什么？

**为什么重要**：NLP 领域所有重大进展（BERT、GPT、T5、LLaMA）都基于 Transformer。可以说"Attention Is All You Need"这篇论文开启了 LLM 时代。

## 面试回答要点

- 说出 Transformer 的两大组件：Encoder 和 Decoder
- 解释 Self-Attention 的核心：让每个词能直接"看到"所有其他词
- 对比 RNN 的串行瓶颈
:::

> 来源：[Transformer 架构概念讲解](/概念与原理/17ai/s_ai_7-transformer)
