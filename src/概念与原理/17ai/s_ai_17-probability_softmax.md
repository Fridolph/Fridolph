# 概率分布与 Softmax

## 概念

LLM 的最终输出是一个概率分布——对于词汇表中的每个 token，模型给出一个**概率值**，表示该 token 作为下一个输出 token 的可能性。所有概率之和为 1。

Softmax 是将模型的原始输出（Logits）转换为概率分布的数学函数。

## Logits

模型最后一层输出的原始数值称为 **Logits**（未归一化的对数概率）。每个 Logit 对应词汇表中的一个 token：

- 正数越大 → 该 token 可能性越高
- 负数 → 该 token 可能性低
- Logits 的范围是 (-∞, +∞)

## Softmax 公式

```
softmax(x)_i = exp(x_i) / Σ exp(x_j)
```

**作用三步**：

1. **exp(x)** 将每个 Logit 转为正值（eˣ，x 越大值越大）
2. 将所有 exp 值求和得到分母
3. 每个 exp 除以总和，得到 0~1 之间的概率

**示例**：
```
Logits:    [2.0, 1.0, 0.1]
exp:       [7.39, 2.72, 1.11]
softmax:   [0.66, 0.24, 0.10]    ← 概率分布
```

## 关键特性

### 归一化

所有输出概率之和恒为 1，构成合法的概率分布。

### 指数放大

exp 函数将 Logits 中的微小差异放大，让模型"更自信"地选出最可能的 token。GPT 的高 Logits 差值和低 Temperature 结合会产生确定性强的输出。

### 温度调节

在 Softmax 之前除以一个 Temperature 参数 T：

```
softmax(x/T)_i = exp(x_i/T) / Σ exp(x_j/T)
```

- T < 1：放大差异 → 更确定、保守
- T > 1：缩小差异 → 更随机、创造性
- T = 1：原始分布

## Logprobs

API 中常见的 `logprobs` 参数，返回每个输出 token 的**对数概率**：

```
logprobs_i = log(P(token_i))
```

- 值越接近 0 → 概率越高（概率 50% → logprobs ≈ -0.69）
- 值越负数 → 概率越低（概率 1% → logprobs ≈ -4.6）
- 用于评估模型对输出的"置信度"

## 面试常问

- Softmax 为什么需要 exp？直接用原始值归一化不行吗？
- 如何通过概率分布判断模型是否"不确定"（多个 token 概率接近）？
- Logprobs 为 -0.1 和 -5.0，哪个代表模型更确定？

## 参考

- [Softmax Function - Wikipedia](https://en.wikipedia.org/wiki/Softmax_function)
- [OpenAI API: Logprobs](https://platform.openai.com/docs/guides/text-generation/logprobs)
