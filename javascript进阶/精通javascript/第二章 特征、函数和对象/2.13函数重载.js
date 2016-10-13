function sendMessage(msg, obj) {

  // 如果提供了消息和对象
  if (arguments.length === 2) {

    // 将消息发送到该对象(假设对象有一个log属性)
    obj.log(msg);
  } else {

    // 否则认为只提供要发送的消息，因此显示默认的错误消息
    console.log(msg);
  }
}

// 两种调用形式
sendMessage('Hello World!');
sendMessage('How are you ?', console);