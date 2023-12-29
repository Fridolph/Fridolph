const path = require('path')
const createVueLoaderOpts = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const baseConfig = {
  mode: process.env.NODE_ENV ? 'development' : 'production',
  target: 'web',
  // entry: path.join(__dirname, '../src/client-entry.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    pfilename: '[name].bundle.[hash:8].js',
    publicPath: 'http://127.0.0.1:8080/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue']
  },
  module: {
    rules: [
      // 配置eslint
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre' // 预处理
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOpts(isDev)
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}

module.exports = baseConfig
