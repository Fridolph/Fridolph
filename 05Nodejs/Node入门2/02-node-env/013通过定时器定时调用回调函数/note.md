> Node还可以像调用setTimeout那样通过setInterval在固定时间间隔内执行一个回调函数

问题：
想在一个固定时间间隔运行回调

解决方案：
通过setTimeout并且使用clearInterval来终止定时器


setInterval方法返回一个指向计时器的引用，它可以通过调用clearInterval来终止计时器。


