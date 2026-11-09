import { usePracticeItem, usePracticeIntro } from './usePath.js'

export default [
  {
    text: 'AI & 大模型',
    collapsed: true,
    link: usePracticeIntro('ai'),
    items: [
      // usePracticeItem('AI 相关手写', 'ai', 1, 'base'),
    ],
  },
  {
    text: 'NestJS',
    collapsed: true,
    link: usePracticeIntro('nestjs'),
    items: [
      usePracticeItem('从需求到接口的最小闭环', 'nestjs', 1, 'service_design'),
    ],
  },
  {
    text: '数据库 Database',
    collapsed: true,
    link: usePracticeIntro('database'),
    items: [
      { text: '数据库实践入口', link: usePracticeIntro('database') },
    ],
  },
  {
    text: 'Vue',
    collapsed: true,
    items: [usePracticeItem('Vue响应式原理', 'vue', 1, 'reactive')],
  },
  {
    text: 'VueUse',
    collapsed: true,
    link: usePracticeIntro('vueuse', 'vueuse.intro'),
    items: [
      usePracticeItem('State', 'vueuse', 1, 'state'),
      usePracticeItem('Browser', 'vueuse', 3, 'Browser'),
      usePracticeItem('Sensors', 'vueuse', 4, 'Sensors'),
      // usePracticeItem('Elements', 'vueuse', 2, 'Elements'),
      // usePracticeItem('Network', 'vueuse', 5, 'Network'),
      // usePracticeItem('Animation', 'vueuse', 6, 'Animation'),
      // usePracticeItem('Component', 'vueuse', 7, 'Component'),
      // usePracticeItem('Watch', 'vueuse', 8, 'Watch'),
      // usePracticeItem('Reactivity', 'vueuse', 9, 'Reactivity'),
      // usePracticeItem('Array', 'vueuse', 10, 'Array'),
      // usePracticeItem('Time', 'vueuse', 11, 'Time'),
      // usePracticeItem('Utilities', 'vueuse', 12, 'Utilities'),
      // usePracticeItem('@Electron', 'vueuse', 13, '@Electron'),
      // usePracticeItem('@Firebase', 'vueuse', 14, '@Firebase'),
      // usePracticeItem('@Head', 'vueuse', 15, '@Head'),
    ],
  },
  {
    text: 'HTML & CSS',
    collapsed: false,
    items: [
      usePracticeItem('常见布局一览', 'css', 1, '常见布局'),
      usePracticeItem('水平垂直居中', 'css', 2, '水平垂直居中'),
      usePracticeItem('sticky 粘黏布局', 'css', 3, 'sticky'),
      usePracticeItem('flex 布局之画骰子', 'css', 4, 'flex'),
      usePracticeItem('css 新特性之 grid', 'css', 5, 'grid'),
    ],
  },
  {
    text: 'JavaScript',
    collapsed: false,
    items: [
      usePracticeItem('写个 deepCopy 实现深拷贝', 'js', 2, 'deepcopy'),
      usePracticeItem('模板、字符串与 DOM 小工具', 'js', 3, 'small_utilities'),
    ],
  },
  {
    text: 'Promise',
    collapsed: false,
    items: [
      usePracticeItem('实现简易 Promise', 'promise', 1, 'promise'),
      usePracticeItem('设计个支持并发前端接口缓存', 'promise', 2, 'concurrent'),
    ],
  },
  {
    text: '源码分析',
    collapsed: false,
    items: [usePracticeItem('了解 Axios', 'axios', 1, 'axios')],
  },
  {
    text: '具体场景',
    collapsed: true,
    items: [
      usePracticeItem('JS API应用', 'slt', 1, 'js'),
      usePracticeItem('虚拟列表', 'slt', 2, 'virtualList'),
      usePracticeItem('大屏适配', 'slt', 3, 'largescreen'),
    ],
  },
  {
    text: '算法相关',
    collapsed: true,
    items: [
      usePracticeItem('栈 stack', 'algo', 1, 'stack'),
      usePracticeItem('队列 queue', 'algo', 2, 'queue'),
      usePracticeItem('链表 linked list', 'algo', 3, 'linkedlist'),
      usePracticeItem('二分查找与插入位置', 'algo', 4, 'search'),
      usePracticeItem('随机数组与均匀洗牌', 'algo', 5, 'random'),
      usePracticeItem('数组与字符串练习', 'algo', 6, 'arrays_strings'),
      usePracticeItem('阶乘与斐波那契', 'algo', 7, 'sequences'),
      usePracticeItem('1-冒泡排序', 'sort', 1, 'bubbleSort'),
      usePracticeItem('2-选择排序', 'sort', 2, 'selectionSort'),
      usePracticeItem('3-插入排序', 'sort', 3, 'insertionSort'),
      usePracticeItem('4-希尔排序', 'sort', 4, 'shellSort'),
      usePracticeItem('5-归并排序', 'sort', 5, 'mergeSort'),
      usePracticeItem('6-快速排序', 'sort', 6, 'quickSort'),
      usePracticeItem('7-堆排序', 'sort', 7, 'heapSort'),
      usePracticeItem('8-计数排序', 'sort', 8, 'countingSort'),
      usePracticeItem('9-桶排序', 'sort', 9, 'bucketSort'),
      usePracticeItem('10-基数排序', 'sort', 10, 'radixSort'),
    ],
  },
  {
    text: 'Radash',
    collapsed: true,
    link: usePracticeIntro('radash'),
    items: [
      usePracticeItem('Array', 'radash', 1, 'Array'),
      usePracticeItem('Random', 'radash', 6, 'Random'),
      usePracticeItem('String', 'radash', 7, 'String'),
      usePracticeItem('Typed', 'radash', 8, 'Typed'),
      usePracticeItem('Typed', 'radash', 9, 'Series'),
      // usePracticeItem('Async', 'radash', 2, 'Async'),
      // usePracticeItem('Curry', 'radash', 3, 'Curry'),
      // usePracticeItem('Number', 'radash', 4, 'Number'),
      // usePracticeItem('Object', 'radash', 5, 'Object'),
    ],
  },
  // {
  //   text: 'React',
  //   collapsed: true,
  //   items: [
  //     //
  //   ],
  // },
  // {
  //   text: 'HTTP',
  //   collapsed: true,
  //   items: [
  //   ],
  // },
  // {
  //   text: 'Node.js',
  //   collapsed: true,
  //   items: [
  //   ],
  // },
  // {
  //   text: '前端工程化',
  //   collapsed: true,
  //   items: [
  //   ],
  // },
  // {
  //   text: '性能优化',
  //   collapsed: true,
  //   items: [
  //   ],
  // },
  // {
  //   text: '前端安全',
  //   collapsed: true,
  //   items: [
  //   ],
  // },
]
