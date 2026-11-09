# Transformer 架构

## 概念

Transformer 是 2017 年由 Google 在论文《Attention Is All You Need》中提出的神经网络架构，**完全基于注意力机制**，彻底摆脱了 RNN/LSTM 的循环结构。它是当前所有大语言模型（GPT、LLaMA、Claude 等）的基础骨架。

Transformer 的核心创新在于实现了**并行计算**和**长距离依赖建模**，解决了 RNN 在处理长序列时的效率瓶颈。

## 核心结构

Transformer 采用 Encoder-Decoder 结构：

### Encoder（编码器）

将输入序列转换为上下文表示，由多个相同的层堆叠而成，每层包含：

1. **Multi-Head Self-Attention**：让每个 token 关注序列中的所有 token
2. **Add & Norm**：残差连接 + 层归一化
3. **Feed Forward Network（FFN）**：两层全连接网络 + 激活函数
4. **Add & Norm**：残差连接 + 层归一化

### Decoder（解码器）

基于 Encoder 输出和已生成的 token 预测下一个 token：

1. **Masked Multi-Head Self-Attention**：自注意力（遮挡未来位置）
2. **Multi-Head Cross-Attention**：关注 Encoder 的输出
3. **FFN + 残差连接和归一化**

现代 LLM（如 GPT 系列）通常只使用 Decoder 部分（Decoder-Only），Encoder-Only 架构如 BERT 用于理解任务，Encoder-Decoder 架构如 T5 用于生成任务。

## 关键组件

### Self-Attention（自注意力）

每个 token 与序列中所有 token 计算关联度：
- Q（Query）：当前 token 想"查询"什么
- K（Key）：每个 token 的"索引"标签
- V（Value）：每个 token 的实际内容

**Scaled Dot-Product Attention** 公式：
```
Attention(Q, K, V) = softmax(QK^T / √d_k) · V
```

### Multi-Head Attention（多头注意力）

将 Q、K、V 投影到多个子空间，在每个子空间独立计算注意力，然后拼接。**每个"头"可以学习不同类型的注意力模式**（如语法关系、语义关联等）。

### Positional Encoding（位置编码）

Transformer 本身不具备序列顺序感知，需要注入位置信息：
- **绝对位置编码**：sin/cos 函数或可学习的位置向量
- **相对位置编码**：编码 token 间的相对距离（RoPE 是现代 LLM 的主流选择）

### Feed Forward Network（FFN）

两层全连接网络，中间使用激活函数（GELU/SwiGLU），为模型引入非线性。FFN 占模型参数的约 2/3。

## 面试常问

- Transformer 相比 RNN 的优势有哪些？
- Self-Attention 的 Q、K、V 分别是什么含义？
- 为什么需要位置编码？有哪些实现方式？

## 参考

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
