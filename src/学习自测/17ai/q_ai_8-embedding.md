# 学习自测：Embedding（向量嵌入）是什么？前端如何运用？

> 📚 参考：[Embedding 向量嵌入](/概念与原理/17ai/s_ai_9-embedding) | [向量数据库](/概念与原理/17ai/s_ai_26-vector_database)

**场景**：学习自测"我们想做语义搜索，你知道 Embedding 是什么吗？前端能做什么？"

**考察点**：Embedding 概念、语义相似度计算、前端应用场景

::: details

## 核心回答

Embedding 是将文本/图像等**高维离散数据映射为低维稠密向量**的技术，使**语义相近的内容在向量空间中距离更近**。

```text
"猫" → [0.23, -0.45, 0.78, ...]  (768维向量)
"小猫"→ [0.25, -0.43, 0.75, ...]   ← 相近
"汽车"→ [-0.67, 0.12, -0.31, ...]  ← 很远
```

**核心用途**：

| 用途 | 原理 | 例子 |
|------|------|------|
| **语义搜索** | 将搜索词和文档都向量化，用余弦相似度找最相关的 | "便宜手机" ≈ "性价比高的智能机" |
| **RAG 知识库** | 文档 Embedding → 存向量库 → 用户问题向量化 → 检索最相关文档 | AI 客服知识库 |
| **文本分类** | 相似文本的向量聚类 | 垃圾评论检测 |

**前端运用场景**：

```ts
// 1. 调用 Embedding API 生成向量
const embedding = await openai.embeddings.create({
  model: 'text-embedding-3-small',
  input: 'What is the best restaurant in Beijing?',
})
// embedding.data[0].embedding → Float32Array(1536)

// 2. 计算相似度（可用 WebAssembly 加速）
function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((s, v, i) => s + v * b[i], 0)
  const normA = Math.sqrt(a.reduce((s, v) => s + v * v, 0))
  const normB = Math.sqrt(b.reduce((s, v) => s + v * v, 0))
  return dot / (normA * normB)  // 范围 [-1, 1]
}
```

## 面试回答要点

- 解释"将语义映射到向量空间，距离近 = 含义近"
- 知道 Embedding 是 RAG 的基础
- 前端可以做相似度计算（小规模）或调用向量搜索 API

:::

> 来源：[Embedding 向量嵌入概念讲解](/概念与原理/17ai/s_ai_9-embedding)
