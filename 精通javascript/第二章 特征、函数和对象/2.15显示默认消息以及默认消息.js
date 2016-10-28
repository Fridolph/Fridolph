function displayError(msg) {

  // 检查并确定msg已经定义
  if (typeof msg === 'undefined') {
    msg = 'An error occurred.';
  }

  console.log(msg);
}

displayError('我爱哈戳戳');

/**
 * typeof语句把我们带到了类型检查的话题，javascript是一门动态类型的语言, 因此这是一个非常有用且重要的话题~ 
 *
 */