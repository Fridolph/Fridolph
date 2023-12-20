const path = require('path')

module.exports = {
  /* entry表示入口，webpack执行构建的第一步将从entry开始，
  可抽象成输入，类型可以是String, Object, Array */
  // 一个入口写法，一个入口文件
  entry: './src/index.js',
  // 只有一个入口，但入口有两个文件，用数组
  // entry: ['./src/entry1.js', './src/entry2.js'],
  // 多入口写法
  // entry: {
  //   a: './src/entry-a',
  //   b: ['./src/entry-b1', './src/entry-b2']
  // },
  /* 输出文件存放的目录，必须是string类型的绝对路径  */
  output: {
    /* 输出文件存放目录 */
    path: path.resolve(__dirname, './dist'),
    
    /* 输出文件名称 */
    // 完整的名称
    filename: 'bundle.js', 
    /* 在配置了多个entry时，通过名称模板为不同的entry生成不同的文件名称 */
    // filename: '[name].js', 
    /* 根据文件内容的hash值生成文件的名称，用于浏览器长时间缓存文件 */
    // filename: '[chunkhash].js',
    
    /* 发布到线上的所有资源的url前缀，为string类型 */
    // 放倒指定目录下
    publicPath: '/assets/',
    // publicPath: '' 放到根目录上
    // publicPath: 'http://cdn.example.com' 放到cdn上
    
    /* 导出库名称，不填时，默认输出格式是匿名的立即执行函数 */
    // library: 'MyLibrary', 可以是umd umd2 commonjs amd this var window jsonp等
    // libraryTarget: 'common.js'

    /* 是否包含有用的文件路径信息到生成的代码里，为boolean类型 */
    pathinfo: true,

    /* 附加Chunk的文件名称 */
    chunkfileName: '[id].js',
    // chunkfileName: '[chunkhash].js',

    /* josnp异步加载资源时回调函数的名称，需要和服务端配合使用 */
    // jsonpFunction: 'myWebpackJsonp',

    /* 生成source map 文件的名称 */
    sourceMapFilename: '[file].map',

    /* 浏览器开发工具里显示的源码模块名称 */
    // devtoolModuleFilenameTemplate: 'webpack:///[resource-path]',

    /* 异步加载跨域资源时使用的方式 */
    // crossOriginLoading: 'use-credentials',
    // crossOriginLoading: 'anonymous',
    // crossOriginLoading: 'false',
  },
  /* 模块配置相关 */
  module: {
    rules: [
      /* 配置loaders */
      {
        test: /\.css$/, // 正则匹配命中时要使用loader的文件
        include: [// 只会命中这里面的文件
          path.resolve(__dirname, 'src')
        ],
        exclude: [// 忽略这里面的文件
          path.resolve(__dirname, 'node_modules')
        ],
        use: [// 使用哪些loaer，有先后次序，从后向前执行
          'style-loader', //直接使用loader的名称
          {
            loader: 'css-loader',
            options: {
              // 向html-loader传一些参数
            }
          }
        ]
      }
    ],
    /* 不用解析和处理的模块 用正则匹配 */
    noParse: [
      /special-library.js$/
    ]
  },
  /* 配置插件 */
  plugins: [],

  /* 配置寻找模块的规则 */
  resolve: {
    // 寻找模块的根目录，为array类型，默认以node_modules为根目录
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    // 模块后缀名
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
    // 模块别名配置，用于映射模块
    alias: {
      // 将module映射为new-module，同样module/path/file也会被映射为 new-module/path/file
      'module': 'new-module',
      // 用$后，讲only-module映射成new-module，但only-module/paht/file不会进行映射
      'only-module$': 'new-module'
    }
  },
  /* 输出文件的性能检查配置 */
  performance: {
    hints: 'warning', // 有性能时输出警告
    // error 输出错误， false 关闭性能检查
    maxAssetSize: 200000, //最大文件的大小，单位为bytes
    maxEntrypointSize: 400000, // 最大入口文件的大小
    // 过滤要检查的文件
    // assetFilter: function(assetFilename) {
    //   return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
    // }
  },
  /* 配置soruce-map类型 */
  devtools: 'source-map',
  /* webpack使用的根目录  */
  // context: __dirname,
  /* 使用来自js运行环境提供的全局变量 */
  externals: {
    jquery: 'jQuery'
  },
  /* 控制台输出日志 */
  stats: {
    assets: true,
    colors: true,
    errors: true,
    errordetails: true,
    hash: true
  },
  /* dev-server相关的配置 */
  devServer: {
    // 代理到后端服务接口
    proxy: {
      '/api': 'http://localhost:3001'
    },
    // 配置dev-server http服务器的文件根目录
    contentBase: path.join(__dirname, 'public'),
    compress: true, //是否开启gzip
    historyApiFallback: true, //是否开发h5 history api网页
    hot: true, // 是否开启热替换
    https: false, // 是否开启https
    profile: true, // 是否捕捉webpack构建的性能信息，用于分析性能
    cache: false, // 是否开启缓存来提升构建速度
    watch: true, //是否监听，监听后才有下面的配置
    watchOptions: {
      // 不监听的文件或文件夹，支持正则匹配，默认为空
      ignored: /node_modules/,
      // 监听到文件改变后，延迟执行，截流，防止更新太快导致一直编译
      aggregateTimeout: 1000,
      // 不停地询问系统指定文件有没有发生变化，默认每秒询问1000次
      poll: 1000
    }
  }
}