# 学习自测：Prompt Engineering 的核心原则是什么？Zero-shot、Few-shot、CoT 的区别？

> 📚 参考：[Prompt Engineering](/概念与原理/17ai/s_ai_22-prompt_engineering) | [Function Calling](/概念与原理/17ai/s_ai_25-function_calling)

## 1. Prompt Engineering 的核心原则是什么？Zero-shot、Few-shot、CoT 的区别？

**考察点**：是否掌握 Prompt Engineering 的三大核心原则，能否区分 Zero-shot、Few-shot、CoT 的使用场景和写法。

::: details

## 核心回答

Prompt Engineering 是设计和优化输入提示词以引导大模型产出期望结果的技巧。

**三大核心原则**：
```text
1. 清晰性（Clarity）：明确告诉模型你要什么
   ❌ "分析数据"
   ✅ "分析以下销售数据，找出同比增速 Top 3 的品类，用表格输出"

2. 上下文（Context）：提供足够的背景信息
   给定角色："你是一个资深前端面试官"
   给定格式：指定输出 JSON Schema

3. 约束（Constraints）：限定输出范围和格式
   "用 50 字以内回答" / "只输出代码不要解释"
```

**提示策略对比**：

| 策略 | 做法 | 适用场景 |
|------|------|----------|
| **Zero-shot** | 不给示例，直接问 | 简单任务（翻译、摘要） |
| **Few-shot** | 给 2-5 个输入→输出示例 | 格式敏感的生成任务 |
| **Chain-of-Thought (CoT)** | 加一句"Let's think step by step" | 推理、数学、逻辑题 |
| **System Prompt** | 在 system role 中设定全局规则 | 对话系统的行为约束 |

```text
Few-shot 示例：
"输入：今天天气真好 → 情绪：正面
 输入：今天被领导骂了 → 情绪：负面
 输入：一般般吧 → 情绪：中性
 输入：收到 offer 了！ → 情绪：" → 模型会输出"正面"

CoT 示例：
问："小明有 5 个苹果，给了小红 2 个，又买了 3 个，还剩几个？"
不加 CoT → 可能直接输出错误答案
加 CoT → "让我们一步步思考：小明有 5 个 → 给小红 2 个后剩 3 个 → 又买了 3 个 → 5+3=8 个" → 正确答案
```

**前端实战建议**：
- System Prompt 固定为前端角色（"你是 XX 网站的智能助手"）
- 关键提示词做成可配置模板
- 在 prompt 中要求输出结构化格式便于前端解析

## 面试回答要点

- 说出三大原则：清晰性、上下文、约束
- 区分 Zero-shot/Few-shot/CoT 的用法
- 知道 System Prompt 是持久化角色设定

:::

> 来源：[Prompt Engineering 概念讲解](/概念与原理/17ai/s_ai_22-prompt_engineering)
