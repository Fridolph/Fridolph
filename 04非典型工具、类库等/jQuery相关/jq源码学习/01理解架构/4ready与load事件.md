## 一个是ready一个是load，这两个到底有什么区别呢？
ready与load谁先执行：
大家在面试的过程中，经常会被问到一个问题：ready与load那一个先执行，那一个后执行？
**答案是ready先执行，load后执行。**

DOM文档加载的步骤：
要想理解为什么ready先执行，load后执行就要先了解下DOM文档加载的步骤：

(1) 解析HTML结构。
(2) 加载外部脚本和样式表文件。
(3) 解析并执行脚本代码。
(4) 构造HTML DOM模型。       //ready
(5) 加载图片等外部文件。
(6) 页面加载完毕。           //load

**结论：**

ready与load的区别就在于资源文件的加载，ready构建了基本的DOM结构，所以对于代码来说应该越快加载越好


## 我们看看jQuery是如何处理文档加载时机的问题：

<script>
jQuery.ready.promise = function(obj) {
  if (!readyList) {
    readyList = jQuery.Deferred();
    
    if (document.readyState === 'complete') {
      // Handle it asynchronously to allow scripts the opportunity to delay ready
      setTimeout(jQuery.ready)
    } else {
      document.addEventListener('DOMContentLoaded', completed, false);
      window.addEventListener('load', completed, false);
    }
  }

  return readyList.promise(obj);
}
</script>

jQuery的ready是通过promise给包装过的，这也是jQuery擅长的手法，统一了回调体系，以后我们会重点谈到。
可见jQuery兼容的具体策略：针对高级的浏览器，我们当前很乐意用DOMContentLoaded事件了，省时省力。

