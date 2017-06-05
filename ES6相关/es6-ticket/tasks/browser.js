import gulp from 'gulp'
import gulpif from 'gulp-if'
import gutil from 'gulp-util'
import args from './util/args'

gulp.task('browser', callback => {
  if (!args.watch) return callback()

  // watch第一个参数为指定要监听的目录，第二个参数为要执行的任务
  gulp.watch('app/**/*.js', ['scripts'])

  gulp.watch('app/**/*.ejs', ['pages'])

  gulp.watch('app/**/*.css', ['css'])

})