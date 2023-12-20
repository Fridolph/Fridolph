> React和Vue的区别

它们都是现代前端框架

- 数据是否可变
  - React整体是函数式思想，把组件设计为纯组件，状态和逻辑通过参数传入，在React中，是单向数据流，易记录状态变化，易追朔数据源
  - Vue是响应式思想，基于数据可变，对每个属性进行依赖收集，通过watcher来监听
- 更新
  - React setState 进入重新渲染流程，可用shouldComponentUpdate钩子控制是否更新
  - Vue 当响应式属性变化时，有watcher派发nofity，触发patch进行前后virtual dom对比然后更新dom
- 编码和操作
  - React 是all in js，jsx. 类的声明方式，易与ts搭配
  - Vue vue-template单文件，自己的模版语法
