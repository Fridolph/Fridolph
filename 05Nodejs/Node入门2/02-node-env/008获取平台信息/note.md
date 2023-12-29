> Node 有一些内置的方法来查询操作系统

问题：
需要基于操作系统或者处理器构架运行特定于平台的代码

解决方案：
使用process.arch与process.platform属性



另外一些来自系统的信息可以通过process模块搜集。
其中一个方法是process.memoryUsage(), 它返回一个有3个属性的对象来描述当前进程的内存使用情况。

rss——常驻内存大小，是指他在RAM中维持的进程内存的那一部分
heapTotal——动态分配的可用内存
heapUsed——已经使用的堆栈大小

