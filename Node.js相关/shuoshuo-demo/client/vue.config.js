module.exports = {
  // 基本路径
  baseUrl: undefined,

  // 输出文件目录
  outputDir: 'dist',
  assetsDir: undefined,
  parallel: undefined,

  // eslint-loader 是否在保存的时候检查
  lintOnSave: undefined,

  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  runtimeCompiler: true,

  // webpack配置  https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // chainWebpack: config => {},

  // vue-loader 配置项  https://vue-loader.vuejs.org/en/options.html
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: undefined,

  // css相关配置
  css: {
    extract: true,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores parallel: require('os').cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // pwa: {},

  // 第三方插件配置
  // pluginOptions: {}

  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 4000,
    https: false,
    hot: true,
    proxy: null,
    disableHostCheck: true,
    // 设置代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4002',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
    // before: app => {}
  }
}
