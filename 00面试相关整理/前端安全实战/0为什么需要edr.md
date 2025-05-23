# 端点保护，必不可少但能力有限

## 预防和阻止已经不够

总体而言，当前顶级安全厂商的端点保护解决方案已经非常出色。 与过去相比，现代的端点保护工具可以比以往阻止更多的恶意软件和更多类型的威胁。 顶级的安全厂商已经结合了人工智能（AI），机器学习（ML）和自适应启发式技术，远远超出了静态且易于绕过的“病毒特征库”防护。现在，预执行前检测，执行时阻止，执行后终止是顶级端点保护产品的必备功能。 总的来说，误报更少，检测更快更精准，能对检测的内容和原因进行更好的解释。 但是，每个安全领导者都应牢记，端点保护有其不足之处。 当规划网络安全战略时，您应该详细了解。

## 端点保护的不足之处

在每次攻击开始之前，检测和阻止攻击，查杀所有病毒是任何安全团队都希望达到的理想状态，但是回顾历史，证明这是一个遥不可及的目标 。 防护率从未达到 100％，“完美的安全”永远无法实现。 无文件攻击和浏览器攻击不会在硬盘中存储任何文件，许多高级的，多阶段，多向量攻击只会以某种方式展开，看起来像正常的行为，从而使检测它们变得异常困难，甚至无法阻止。 其中许多攻击只能在进行中或事后检测。 具体来说，端点保护的不足之处包括：

- 检测的太少，太迟了：端点保护可能会进行检测，但仅在恶意软件已经部分或全部成功到达计算机时，才检测，且只告诉你已经阻止，要么就是没有检测到任何威胁，攻击成功，计算机失陷，威胁运行。

- 丢失关联的线索：端点保护可能会生成许多警报，但是每个警报都是独立的，没有关联。 分析师看不到完整的事件或相关事件链。

- 出了问题，该怎么办？ 恶意软件可能已被端点保护阻止，但分析人员不知道该漏洞的严重程度，它是否存在于其他计算机上，或者是否需要清除其他任何内容。

## 为什么需要在防护堆栈中使用 EDR

### 消除关键的安全漏洞

端点保护对于合规性以及消除外部恶意软件和常见威胁是必需的，但对于防御高级，复杂或针对性的攻击，还远远不够。 如果您拥有重要的知识产权，个人身份信息 PII/个人健康信息 PHI，客户或财务数据，那么 EDR 不再是奢侈的东西，现在已成为必需品。

### 对高级威胁的防护不足

端点保护通常无法提供针对高级威胁的足够防护。 复杂的攻击通常使用正常的行为，例如：打开文档，建立远程连接，从 Internet 下载资源等，但随后才表现出可疑或恶意行为。

### 缺乏警报分类和响应功能

端点保护会生成许多警报，但看不到攻击的所有元素。 尽管每个警报都代表端点保护阻止了威胁，但是安全团队可能需要采取后续措施，进行调查和采取纠正操作，而不是仅仅删除发现的恶意文件。 如果你使用端点保护方案，你从哪里开始着手？

### 发现漏洞后响应缓慢

端点保护提供很少的攻击预警信号，几乎没有有关威胁评估的详细信息。 用户可能会注意到计算机的行为异常，或者网络工程师可能会看到异常的流量模式或数据高峰，但是没有提供有关因果关系的详细信息。

### 无法识别根本原因并防止攻击再次发生

好的，您的端点保护解决方案已经阻止了恶意软件。 但是，还不是庆祝的时候。 您是否可以确定整个攻击是被阻止的还是仅某些攻击被阻止了？ 其余的攻击是否逃避了检测并攻击成功了？攻击的入口点是什么？ 它从哪里来的？ 我们如何关闭那条攻击链路，使攻击不再发生？

### 无法了解攻击者使用的 TTP/入侵指标 IOC

这是一次性事件还是在企业中的许多受害机器上都有这样的事件，会不会是系统性事件？ 是否已经多次发生相同或相似的攻击？ 攻击是否仍在组织中的其他计算机上进行？ 您能否在整个系统范围内使用入侵指标进行搜索？有没有关于主动改善安全状况的建议？您如何改善安全状况并加强防护，以防止将来被入侵？ 您是否可以识别会给您的组织带来风险的操作系统配置错误，应用程序漏洞和人为风险因素？ 一旦确定，您是否可以根据改进指标来衡量和修正？

## EDR 商业驱动

以下是需要在您的防护武器库中添加 EDR 的主要商业驱动因素：

- 您无法确保 100％防护高级入侵，以防止入侵者留在您的系统中
- 一旦发现潜在的入侵指标，您无法终止可疑活动或隔离受感染的计算机
- 您缺乏可操作的情报来采取行动，也没有循序渐进的建议来指导如何处理已识别的入侵行为
- 您缺乏集中的威胁数据库，无法跨系统进行协调的攻击分析和补救
- 您不了解基础架构面临的系统性风险，也不知道如何主动改善安全状况

### EDR 产品类型

端点检测和响应提供单独的价值，并具有自己的优点，与端点保护相辅相成。 将这两种解决方案串联起来防护，可以防范规避防御的的最复杂攻击。

### 您如何评价您的端点保护工具？

所有端点保护解决方案都各有利弊，需要权衡利弊。 哪个陈述最能描述您的端点保护状况？

- 我对我的端点保护解决方案感到满意，但是我意识到它在调查和修复方面的局限性
- 我对当前的端点保护解决方案不满意，但是我现有的合同仍然有时间
- 当前的端点保护解决方案很糟糕，需要立即替换

如果您符合上述三种陈述，我们建议您立即升级到 Bitdefender EDR，它未来带来了前所未有的安全能力，而且比您想象的更简单，更具成本效益。

### 独立的 EDR

在以下情况下，安全领导者可能会认为独立 EDR 是端点保护的宝贵补充：

- 安全分析师缺乏对端点和网络上可疑和恶意活动的了解
- 现有的端点保护解决方案缺少 EDR，XDR 或 MDR
- 需要与现有端点保护解决方案兼容，需要事件检测和报告功能
- 寻求具有轻量级代理且易于部署和管理的事件响应平台
- 希望简化安全工作流程，以进行威胁取证和端点补救

## EDR vs. SIEM 工具

### EDR 针对安全团队进行了优化

EDR 是端点保护和 SIEM 系统之间的“中间地带”。SIEM 工具功能强大，在大型企业中发挥着重要作用，但它们也很昂贵（要不断获取人员，进行运营和维护），通常它们无法进入中小型企业，不太适合中小型客户。

SIEM 通常将重点放在特定的事件，离散事件或指标上，而不是为了支持完整的事件，攻击或活动，或事件之间的因果联系，进程或关系而设计的，这要由熟练的分析师来得出自己的结论，数据到底包含什么。 提示事件关系的数据可视化必须手动构建，从而导致团队中分析结果的差异。

SIEM 不可操作。 它们汇总了单向数据馈送的结果，而没有返回原始系统的路径。 无法进行更新，也不能从 SIEM 工具中采取任何直接措施来执行修复。 新事件只会在旧事件之上发布。 这为熟练的分析人员提供了丰富的原始信息，以根据他们的技能和经验进行搜索，关联和得出自己的结论。

EDR 专门用于检测和响应事件。 它会自动将单个警报升级为全面的事件，显示攻击各个阶段的因果链，然后直接从控制台执行调查和修复。 此外，EDR 是“为所有人服务的”，即使缺乏安全技能的中小型企业的安全团队，也能轻松进行检测和响应。

| EDR                          | 安全信息与事件管理             |
| ---------------------------- | ------------------------------ |
| 专门用于显示端点安全事件     | 汇总通用安全事件和日志         |
| 双向数据流回原始系统         | 仅来自原始系统的单向数据流     |
| 预先建立的安全响应仪表盘     | 分析师必须建立自己的仪表板     |
| 清晰的因果链接，攻击链可视化 | 没有内置的攻击链可视化         |
| 自动化事件分类和优先级       | 事件严重程度取决于分析师的解释 |
| 安全响应工作流程和建议       | 分析师确定响应步骤和顺序       |
| 由安全响应者直接采取行动     | 无法由安全响应者采取行动       |
| 对中小型安全团队进行了优化   | 最适合大型安全团队             |

## 为什么 EDR 是更好的选择

EDR 是中小型企业和大型安全团队进行检测和响应的最佳选择，而 SIEM 保持了纯“大数据”调查的优势，并为训练有素的大型安全团队提供了跨多个输入源的警报关联。

- EDR 围绕事件而不是警报进行设计，将相关事件升级为综合视图
- EDR 包含现成的，可操作的，以安全为中心的仪表盘，有助于快速响应事件
- 事件响应者可以直接在 EDR 控制台内直接采取补救措施
- 分析师可以在整个企业的 IOC 和 IOA 之间执行相关的查询和关联
- 安全团队可以使用清晰的攻击链可视化执行根本原因分析
- 管理员可以衡量和降低端点操作系统，应用程序和人为因素等多个维度的系统性风险
- 事件响应者可以快速分类警报并确定其优先级，然后按照明确的补救措施说明进行操作

### 超越 EDR

端点保护对于合规性和避免病毒，勒索软件等是必不可少的，但具有内置的局限性。 端点检测和响应更适合处理复杂的多阶段，多向量攻击，这些攻击是专门为逃避检测而设计的。对于专注于安全成果而非工具的组织， MDR 是理想的选择。MDR 可确保您获得最佳安全性，并且由安全厂商种经验丰富的安全专家 7X24 负责安全运营，帮你监视和维护安全。

### 未来发展

NDR 网络检测和响应利用传统端点和 IoT 设备生成的网络流量分析将 EDR 提升到一个新水平，以全面了解当前威胁环境。 更进一步，XDR 扩展检测和响应可跨多个企业安全控制（电子邮件，端点，服务器，云工作负载和网络）自动收集并关联数据，从而可以更快地检测到威胁，安全分析师可以缩短调查并缩短响应时间。 这种统一的安全平台可提供跨网络，云，端点和应用程序的数据模式和事件的完整可见性，同时应用人工智能和自动化来检测，分析，搜寻和解决整个企业中的高级威胁。 目前 Bitdefender 的安全产品产品组合有独立的 EDR, 集成端点保护的 EDR，XDR， MDR 等，我们仍然在持续研发，改进和优化产品，NDR 即将到来。
