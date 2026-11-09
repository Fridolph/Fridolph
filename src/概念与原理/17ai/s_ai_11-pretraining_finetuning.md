# 预训练与微调

## 概念

### 预训练（Pre-training）

在**海量无标注数据**上，用大规模算力训练一个通用基础模型，让模型学会语言的通用表示（语法、常识、推理等）。这是 LLM 最核心、最昂贵的阶段。

- **数据**：万亿级别的 token（网页、书籍、代码、论文等）
- **任务**：自监督学习（如 预测下一个 token / 填空）
- **成本**：数千万美元级别（算力+电力）

### 微调（Fine-tuning）

在预训练模型的基础上，用**特定领域的小规模标注数据**进一步调整模型参数，使其适应特定任务或风格。

- **数据**：数千到数百万条标注样本
- **目的**：适配垂直领域（医疗/法律）、调整输出风格、增强特定能力

## 微调的三种方式

### 全量微调（Full Fine-tuning）

更新模型的**所有参数**。

- 效果最好但计算成本高
- 需要存储整个新模型
- 适用于有充足资源的场景

### 参数高效微调（PEFT）

只更新模型的**一小部分参数**，大幅降低微调成本。

#### LoRA（Low-Rank Adaptation）

在原始权重旁添加低秩矩阵，只训练这些新增的小矩阵：

- 训练参数量可降至原模型的 0.1%~1%
- 微调后只需保存 LoRA 权重文件（几 MB 到几百 MB）
- 可在同一基座模型上切换多个 LoRA（多任务能力）

#### QLoRA

LoRA + 4-bit 量化，进一步降低显存需求（可在消费级 GPU 上微调 70B 模型）。

### 指令微调（Instruction Tuning）

用**指令-回答**格式的数据训练，让模型学会遵循人类指令，而不是简单地续写文本。

ChatGPT 的成功很大程度归功于指令微调。

## 对齐训练（Alignment）

在微调之后，需要让模型的输出与**人类价值观**对齐：

- **SFT（Supervised Fine-Tuning）**：用高质量人工标注数据训练
- **RLHF（Reinforcement Learning from Human Feedback）**：训练奖励模型→用强化学习优化
- **DPO（Direct Preference Optimization）**：直接优化偏好数据，无需奖励模型

详见 RLHF 章节。

## 面试常问

- 预训练和微调的核心区别是什么？
- 什么是 LoRA？为什么它在前端/中小企业中很实用？
- 一个完整的 LLM 训练流程包含哪些阶段？

## 参考

- [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)
- [QLoRA: Efficient Finetuning of Quantized LLMs](https://arxiv.org/abs/2305.14314)
