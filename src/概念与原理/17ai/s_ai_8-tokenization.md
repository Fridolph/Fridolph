# Token 与分词

## 概念

Token（词元）是大语言模型处理文本的**最小单位**。分词（Tokenization）是将原始文本转换为 token 序列的过程。LLM 不直接理解字符或单词，而是理解 token。

一个 token 大约相当于：
- 英文：0.75 个单词
- 中文：0.5 ~ 1 个汉字
- 代码：取决于语言结构

**示例**：`"Hello, world!"` → `["Hello", ",", " world", "!"]`（4 个 token）

## 常见分词算法

### BPE（Byte Pair Encoding）

GPT 系列使用的算法。从字符开始，反复合并最高频的相邻 token 对，直到达到预设词汇表大小。

- **优点**：能处理未见过的新词（通过合并已知子词）
- **缺点**：词汇表需要精心控制大小

### WordPiece

BERT 使用的算法。与 BPE 类似，但合并时选择能最大化训练数据似然度的 token 对。

### SentencePiece

LLaMA、Mistral 等使用的算法。直接将原始文本当作字节流处理，不依赖预分词。

### Unigram

T5 等使用的算法。从一个大的词汇表开始，通过删除低概率的 token 来缩减。

## Token 的实际影响

### Token 限制（上下文窗口）

每个 LLM 有最大 token 数限制（如 GPT-4 的 128K），输入+输出合在一起不能超过此限制。超过就需要截断或压缩。

### Token 计费

API 服务按 token 计费：
- **输入 token**（prompt）：通常价格较低
- **输出 token**（completion）：通常价格较高
- 不同模型价格差异巨大（DeepSeek V3 输入约 ¥1/百万 token，GPT-4o 输入约 $2.5/百万 token）

### 前端实践

- 预估 token 消耗来优化成本（使用 `tiktoken` 等库）
- 控制上下文大小，避免超出模型限制
- 中英文混用和特殊字符会增加 token 消耗

## 面试常问

- 一个中文汉字大约等于多少 token？为什么不是 1:1？
- 如何在前端估算一段文本的 token 数量？
- Token 数超过模型限制时，前端应该如何处理？

## 参考

- [OpenAI Tokenizer](https://platform.openai.com/tokenizer)
- [Hugging Face Tokenizers](https://huggingface.co/docs/tokenizers/index)
