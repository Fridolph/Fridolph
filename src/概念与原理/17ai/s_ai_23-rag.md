# RAG（检索增强生成）

## 概念

RAG（Retrieval-Augmented Generation，检索增强生成）是一种让 LLM **基于外部知识库回答问题**的技术，工作流程是：**先检索相关文档，再将文档内容注入 prompt 让 LLM 基于此生成答案**。

RAG 解决了 LLM 的两大核心问题：
1. **知识时效性**：LLM 训练数据有截止日期，无法回答新知识
2. **幻觉问题**：让 LLM 基于真实文档回答，大幅降低编造

## 工作流程

### Naive RAG 三步走

```
用户提问 → 向量检索 → 获取相关文档 → 构造增强 prompt → LLM 生成 → 答案
```

### 详细流程

**1. 文档预处理（离线/Indexing）**

```
原始文档 → 分块(Chunking) → Embedding向量化 → 存入向量数据库
```

- 文档按语义边界拆分为合适的 chunks（通常 256~1024 tokens）
- 每个 chunk 通过 Embedding 模型转为向量
- 向量和原始文本一起存入向量数据库

**2. 检索（Retrieval，在线）**

```
用户问题 → Embedding向量化 → 向量数据库相似度搜索 → Top-K 相关文档
```

- 将用户问题也转为 Embedding 向量
- 用余弦相似度在向量库中找到最相关的 K 个文档片段

**3. 增强生成（Augmented Generation，在线）**

```
系统指令 + 检索到的文档上下文 + 用户问题 → LLM → 基于上下文的答案
```

构造 prompt：
```
基于以下参考资料回答问题。如果资料中找不到答案，请说"资料中未提供相关信息"。

参考资料：
[检索到的文档内容]

问题：[用户问题]
```

## 核心组件

### 文档分块（Chunking）

分块策略直接影响检索质量：

| 策略 | 描述 | 适用场景 |
|------|------|---------|
| 固定大小 | 每 N 个 token 一刀 | 通用 |
| 语义分块 | 按段落/句子边界 | 长文档 |
| 滑动窗口 | 相邻块有一定重叠 | 避免截断关键信息 |
| 层级分块 | 父子块结构 | 大文档精确检索 |

### 检索方式

- **向量检索（稠密检索）**：语义相似度，召回率高
- **关键词检索（稀疏检索/BM25）**：精确匹配，互补
- **混合检索**：向量 + 关键词，取交集或加权合并

### 重排序（Re-ranking）

对检索结果进行二次精排，用更强的模型重新打分：

- Cross-Encoder 模型（如 Cohere Rerank、bge-reranker）
- 有效提升 Top-K 结果的相关性

## 前端实践

### 适合前端实现的 RAG

- **客户端向量检索**：小规模知识库可用 Transformers.js 在浏览器中做 Embedding + 检索
- **服务端 RAG + 前端流式展示**：后端处理检索和 LLM 调用，前端展示带引用标注的流式回答
- **Edge RAG**：在 Cloudflare Workers 等边缘节点实现轻量 RAG

### UI 设计要点

- 展示检索到的**引用来源**（链接、高亮原文）
- 区分"基于资料的回答"和"模型推断"
- 对没有找到相关信息的情况给出清晰提示

## 高级 RAG 模式

| 模式 | 描述 |
|------|------|
| Self-RAG | 模型自行判断是否需要检索 |
| Corrective RAG | 评估检索质量，质量不够时回退到搜索 |
| Graph RAG | 结合知识图谱增强检索 |
| Agentic RAG | 多步检索、跨文档推理 |

## 面试常问

- RAG 解决的核心问题是什么？
- Naive RAG 的三个阶段各做了什么？
- 前端如何实现一个简单的 RAG 系统？有哪些限制？

## 参考

- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
- [LangChain RAG Tutorial](https://python.langchain.com/docs/tutorials/rag/)
- [LlamaIndex](https://docs.llamaindex.ai/)
