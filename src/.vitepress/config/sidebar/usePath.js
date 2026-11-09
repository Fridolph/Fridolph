const CONCEPT = '概念与原理'
const SELF_TEST = '学习自测'
const PRACTICE = '编码与实践'
// const CONTRIBUTION = '参与贡献'

const typeMap = {
  other: '00other',
  axios: '00other',
  html: '01htmlcss',
  css: '01htmlcss',
  js: '02js',
  javascript: '02js',
  es6: '02js',
  esnext: '02js',
  promise: '02js',
  sort: '03algo',
  algo: '03algo',
  http: '04http',
  request: '04http',
  node: '05node',
  nodejs: '05node',
  opt: '06opt',
  performance: '06opt',
  optimization: '06opt',
  vue: '07vue',
  vuex: '07vue',
  vueuse: '07vue',
  react: '08react',
  redux: '08react',
  mobx: '08react',
  webpack: '09build',
  vite: '09build',
  build: '09build',
  safe: '10safe',
  ts: '11ts',
  typescript: '11ts',
  bw: '12broswer',
  browser: '12broswer',
  solution: '13solution',
  slt: '13solution',
  solve: '13solution',
  mobile: '14app',
  app: '14app',
  uni: '14app',
  radash: '15radash',
  pn: '16patterns',
  patterns: '16patterns',
  ai: '17ai',
  nestjs: '18nestjs',
  database: '19database',
  deploy: '20deploy',
}

export function useConceptIntro(type) {
  return `/概念与原理/${typeMap[type]}/intro`
}

export function useSelfTestIntro(type) {
  return `/学习自测/${typeMap[type]}/intro`
}

export function usePracticeIntro(type, intro = 'intro') {
  return `/编码与实践/${typeMap[type]}/${intro}`
}

export function useConceptItem(title, type, index = 0, fileName, options = {}) {
  return {
    text: title,
    link: `/${CONCEPT}/${typeMap[type]}/s_${type}_${index}-${fileName}`,
    ...options,
  }
}

export function useSelfTestItem(title, type, index = 0, fileName, options = {}) {
  return {
    text: title,
    link: `/${SELF_TEST}/${typeMap[type]}/q_${type}_${index}-${fileName}`,
    ...options,
  }
}

export function usePracticeItem(title, type, index = 0, fileName, options = {}) {
  return {
    text: title,
    link: `/${PRACTICE}/${typeMap[type]}/c_${type}_${index}-${fileName}/c_${type}_${index}-${fileName}`,
    ...options,
  }
}
