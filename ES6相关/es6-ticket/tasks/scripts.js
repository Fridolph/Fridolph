import gulp from 'gulp'
import gulpif from 'gulp-if'             // gulp语句中作if判断
import concat from 'gulp-concat'         // gulp中处理文件拼接
import webpack from 'webpack'            // webpack打包
import gulpWebpack from 'webpack-stream' // webpack流
import named from 'vinyl-named'          // 文件重命名
import livereload from 'gulp-livereload' // 热更新
import plumber from 'gulp-plumber'       // 处理文件信息流
import rename from 'gulp-rename'       // 文件重命名
import uglify from 'gulp-uglify'         // 用于文件压缩
import { log, colors } from 'gulp-util'  // 日志打印相关
import args from './util/args'           // 命令行参数解析

gulp.task('scripts', () => {
  return gulp.src(['app/js/index.js'])
    .pipe(plumber({
      errorHandle: function() {}
    }))
    .pipe(named())
    .pipe(gulpWebpack({
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel'
        }]
      }
    }), null, (err, stats) => {
      log(`Finished '${colors.syan('scripts')}'`, stats.toString({
        chunks: false
      }))
    })
    .pipe(gulp.dest('server/public/js')) // 编译完后在该路径新生成一份
    .pipe(rename({ // 然后将编译过的文件重命名
      basename: 'cp',
      extname: '.min.js'
    }))
    .pipe(uglify({ // 接着压缩
      compress: { properties: false },
      output: { 'quote_keys': true }
    }))
    .pipe(gulp.dest('server/public/js')) // 将压缩后的文件放到该路径下
    .pipe(gulpif(args.watch, livereload())) // 若js有改动则刷新
})