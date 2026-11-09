# RLHF 与对齐训练

## 概念

RLHF（Reinforcement Learning from Human Feedback，基于人类反馈的强化学习）是将 LLM 的**输出与人类偏好对齐**的关键技术。预训练使模型"有知识"，RLHF 使模型"会做人"——确保回答有用、诚实、无害。

如果没有对齐训练，LLM 会像一部续写机器，而不是能遵循指令和价值观的助手。

## 为什么需要对齐

预训练模型的问题：

- **不会对话**：只会续写文本，不会回答提问
- **有害输出**：可能生成不当或危险内容
- **编造事实**：预训练阶段不管事实正确性
- **无法拒绝**：即使不知道也会强行回答

对齐训练的目标是让模型实现 **HHH 原则**：
- **Helpful（有帮助）**
- **Honest（诚实）**
- **Harmless（无害）**

## 三阶段对齐流程

### 阶段一：SFT（Supervised Fine-Tuning，监督微调）

用高质量人工编写的**指令-回答对**训练模型：

- 数据来自专业标注人员
- 让模型学会"对话格式"和基本指令遵循
- 数据量通常数千到数万条

### 阶段二：RM（Reward Model，奖励模型训练）

1. 让 SFT 后的模型对同一条 prompt 生成多个回答
2. 人工标注员对这些回答**排序**（A > B > C）
3. 用排序数据训练一个奖励模型，学会预测"人类更偏好哪个回答"

### 阶段三：PPO（Proximal Policy Optimization）

用强化学习进一步优化模型：

1. LLM 生成回答
2. RM（奖励模型）打分
3. 通过 PPO 算法更新 LLM 参数以最大化奖励
4. 同时约束新策略不要偏离 SFT 模型太远（KL 散度约束）

## DPO vs RLHF

DPO（Direct Preference Optimization）是一种**不需要训练奖励模型**的对齐方法：

| 维度 | RLHF（PPO） | DPO |
|------|------------|-----|
| 是否需要奖励模型 | 是 | 否 |
| 训练复杂度 | 高（四模型交互） | 低（直接优化） |
| 训练稳定性 | 需调参 | 较稳定 |
| 使用 | ChatGPT、Claude | Llama 3、Mistral |

DPO 直接从偏好数据优化策略，把 RLHF 的三阶段简化为两阶段。

## 面试常问

- 为什么 LLM 需要对人类偏好对齐？不这么做会怎样？
- RLHF 的三个阶段各是什么？DPO 简化了什么？
- 对齐训练可能带来哪些副作用（如过度拒绝、政治偏见等）？

## 参考

- [Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155)
- [DPO: Direct Preference Optimization](https://arxiv.org/abs/2305.18290)
