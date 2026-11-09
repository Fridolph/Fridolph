# 学习自测：前端如何处理大模型的流式输出（SSE）？逐 Token 渲染怎么做？

> 📚 参考：[流式输出 Streaming](/概念与原理/17ai/s_ai_19-streaming) | [Temperature 与采样策略](/概念与原理/17ai/s_ai_18-temperature)

**场景**：学习自测"我们做一个 AI 对话页面，怎么实现打字机效果？前后端怎么配合？"

**考察点**：SSE/流式传输原理、ReadableStream 读取、错误处理和内存管理

::: details

## 核心回答

大模型生成文本是**逐 token 生成**的，不必等所有内容生成完毕。流式输出让用户看到"一个字一个字蹦出来"的效果，大幅提升体验。

```text
非流式（普通 HTTP）：
用户请求 → 模型生成 500 token（等 5 秒）→ 一次性返回 → 用户看到结果
体验：干等 5 秒后突然出现全部文字

流式（SSE / WebSocket）：
用户请求 → 模型生成 token1 → 立即推送 → token2 → 推送 → ...
体验：即时反馈，用户知道"在生成中"
```

**SSE 实现**：

```ts
// 后端 NestJS 流式响应
@Post('chat')
@Sse('chat-stream')
async chatStream(@Body() body: ChatDto): Promise<Observable<MessageEvent>> {
  return new Observable(subscriber => {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4',
      stream: true,  // 开启流式
      messages: body.messages,
    })
    for await (const chunk of stream) {
      subscriber.next({ data: chunk.choices[0]?.delta?.content || '' })
    }
    subscriber.complete()
  })
}

// 前端 EventSource / fetch 读取
async function streamChat(prompt: string) {
  const res = await fetch('/api/chat/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
  })
  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    
    const text = decoder.decode(value, { stream: true })
    // 解析 SSE 格式: "data: xxx\n\n"
    for (const line of text.split('\n')) {
      if (line.startsWith('data: ')) {
        const chunk = line.slice(6)
        appendToDisplay(chunk) // 逐字追加到 UI
      }
    }
  }
}
```

**前端关键注意点**：
- 🗑️ 组件卸载时 `reader.cancel()` 中止请求
- 🎨 打字机效果去抖动：收到 token 先调 `requestAnimationFrame`
- 🔄 断线重连：捕获连接错误并重试
- 💾 流式内容及时存 localStorage（防刷新丢失）

## 面试回答要点

- 解释逐 Token 生成的优势（体验和性能）
- 能写出 fetch + ReadableStream 的读取流程
- 知道要在组件卸载时 `reader.cancel()`

:::

> 来源：[流式输出 Streaming 概念讲解](/概念与原理/17ai/s_ai_19-streaming)
