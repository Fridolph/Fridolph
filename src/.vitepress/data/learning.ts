export interface LearningDomain {
  id: string
  number: string
  title: string
  description: string
  focus: string
  stages: [string, string, string]
  topics: { title: string; description: string; link: string; icon: { src: string } | { emoji: string } }[]
}

export const learningDomains: LearningDomain[] = [
  {
    id: 'frontend', number: '01', title: '前端开发',
    description: '从一个页面开始，读懂语言与框架，逐步构建体验可靠、易于维护的 Web 应用。',
    focus: '让界面不止于呈现，也能承载复杂的交互与业务。',
    stages: ['语言与页面', '组件与框架', '工程与交付'],
    topics: [
      { title: 'HTML & CSS', icon: { src: '/icons/skills/html.svg' }, description: '从语义和布局起步，理解响应式设计与可访问性，构建清晰、适配多端的页面。', link: '/概念与原理/01htmlcss/intro' },
      { title: 'JavaScript', icon: { src: '/icons/skills/javascript.svg' }, description: '掌握语言与异步编程，深入运行机制与代码组织，让复杂交互有章可循。', link: '/概念与原理/02js/intro' },
      { title: 'TypeScript', icon: { src: '/icons/skills/typescript.svg' }, description: '从类型表达走向契约设计，在组件、接口与团队协作中建立更可靠的边界。', link: '/概念与原理/11ts/intro' },
      { title: 'Vue', icon: { src: '/icons/skills/vue.svg' }, description: '从组件与响应式出发，理解框架原理，再到状态管理、业务抽象与应用组织。', link: '/概念与原理/07vue/intro' },
      { title: 'React', icon: { src: '/icons/skills/react.svg' }, description: '围绕组件、状态和数据流建立心智模型，逐步理解渲染机制与应用架构。', link: '/概念与原理/08react/intro' },
      { title: '前端工程化', icon: { src: '/icons/skills/build.svg' }, description: '理解工具如何协作，从开发与构建走向质量保障、工程规范和持续交付。', link: '/概念与原理/09build/intro' },
    ],
  },
  {
    id: 'backend', number: '02', title: '后端开发',
    description: '从处理一次请求，到设计业务与数据，让应用背后的服务稳定、可测、可演进。',
    focus: '把前端经验延伸到服务端，建立完整的业务视角。',
    stages: ['运行时与接口', '业务与数据', '可靠性与架构'],
    topics: [
      { title: 'Node.js', icon: { src: '/icons/skills/nodejs.svg' }, description: '从运行时与异步 I/O 入门，理解并发、资源管理和服务端应用的运行边界。', link: '/概念与原理/05node/intro' },
      { title: 'NestJS', icon: { src: '/icons/skills/nestjs.svg' }, description: '从模块与依赖管理起步，走向业务建模、工程治理与可测试、可演进的后端应用。', link: '/概念与原理/18nestjs/intro' },
      { title: '开发与部署', icon: { emoji: '🛠️' }, description: '从 Git 协作与 Linux 入门，理解代理、进程与容器，逐步建立可验证、可观测、可回退的交付流程。', link: '/概念与原理/20deploy/intro' },
      { title: '数据库 · PostgreSQL', icon: { emoji: '🗄️' }, description: '从数据建模与 SQL 出发，深入事务、并发和索引，在业务约束中理解数据的可靠性。', link: '/学习自测/19database/intro' },
    ],
  },
  {
    id: 'ai', number: '03', title: 'AI 应用开发',
    description: '理解模型的能力与边界，把检索、工具和业务连接起来，探索可评估的 AI 应用。',
    focus: '从一次模型调用，走向有上下文、有工具的业务能力。',
    stages: ['模型与交互', '知识与工具', '评估与应用'],
    topics: [
      { title: '大模型基础', icon: { src: '/icons/skills/ai.svg' }, description: '从 Token 与向量理解模型的工作方式，建立对生成能力、局限与风险的判断。', link: '/概念与原理/17ai/intro' },
      { title: 'Prompt 与交互', icon: { emoji: '💬' }, description: '从任务表达走向上下文设计，结合结构化输出与流式体验，改善人机协作。', link: '/概念与原理/17ai/s_ai_22-prompt_engineering' },
      { title: 'RAG 与检索', icon: { emoji: '📚' }, description: '连接私有知识与模型，从文档处理、检索到生成，逐步验证答案的相关性与可信度。', link: '/概念与原理/17ai/s_ai_23-rag' },
      { title: 'Agent 与工具', icon: { emoji: '🤖' }, description: '从工具调用到任务编排，理解状态、权限与协作，探索能完成实际工作的智能体。', link: '/概念与原理/17ai/s_ai_24-agent' },
    ],
  },
  {
    id: 'fundamentals', number: '04', title: '通用基础',
    description: '跨过框架与技术栈，回到协议、运行机制与设计方法，建立能够迁移的理解。',
    focus: '知其然，也追问其所以然；让经验能跨场景复用。',
    stages: ['机制与协议', '抽象与设计', '分析与取舍'],
    topics: [
      { title: '数据结构与算法', icon: { src: '/icons/skills/algorithm.svg' }, description: '从数据组织与复杂度分析开始，训练问题拆解、方案比较和边界验证的能力。', link: '/概念与原理/03algo/intro' },
      { title: 'HTTP 与网络', icon: { src: '/icons/skills/http.svg' }, description: '沿一次请求理解协议、缓存与传输，把浏览器交互和服务端行为联系起来。', link: '/概念与原理/04http/intro' },
      { title: '浏览器原理', icon: { src: '/icons/skills/browser.svg' }, description: '理解页面如何加载、执行与渲染，用事件循环、进程和内存知识解释真实问题。', link: '/概念与原理/12broswer/intro' },
      { title: 'Web 安全', icon: { emoji: '🛡️' }, description: '从常见攻击认识信任边界，逐步把输入处理、身份验证与数据保护落实到应用。', link: '/概念与原理/10safe/intro' },
      { title: '编程范式与设计模式', icon: { src: '/icons/skills/patterns.svg' }, description: '从对象与函数的组织方式，到职责划分和协作模式，在变化中寻找清晰的设计。', link: '/概念与原理/16patterns/intro' },
    ],
  },
  {
    id: 'performance', number: '05', title: '性能优化',
    description: '从感受“慢”，到解释“为什么慢”。沿前端、服务、数据与模型，用测量驱动改进。',
    focus: '性能是体验、吞吐、成本与复杂度之间的持续取舍。',
    stages: ['建立指标', '定位瓶颈', '验证收益'],
    topics: [
      { title: '前端性能', icon: { emoji: '🚀' }, description: '从加载、渲染到交互响应，结合用户体验指标定位瓶颈，并验证优化前后的差异。', link: '/性能优化/index#前端性能' },
      { title: '后端性能', icon: { emoji: '⚙️' }, description: '围绕延迟、吞吐与资源使用，学习压测、并发治理和服务瓶颈分析。实践持续补充。', link: '/性能优化/index#后端性能' },
      { title: '数据库性能', icon: { emoji: '🗄️' }, description: '从执行计划与查询负载切入，理解索引、锁和连接管理的收益与代价。实践持续补充。', link: '/性能优化/index#数据库性能' },
      { title: 'AI 应用性能', icon: { emoji: '⚡' }, description: '结合首字延迟、生成速度与答案质量，探索模型调用、检索和成本优化。实践持续补充。', link: '/性能优化/index#ai-应用性能' },
    ],
  },
]

export const learningSteps = [
  {
    number: '01', title: '知识笔记', verb: '理解',
    description: '从一个疑问出发，梳理概念、原理与适用边界，写下自己的理解，而不只收藏答案。',
    outcome: '留下概念地图与待验证的问题',
    link: '/概念与原理/index', linkLabel: '梳理知识',
  },
  {
    number: '02', title: '动手验证', verb: '实践',
    description: '把理解变成一个小功能，设计输入、边界与验证步骤，让代码和运行结果回答问题。',
    outcome: '留下可运行的代码与验证记录',
    link: '/编码与实践/index', linkLabel: '开始实践',
  },
  {
    number: '03', title: '问题复盘', verb: '追问',
    description: '回看失败、异常与方案取舍，追问为什么有效、何时失效，把偶然跑通变成可解释。',
    outcome: '留下失败案例与设计依据',
    link: '/学习自测/index', linkLabel: '检验理解',
  },
  {
    number: '04', title: '博客表达', verb: '分享',
    description: '把背景、过程与结论写给他人，在表达中发现理解的空白，也让实践成为可回看的作品。',
    outcome: '留下一篇有证据、有反思的文章',
    link: 'https://fridolph.github.io/fridolph-blog/', linkLabel: '阅读博客',
  },
  {
    number: '05', title: '再次改进', verb: '迭代',
    description: '带着反馈回到代码，修正假设、补上测试、比较改进效果，再开启下一轮学习。',
    outcome: '留下改进前后的对照与新问题',
    link: '/学习路线/index', linkLabel: '规划下一步',
  },
]
