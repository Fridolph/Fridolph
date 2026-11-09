# Embedding（向量嵌入）

## 概念

Embedding（向量嵌入）是将离散的对象（词、句子、图片等）映射到**连续向量空间**中的稠密向量表示。在这个空间中，语义相近的对象距离也相近。

简单理解：Embedding 就是给每个词/句子/文档分配一个**高维坐标**，语义相似的文本在这个空间中的坐标距离很近。

**示例**：
- "猫" 的向量 ≈ [0.2, 0.8, -0.3, ...]
- "狗" 的向量 ≈ [0.25, 0.75, -0.28, ...]（两者余弦相似度很高）
- "电脑" 的向量 ≈ [-0.6, 0.1, 0.7, ...]（与前两者相似度低）

## 核心原理

### Word Embedding（词嵌入）

最早的 Embedding 形式，将单个词映射到向量：

- **Word2Vec**（2013）：通过 CBOW 或 Skip-gram 训练
- **GloVe**（2014）：基于全局词共现矩阵
- **FastText**：将词分解为 n-gram 字符子串

### Sentence Embedding（句子嵌入）

将整句话映射为单个向量：

- **BERT Embedding**：取 [CLS] token 或各 token 平均
- **Sentence-BERT**：专门为句子相似度优化的 BERT
- **OpenAI text-embedding-3**：商用 Embedding 模型

### 向量运算

Embedding 向量支持语义运算：

```
king - man + woman ≈ queen
```

这是 Embedding 的经典特性：向量空间中的方向和距离编码了语义关系。

## Embedding 在前端的应用

### 语义搜索

1. 将用户查询转为 Embedding 向量
2. 在向量数据库中搜索最相似的文档向量
3. 返回语义相关的文档（而不是关键词匹配）

### 文本相似度

用**余弦相似度**计算两个 Embedding 向量的距离：

```
cosine_similarity(A, B) = (A · B) / (||A|| · ||B||)
```

值域 [-1, 1]，越接近 1 越相似。

### 推荐系统

- 将用户行为序列 Embedding
- 将物品描述 Embedding
- 匹配最相关的推荐内容

## 常用 Embedding 模型

| 模型 | 维度 | 特点 |
|------|------|------|
| text-embedding-3-small | 512/1536 | OpenAI，性价比高 |
| text-embedding-3-large | 256/1024/3072 | OpenAI，效果最好 |
| bge-large-zh-v1.5 | 1024 | 中文 Embedding 标杆 |
| m3e-large | 1024 | 中文社区流行 |
| all-MiniLM-L6-v2 | 384 | 轻量开源，适合浏览器 |

## 面试常问

- Embedding 和传统的关键词索引有什么区别？
- 如何判断两个 Embedding 向量的相似度？
- 前端可以做 Embedding 计算吗？为什么通常放在后端？

## 参考

- [Google Embedding 课程](https://developers.google.com/machine-learning/crash-course/embeddings)
- [OpenAI Embeddings Guide](https://platform.openai.com/docs/guides/embeddings)
