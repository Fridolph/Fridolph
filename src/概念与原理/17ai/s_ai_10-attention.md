# Attention（注意力机制）

## 概念

注意力机制（Attention Mechanism）是 Transformer 的核心组件，它让模型在处理每个 token 时能够**动态地关注输入序列中的相关部分**，而不是平等对待所有 token。

类比来说：人类阅读时不会逐字逐句地平等处理，而是对关键信息"pay attention"。Attention 机制赋予 AI 同样的能力。

## 核心原理

### Scaled Dot-Product Attention

Transformer 的自注意力计算公式：

```
Attention(Q, K, V) = softmax(QK^T / √d_k) · V
```

**三个核心矩阵**：

- **Q（Query，查询）**：当前 token 想"查询"什么——我要找什么信息
- **K（Key，键）**：每个 token 的"索引"标签——我有什么信息可被查询
- **V（Value，值）**：每个 token 的"内容"——我实际携带的信息

**计算步骤**：

1. 计算 Q 和所有 K 的点积 → 得到注意力分数矩阵
2. 除以 √d_k（缩放因子，防止梯度过小）
3. 通过 Softmax 归一化为概率分布（注意力权重）
4. 用权重对 V 做加权求和 → 得到当前 token 的上下文表示

### Multi-Head Attention（多头注意力）

将 Q、K、V 通过不同的线性投影映射到多个子空间，在每个子空间独立计算 Attention，最后拼接。

**为什么需要多头**：
- 每个头可以学习**不同类型的注意力模式**
- 有的头关注语法结构，有的关注语义关联，有的关注位置关系
- 多个头 = 从不同角度理解输入

### Cross-Attention vs Self-Attention

- **Self-Attention**：Q、K、V 来自同一个序列，让序列内互相注意
- **Cross-Attention**：Q 来自当前序列，K、V 来自另一个序列（如 Encoder 的输出）

## 注意力机制的类型

| 类型 | 计算范围 | 复杂度 | 用途 |
|------|---------|--------|------|
| 全局注意力 | 全部 token | O(n²) | 标准 Transformer |
| 因果/掩码注意力 | 只看左边 | O(n²) | GPT 等自回归模型 |
| 稀疏注意力 | 部分 token | O(n·log n) | 长文本优化 |
| 滑动窗口注意力 | 固定窗口 | O(n·w) | Mistral 等 |
| Flash Attention | 算法优化 | O(n²) 更快 | 主流 LLM 标配 |

## 面试常问

- Self-Attention 为什么需要 Q、K、V 三个矩阵？一个不行吗？
- 注意力分数的 softmax 缩放因子 √d_k 的作用是什么？
- 注意力机制的计算复杂度是多少？如何处理长文本？

## 参考

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [The Illustrated Attention](https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/)
