# 生成式 AI

## 概念

生成式 AI（Generative AI）是一类能够**创造新内容**的 AI 系统，包括文本、图像、音频、视频、代码等。与**判别式 AI**（只做分类和预测）不同，生成式 AI 学习的是数据的**概率分布**，从而能够生成与训练数据风格相似但又不完全相同的新内容。

核心公式可以理解为：给定训练数据分布 P(data)，生成模型学习 P(new | context)，在给定上下文后生成全新的内容。

## 判别式 AI vs 生成式 AI

| 维度 | 判别式 AI | 生成式 AI |
|------|----------|----------|
| 目标 | 学习决策边界 P(y | x) | 学习数据分布 P(x) 或 P(x | y) |
| 输出 | 分类标签、数值 | 文本、图片、音频等新内容 |
| 典型任务 | 图像分类、垃圾邮件检测 | 文本生成、图像生成、对话 |
| 举例 | ResNet、XGBoost | GPT-4、Stable Diffusion |

## 三大核心技术路线

### 自回归模型（Autoregressive Models）

逐个元素（token/pixel）地生成，每个新元素依赖之前已生成的内容。

- 代表：GPT 系列、Llama、Claude
- 应用：文本生成、代码补全
- 特点：生成质量高，但逐 token 生成速度较慢

### 扩散模型（Diffusion Models）

通过学习逆向去噪过程来生成数据。训练时逐步加噪破坏数据，推理时从纯噪声逐步去噪还原。

- 代表：Stable Diffusion、DALL·E、Midjourney
- 应用：图像生成、视频生成
- 特点：生成质量极高，但推理步骤多、速度慢

### GAN（生成对抗网络）

由**生成器**和**判别器**两个网络相互博弈训练。

- 生成器：从随机噪声生成数据，试图"骗过"判别器
- 判别器：区分真实数据和生成数据
- 代表：StyleGAN、CycleGAN
- 特点：生成速度快，但训练不稳定

## AIGC 应用场景

AIGC（AI Generated Content）正在重塑内容创作方式：

- **文本**：ChatGPT 写作、翻译、摘要
- **代码**：GitHub Copilot、Cursor 代码补全
- **图像**：Midjourney 海报设计、Stable Diffusion 素材生成
- **音频**：Suno AI 音乐生成、ElevenLabs 语音合成
- **视频**：Sora、Runway 视频生成

## 面试常问

- 什么是 AIGC？它给前端开发带来了哪些变化？
- 生成式 AI 和以前的 AI 有什么本质不同？
- 前端如何集成生成式 AI 的能力？

## 参考

- [Generative AI - Wikipedia](https://en.wikipedia.org/wiki/Generative_artificial_intelligence)
- [What is Generative AI - NVIDIA](https://www.nvidia.com/en-us/glossary/generative-ai/)
