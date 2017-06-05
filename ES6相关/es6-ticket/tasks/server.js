import gulp from 'gulp'
import gulpif from 'gulp-if'
import liveserver from 'gulp-live-server'
import args from './util/args'

gulp.task('serve', callback => {
  
  if (!args.watch) return callback()

  var server = liveserver.new(['--harmony', 'server/bin/www']) // 在当前命令行下执行以下脚本

  server.start() // 启动服务器

  // 监听静态文件变化实时刷新
  gulp.watch(['server/public/**/*.js', 'server/views/**/*.ejs', 'server/public/**/*.css'], file => {
    server.notify.apply(server, [file])
  })

  // 监听服务
  gulp.watch(['server/routes/**/*.js', 'server/app.js'], function() {
    server.start.bind(server)()
  })
})