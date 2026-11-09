# 学习自测：向量数据库与语义搜索

> 📚 参考：[向量数据库](/概念与原理/17ai/s_ai_26-vector_database) | [Embedding](/概念与原理/17ai/s_ai_9-embedding) | [RAG](/概念与原理/17ai/s_ai_23-rag)

## 1. 向量数据库和传统数据库的核心区别？

**考察点**：理解向量搜索 vs 关键词搜索，ANN 的概念。

::: details

**核心回答**：

传统数据库按**精确值**查询：`WHERE name = '张三'`

向量数据库按**语义相似度**查询：`找到与"便宜好用的手机"最相似的文档`

```text
传统搜索：用户输入"JavaScript 异步编程"
          ↓ 关键词匹配
          ✗ 搜不到 "JS async/await 详解"（关键词不匹配）

向量搜索：用户输入"JavaScript 异步编程"
          ↓ Embedding → 向量 → 语义相似度计算
          ✓ 返回 "JS async/await 详解"（语义相近）
```

**核心差异**：

| 维度 | 传统数据库 | 向量数据库 |
|------|----------|-----------|
| 查询方式 | 精确匹配 `WHERE` | 近似匹配 ANN |
| 结果 | 精确结果 | Top-K 最相似 |
| 索引 | B-Tree/Hash | HNSW/IVF |
| 典型场景 | 业务数据 CRUD | 语义搜索/推荐/RAG |
:::

## 2. 向量数据库的相似度度量有什么？各自适用什么场景？

::: details

| 方法 | 公式思想 | 值域 | 适用 |
|------|---------|------|------|
| **余弦相似度** | 向量夹角 | [-1, 1] | 文本语义搜索（最常用） |
| **欧氏距离** | 空间距离 | [0, ∞] | 图像/音频 |
| **点积** | 投影长度 | 取决于向量 | Embedding 已归一化时用 |

```js
// 余弦相似度：值越接近 1 越相似
function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0)
  const normA = Math.sqrt(a.reduce((s, ai) => s + ai * ai, 0))
  const normB = Math.sqrt(b.reduce((s, bi) => s + bi * bi, 0))
  return dot / (normA * normB)
}
```

前端小规模搜索可直接用 JS 暴力计算，大规模需借助向量数据库的 ANN 索引。
:::

## 3. 前端能用向量数据库吗？有哪些方案？

::: details

**方案对比**：

| 方案 | 适用 | 特点 |
|------|------|------|
| **纯前端 WASM** | 小规模（< 10K 条） | Transformers.js + Voy/Arctic，离线可用 |
| **BFF + 向量库** | 中规模 | 后端 pgvector/Milvus，前端调 API |
| **云服务** | 大规模 | Pinecone/Weaviate Cloud，零运维 |

```ts
// 前端浏览器端向量搜索示例
import { pipeline } from '@xenova/transformers'
import { Voy } from 'voy-search'

// 1. 创建 Embedding 实例
const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')

// 2. 创建向量索引
const index = new Voy()

// 3. 插入文档
for (const doc of knowledgeBase) {
  const embedding = await embedder(doc.text, { pooling: 'mean' })
  index.add({ id: doc.id, title: doc.title, embedding: Array.from(embedding.data) })
}

// 4. 搜索
const queryEmbedding = await embedder(userQuery, { pooling: 'mean' })
const results = index.search(Array.from(queryEmbedding.data), 5)
```
:::

## 4. pgvector 适合什么场景？和 Milvus/Pinecone 怎么选？

::: details

| 方案 | 类型 | 优势 | 劣势 | 适用 |
|------|------|------|------|------|
| **pgvector** | PostgreSQL 插件 | 无需额外运维、强事务 | 百万级以上性能下降 | 已有 PG 的中小型项目 |
| **Milvus** | 专用向量库 | 分布式、十亿级 | 运维复杂度高 | 大规模专用搜索 |
| **Pinecone** | 云服务 | 零运维、弹性伸缩 | 成本较高、厂商锁定 | 快速上线 |
| **Chroma** | 轻量嵌入式 | 开发体验好 | 生产级能力弱 | 原型/PoC |
| **Qdrant** | 专用向量库 | Rust 高性能 | 社区较小 | 性能敏感场景 |

**决策**：已有 PG → pgvector 起步；新项目快速上线 → Pinecone；大规模专用 → Milvus/Qdrant。
:::

> 来源：[向量数据库概念讲解](/概念与原理/17ai/s_ai_26-vector_database)
