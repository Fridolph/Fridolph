import { groupSidebar } from './groupSidebar.js'
import straight from './概念与原理.js'
import question from './学习自测.js'
import coding from './编码与实践.js'
import contribution from './参与贡献.js'
import interview from './网友面经.js'

export default {
  '/概念与原理/': groupSidebar(straight),
  '/学习自测/': groupSidebar(question),
  '/编码与实践/': groupSidebar(coding),
  '/网友面经/': interview,
  '/学习路线/': [{ text: '学习路线', items: [{ text: '从知识到实践', link: '/学习路线/index' }, { text: '实践记录模板', link: '/学习路线/实践记录模板' }] }],
  '/性能优化/': [{ text: '性能优化', items: [{ text: '性能优化专题', link: '/性能优化/index' }, { text: '前端性能笔记', link: '/概念与原理/06opt/intro' }] }],
  '/学习资源/': [{ text: '学习资源', items: [{ text: '资源与交流', link: '/学习资源/index' }, { text: '笔记迁移记录', link: '/学习资源/笔记迁移记录' }] }],
  '/相关准备/': [
    {
      text: '如何利用该版块',
      items: [
        { text: '祝大家新年快乐', link: '/相关准备/三月后再删' },
        { text: '推荐工具', link: '/相关准备/index' },
        { text: '如何写好简历', link: '/相关准备/如何写好简历' },
      ],
    },
  ],
  '/参与贡献/': contribution,
}