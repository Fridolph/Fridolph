# 向量数据库

## 概念

向量数据库（Vector Database）是一种专门存储和检索**高维向量**的数据库系统。与传统数据库按精确值查询不同，向量数据库通过**计算向量之间的相似度**来找到最相关的结果。

在 AI 应用中，向量数据库是 RAG、语义搜索、推荐系统等功能的**核心基础设施**。

## 为什么需要向量数据库

传统关键词搜索的问题：
- `"JavaScript 异步编程"` 搜不到 `"JS async/await 详解"`
- 用户说 `"便宜好用的手机"` 搜不到 `"高性价比智能机推荐"`

向量搜索用语义相似度替代关键词匹配，理解了用户的**意图**而非文字。

## 核心概念

### 向量索引（Vector Index）

为加速海量向量间的相似度搜索而设计的数据结构：

- **ANN（近似最近邻）**：牺牲微小精度换取极大加速
- **HNSW（分层可导航小世界图）**：当前最主流的 ANN 算法
- **IVF（倒排文件索引）**：先聚类再在最近的几个簇中搜索

### 相似度度量

| 方法 | 描述 | 适用场景 |
|------|------|---------|
| 余弦相似度 | angle between vectors | 语义搜索（最常用） |
| 欧氏距离 | straight-line distance | 图像、音频 |
| 点积（Dot Product） | vector multiplication | 需要关注向量大小的场景 |

### Metadata 过滤

在向量相似度之外，结合传统字段过滤：

```
"在 2024 年发表的论文中，找到与'Transformer 架构'最相关的..."
        ↑ metadata 过滤                    ↑ 向量相似度
```

## 主流向量数据库

| 名称 | 类型 | 特点 |
|------|------|------|
| **Milvus** | 专用向量库 | 开源、分布式、高性能 |
| **Pinecone** | 云服务 | 全托管、零运维 |
| **Weaviate** | 专用向量库 | 开源、内置向量化 |
| **Qdrant** | 专用向量库 | Rust 编写、高性能 |
| **Chroma** | 轻量向量库 | 适合原型和小项目 |
| **pgvector** | PostgreSQL 插件 | 在现有 PG 中直接用 |
| **Elasticsearch** | 搜索引擎+向量 | 全文搜索+向量搜索一体 |
| **FAISS** | 向量索引库 | Meta 开源，纯向量索引 |
| **Voy** | 向量索引 | Spotify 开源，WASM 可运行 |

## 前端使用场景

### 浏览器端向量搜索

- **Transformers.js** + **Voy**：在浏览器中做 Embedding + 向量检索
- 适合离线 PWA 应用、客户端隐私数据搜索

### 后端向量数据库 + 前端 API

最常见的架构：
```
用户输入 → 后端 API → Embedding → 向量库检索 → Top-K 文档 → 返回前端
```

前端只负责展示，不需要处理向量计算。

## 面试常问

- 向量数据库和传统数据库的核心区别是什么？
- 为什么向量搜索不追求精确匹配，而用近似最近邻（ANN）？
- 列举一个前端可以用的向量检索方案。

## 参考

- [Milvus Documentation](https://milvus.io/docs)
- [Pinecone: What is a Vector Database](https://www.pinecone.io/learn/vector-database/)
- [Voy: WASM vector similarity search](https://github.com/spotify/voy)
