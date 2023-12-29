/**
 * fs模块还提供了一些机制来监控文件 fs.watch fs.watchFile 
 * 这在想知道一个文件是否发生改变时很有用， fs.watch通过底层操作系统来通知文件改变，非常高效。
 * 但fs.watch会比较难用，或者不能用在网络磁盘行，在这情况下，可使用相对低效的 fs.watchFile
 */

