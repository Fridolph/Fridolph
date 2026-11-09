# AI Agent（智能体）

## 概念

AI Agent（智能体）是能够**自主规划、使用工具、执行多步任务**的 AI 系统。与传统 LLM 应用的区别在于：Agent 不只是"回答"，而是能**采取行动**——调用 API、搜索信息、读写文件、执行代码等。

简单类比：LLM 是大脑，Agent 是有了手和工具的大脑。

## Agent 的核心能力

### 规划（Planning）

将复杂任务拆解为可执行的子步骤：

- **任务分解**：把"帮我分析这份数据并生成报告"分解为：读取数据 → 清洗 → 分析 → 生成图表 → 写报告
- **动态调整**：根据执行结果实时调整计划

### 工具使用（Tool Use / Function Calling）

Agent 可以调用外部工具来扩展能力：

- 搜索引擎（获取最新信息）
- 计算器（精确计算）
- 代码执行器（运行代码）
- API 调用（操作外部系统）

详见 Function Calling 章节。

### 记忆（Memory）

- **短期记忆**：当前对话的上下文
- **长期记忆**：跨会话的知识积累（向量库 + RAG）
- **工作记忆**：当前任务中间结果

## ReAct 模式

最经典的 Agent 推理-行动框架：

```
循环：
  Thought（思考）：我当前需要做什么？
  Action（行动）：调用工具 / 执行操作
  Observation（观察）：工具返回了什么结果？
  (重复直到任务完成)
```

**示例**：
```
用户：今天北京天气如何？适合户外跑步吗？

Thought：我需要查询北京今天的天气
Action：调用 weather_api(city="北京")
Observation：晴，15°C，PM2.5=35

Thought：天气晴好，温度适宜，空气质量良好
Answer：今天北京天气晴好，气温15°C，空气质量优，非常适合户外跑步！
```

## Agent 类型

| 类型 | 描述 | 应用 |
|------|------|------|
| 单 Agent | 一个模型完成所有操作 | 个人助手 |
| Multi-Agent | 多个 Agent 分工协作 | 复杂系统（详见 Multi-Agent 章节） |
| RAG Agent | 主要依赖检索增强生成 | 知识问答 |
| Code Agent | 专注于代码执行和生成 | 编程助手 |

## 前端 Agent 场景

- **客服 Agent**：查询订单 + 知识库回答 + 操作工单系统
- **数据分析 Agent**：用户问 → Agent 写 SQL → 执行 → 可视化结果
- **开发助手 Agent**：从需求描述到生成代码文件
- **办公 Agent**：读取邮件 → 提取信息 → 更新日程 → 回复确认

## Agent 的核心挑战

- **可靠性**：多步任务中任何一步出错都可能失败
- **成本**：一次 Agent 调用可能涉及 10+ 次 LLM API 调用
- **安全**：Agent 执行不可控操作的风险（如意外删除文件）
- **循环**：Agent 可能陷入无效循环

## 面试常问

- AI Agent 和传统 LLM 应用的核心区别是什么？
- 描述 ReAct 模式的工作循环。
- 你在前端实现过 Agent 吗？遇到了什么挑战？

## 参考

- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)
- [LangGraph Agent Guide](https://langchain-ai.github.io/langgraph/)
- [Building effective agents - Anthropic](https://www.anthropic.com/research/building-effective-agents)
