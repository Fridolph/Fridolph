> 无论需要从一个应用中读取数据，还是写入数据，通过process对象来读写IO流都是一个有用的技巧


问题： 
希望从一个Node程序导出或导入数据

解决方案：
使用process.stdout 与 process.stdin

讨论： 
process.stdout对象是一个可写的stream，它是process的一部分，所有的Node程序都可以使用它，并且在显示与接受输入时非常有用。