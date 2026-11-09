# Function Calling（函数调用）

## 概念

Function Calling（函数调用 / Tool Use）是 LLM **调用外部函数或 API 来扩展自身能力**的机制。模型不直接执行函数，而是**输出结构化的函数调用请求**（函数名+参数 JSON），由你的应用代码实际执行并将结果返回给模型。

这是 LLM 从"只会说话"进化为"能做事"的关键能力。

## 工作原理

```
用户输入 → LLM 判断是否需要调用函数
         ↓ 需要
    输出函数名 + JSON 参数
         ↓
    应用代码执行函数
         ↓
    将执行结果返回 LLM
         ↓
    LLM 结合结果生成最终回答
```

## 函数定义示例

向 API 提交函数定义（JSON Schema 格式）：

```json
{
  "name": "get_weather",
  "description": "获取指定城市的天气信息",
  "parameters": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string",
        "description": "城市名称，如 '北京'"
      },
      "unit": {
        "type": "string",
        "enum": ["celsius", "fahrenheit"],
        "description": "温度单位"
      }
    },
    "required": ["city"]
  }
}
```

模型会根据用户输入决定是否调用 `get_weather`，并生成：

```json
{
  "name": "get_weather",
  "arguments": "{\"city\": \"北京\", \"unit\": \"celsius\"}"
}
```

## 前端实现流程

### 1. 定义函数 Schema

```javascript
const tools = [{
  type: 'function',
  function: {
    name: 'search_knowledge_base',
    description: '在内部知识库中搜索',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: '搜索关键词' },
        category: { type: 'string', enum: ['前端', '后端', 'AI'] }
      },
      required: ['query']
    }
  }
}]
```

### 2. 发送请求并处理函数调用

```javascript
const response = await fetch(apiUrl, {
  body: JSON.stringify({
    model: 'gpt-4o',
    messages: [...],
    tools,                           // 传入工具定义
    tool_choice: 'auto'              // 模型自行决定是否调用
  })
})

const msg = (await response.json()).choices[0].message

if (msg.tool_calls) {
  // 模型请求调用函数
  for (const call of msg.tool_calls) {
    const result = await executeFunction(call.function.name, call.function.arguments)
    // 将结果追加到 messages 并再次调用 LLM
    messages.push({ role: 'tool', content: result, tool_call_id: call.id })
  }
  // 再次调用 LLM 生成最终回答
}
```

### 3. 执行函数并返回结果

```javascript
async function executeFunction(name, argsStr) {
  const args = JSON.parse(argsStr)
  switch (name) {
    case 'search_knowledge_base':
      return await searchDB(args.query, args.category)
    case 'get_weather':
      return await fetchWeather(args.city, args.unit)
  }
}
```

## Structured Output（结构化输出）

Function Calling 的进化版，强制 LLM 输出符合指定 JSON Schema 的内容：

```json
{
  "response_format": {
    "type": "json_schema",
    "json_schema": {
      "name": "code_review",
      "schema": {
        "type": "object",
        "properties": {
          "issues": { "type": "array", "items": { "type": "string" } },
          "score": { "type": "integer", "minimum": 0, "maximum": 100 }
        },
        "required": ["issues", "score"]
      }
    }
  }
}
```

与 Function Calling 的区别：
- **Function Calling**：模型输出函数调用意图
- **Structured Output**：模型直接输出符合 schema 的 JSON 内容

## 面试常问

- Function Calling 的工作流程是怎样的？模型真的调了函数吗？
- 如何在前端安全地处理 LLM 的函数调用（防止注入、限制操作）？
- Structured Output 和 Function Calling 各适合什么场景？

## 参考

- [OpenAI Function Calling Guide](https://platform.openai.com/docs/guides/function-calling)
- [Anthropic Tool Use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use)
- [OpenAI Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)
