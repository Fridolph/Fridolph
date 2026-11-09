# Temperature 与采样策略

## 概念

Temperature（温度参数）控制 LLM 输出的**随机性**和**创造性**。它是生成多样性文本 vs 确定性文本的核心开关。

采样策略则决定了从概率分布中**如何选择**下一个 token——是选最可能的一个，还是按概率随机选。

## Temperature

在 Softmax 之前除以温度 T：

```
P(token_i) = softmax(logits_i / T)
```

### T 值的影响

| T 值 | 效果 | 适用场景 |
|------|------|---------|
| 0 ~ 0.3 | 高度确定，几乎总是选最高概率 token | 代码生成、事实性问答、翻译 |
| 0.5 ~ 0.8 | 适中创造性 | 一般对话、摘要 |
| 0.8 ~ 1.2 | 较高创造性 | 创意写作、头脑风暴 |
| 1.5 ~ 2.0 | 高度随机 | 艺术性文本、多样性需求 |

### 极端值

- **T → 0**：输出几乎完全确定（多次生成相同 prompt，结果高度一致），等价于贪心解码
- **T → ∞**：所有 token 概率趋同，输出近乎随机乱码

## 采样策略

### 贪心解码（Greedy Decoding）

每次选概率**最高**的 token：极其确定但缺乏多样性。

> The cat sat on the ... → "mat"（每次都一样）

### Top-k 采样

只从概率最高的 **k 个** token 中按概率采样。限制候选池，防止选到极低概率 token。

- k=1：等价于贪心解码
- k=50：常见设置，平衡质量与多样性

### Top-p 采样（核采样 / Nucleus Sampling）

从累计概率达到 **p** 的最少 token 中采样。动态调整候选池大小：

- p=0.1：只从最高概率 token 中选（很保守）
- p=0.9：几乎覆盖所有合理选项（常见设置）

**Top-k vs Top-p**：
- Top-k 固定候选数量，对低概率分布可能太宽或太窄
- Top-p 动态调整，更智能化 → 现代 LLM 通常两者结合使用

### Beam Search

维护多个候选序列，每一步保留最好的 k 个"光束"。适合需要全局最优的场景（翻译等），但创造性差。

## 实践建议

对大多数场景，使用 **Temperature 0.7 + Top-p 0.9** 是不错的中庸起点。

| 场景 | Temperature | Top-p | 说明 |
|------|------------|-------|------|
| 代码补全 | 0 ~ 0.2 | 0.95 | 确定性强 |
| 事实问答 | 0 ~ 0.3 | 0.9 | 避免编造 |
| 对话/聊天 | 0.7 ~ 1.0 | 0.9 ~ 0.95 | 自然多样 |
| 创意写作 | 0.8 ~ 1.2 | 0.95 | 启发性 |

## 面试常问

- Temperature=0 时模型一定会输出相同结果吗？
- Top-k 和 Top-p 的核心区别？为什么现代 LLM 更偏好 Top-p？
- 如果需要模型生成代码，建议 Temperature 设为多少？

## 参考

- [OpenAI API: Text Generation](https://platform.openai.com/docs/guides/text-generation)
- [How to generate text - Hugging Face](https://huggingface.co/blog/how-to-generate)
