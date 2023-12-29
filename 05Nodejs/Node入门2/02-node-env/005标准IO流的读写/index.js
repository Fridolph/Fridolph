// 通知stream准备开始读取数据
process.stdin.resume();
process.stdin.setEncoding('utf-8');

// 这个回调以块的形式处理数
process.stdin.on('data', function(text) {
  process.stdout.write(text.toUpperCase());
});

/**
 * 每次一个数据库从输入流读入时，它会被toUpperCase()转换，然后写入输出流。
 */