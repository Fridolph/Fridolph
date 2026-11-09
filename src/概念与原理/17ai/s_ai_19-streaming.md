# 流式输出（Streaming）

## 概念

流式输出（Streaming）是 LLM API 的核心功能之一，允许模型**逐 token 实时返回生成结果**，而不是等全部生成完再一次性返回。对于前端应用来说，流式输出极大改善了用户体验——用户看到文字像打字一样逐字出现。

## 工作原理

### 非流式（Non-streaming）

```
请求 → [等待...等待...全部生成完毕] → 完整响应
时间：10 秒后一次性得到结果
```

### 流式（Streaming）

```
请求 → T1 → T2 → T3 → ... → [结束]
时间：0.5 秒后开始看到第一个 token
```

每一步生成一个 token 后立即发送给客户端，而不是等待整个序列完成。这就是为什么使用 ChatGPT 时文字像打字一样出现。

## 实现方式

### SSE（Server-Sent Events）

OpenAI、Claude 等主流 API 默认使用 SSE 进行流式传输：

```javascript
// 前端使用 fetch + ReadableStream 接收 SSE
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
  body: JSON.stringify({ model: 'gpt-4o', messages, stream: true }),
})

const reader = response.body.getReader()
const decoder = new TextDecoder()

while (true) {
  const { done, value } = await reader.read()
  if (done) break
  // 解析 SSE 格式的 chunk：data: {"choices":[{"delta":{"content":"Hello"}}]}
  // 逐 token 更新 UI
}
```

**SSE 特点**：
- 单向推送（服务器 → 客户端）
- 基于 HTTP，比 WebSocket 简单
- 浏览器原生支持 `EventSource`
- 有自动重连机制

### WebSocket

双向通信，适合需要客户端中断生成或多轮交互的场景。

### 流式数据格式

每个 chunk 的典型 JSON 结构：
```json
{
  "choices": [{
    "delta": { "content": "你" },
    "index": 0
  }]
}
```

- `delta`：增量内容，每次只包含一个新生成的 token
- `finish_reason`：最后一个 chunk 会包含如 `"stop"` 或 `"length"`

## 前端实践要点

### 状态管理

- 维护累积文本 `accumulatedText += delta.content`
- 处理多个 choice（并行生成）
- 管理加载状态（生成中 / 已完成 / 出错）

### 中断生成

- 使用 `AbortController` 中断 fetch 请求
- 关闭 WebSocket 连接

### 渲染优化

- 避免每个 token 都触发完整 re-render
- 使用 `Virtual DOM diff` 或直接操作 DOM
- 对大量文本使用 `debounce` 渲染

### 错误处理

- 网络中断后重连
- Token 限制截断提示
- 敏感内容过滤后的提示

## 面试常问

- SSE 和 WebSocket 的区别？为什么 LLM API 多用 SSE？
- 前端如何用 fetch API 接收流式数据？
- 流式输出的用户体验优于非流式的原因是什么？

## 参考

- [OpenAI Streaming Guide](https://platform.openai.com/docs/api-reference/streaming)
- [Server-Sent Events - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
