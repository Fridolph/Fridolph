# Prompt Engineering（提示词工程）

## 概念

Prompt Engineering 是设计和优化与 LLM 交互的**输入文本**，以引导模型生成期望输出的技术。它是目前**不需要模型训练/微调**即可影响模型行为的最重要手段。

对前端开发者而言，Prompt Engineering 是构建 AI 功能的核心技能——你写出的 prompt 质量直接决定了用户体验的 AI 功能效果。

## 核心原则

### 清晰明确

- 说清楚你想要什么，而不是"做得更好"
- 指定输出格式（JSON、Markdown、纯文本）

### 提供上下文

- 给模型设定角色（"你是一位资深前端面试官..."）
- 提供背景信息、示例数据

### 分步引导

- 复杂任务拆分为子步骤
- 明确每一步的输入和期望输出

## 关键技巧

### Zero-shot Prompting

不给示例，直接提问：

```
"用 JavaScript 实现一个节流函数"
```

### Few-shot Prompting

给几个输入-输出示例，模型学习模式后完成新任务：

```
"英文单词：dog → 中文：狗
英文单词：cat → 中文：猫
英文单词：bird →"
```

### Chain-of-Thought（CoT / 思维链）

要求模型**逐步推理**而不是直接给答案：

```
"问题：小明有 5 个苹果，吃了 2 个，又买了 3 个，现在有几个？
让我们一步步思考：
1. 小明最初有 5 个苹果
2. 吃了 2 个，剩下 5-2=3 个
3. 又买了 3 个，现在有 3+3=6 个
答案：6 个"
```

**关键**：只需在 prompt 中添加"Let's think step by step"即可激活 CoT 能力。

### System Prompt（系统提示）

在对话开始前设置全局指令，定义模型的角色、行为边界和输出风格：

```
"你是一位精通 TypeScript 的前端工程师。回答问题时：
- 代码示例使用 TypeScript
- 解释要简洁专业
- 不确定的地方要明确标注"
```

### Role Prompting

给模型一个具体的"人设"：

```
"你现在是一位有 10 年经验的 Vue.js 架构师，请评估这段代码..."
```

### Structured Output

要求模型输出特定格式：

```
"请以 JSON 格式输出，包含以下字段：question, answer, difficulty"
```

## 常见 Prompt 模式

| 模式 | 描述 | 示例 |
|------|------|------|
| 指令式 | 直接给任务 | "翻译成英文" |
| 角色式 | 赋予人设 | "作为资深律师..." |
| 示例式 | Few-shot | 给 3 个例子后提问 |
| 格式约束 | 指定输出格式 | "以 JSON 格式返回" |
| 思维链 | 要求推理过程 | "一步步思考" |
| 自我批评 | 要求自查 | "检查你的回答是否有错误" |

## 面试常问

- 什么是 Prompt Engineering？为什么它比微调更常用？
- Zero-shot 和 Few-shot 的区别？各举一个使用场景。
- 你做过哪些 Prompt Engineering 的实践？效果如何？

## 参考

- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic Prompt Library](https://docs.anthropic.com/claude/prompt-library)
- [Prompt Engineering Guide - DAIR.AI](https://www.promptingguide.ai/)
