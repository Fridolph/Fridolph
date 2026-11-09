# 模型量化

## 概念

模型量化（Quantization）是将神经网络的**参数从高精度（如 32 位浮点数）转换为低精度（如 4 位/8 位整数）**，以降低模型体积和推理显存需求的技术。本质是用精度换效率。

类比：一张 24-bit 的 BMP 图片转为 8-bit PNG，肉眼几乎看不出区别但体积大幅减小。

## 为什么要量化

LLM 部署面临的主要挑战：

| 模型规模 | FP32 显存 | 量化后 (INT4) |
|---------|-----------|---------------|
| Llama 3 8B | ~32 GB | ~5 GB |
| Llama 3 70B | ~280 GB | ~40 GB |
| DeepSeek V3 671B | ~2.6 TB | ~350 GB (INT4) |

量化使得在**消费级硬件**（甚至浏览器中）运行大模型成为可能。

## 量化精度对比

| 精度 | 位数 | 常见应用 |
|------|------|---------|
| FP32 | 32 | 原始训练精度 |
| FP16/BF16 | 16 | 主流推理精度 |
| INT8 | 8 | 边缘端推理 |
| INT4 | 4 | 消费级 GPU 推理 |
| INT2/NiB | 2-3 | 极端压缩 |

## 量化方法

### 训练后量化（PTQ - Post-Training Quantization）

模型训练完成后直接量化，不需要重新训练：

- **优点**：快速、简单
- **缺点**：精度损失较大，尤其是 4-bit 以下

### 量化感知训练（QAT - Quantization-Aware Training）

在训练时就模拟量化效果，让模型"适应"低精度：

- **优点**：精度损失小
- **缺点**：需要重新训练，成本高

### GGUF / GPTQ

两种最主流的 PTQ 格式：

- **GGUF**（GGML Universal Format）：llama.cpp 使用的格式，支持 CPU 推理，生态丰富
- **GPTQ**：针对 GPU 量化优化，通常精度损失更小
- **AWQ**（Activation-aware Weight Quantization）：新一代方法，精度优于 GPTQ

## 前端相关

- **WebLLM**：基于 WebGPU 在浏览器中运行量化模型（如 Llama 3 INT4）
- **Transformers.js**：Hugging Face 的浏览器推理库
- **ONNX Runtime Web**：支持 WebGL/WebGPU 的量化模型推理

## 面试常问

- 模型量化的核心思想是什么？为什么能大幅减小体积？
- FP16、INT8、INT4 分别适用于什么场景？
- 你了解哪些在浏览器中运行 LLM 的方案？

## 参考

- [GGUF and llama.cpp](https://github.com/ggerganov/llama.cpp)
- [AWQ: Activation-aware Weight Quantization](https://arxiv.org/abs/2306.00978)
