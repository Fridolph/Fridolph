###存储的几种类型
1. Cache
2. 磁盘文件 
3. 数据库
4. 内存

###Cookies 特点
1. HTTP请求头上会带着（略显臃肿）
2. 至多4K（存放有限）
3. 主Domain污染 

###HTML5存储 —— 目标
1. 解决4K的大小问题
2. 解决请求头常带存储信息问题
3. 解决关系型存储的问题
4. 跨浏览器

###HTML5的几种存储方式
* 本地存储 localStorage && sessionStorage
* 离线缓存 application cache
* IndexDB && Web SQL

localStorage && sessionStorage

前者永久存储，永不失效，除非手动删除
后者重新打开页面或者浏览器就过期了

每个最多5M大小 IE8以上都支持了

localStorage API
 - getItem
 - setItem
 - removeItem
 - key 
 - clear 

存储类型：（能转化为字符串的都可以存储）
 * 数组 （需序列化成字符串）
 * json数据 （对象parse成字符串）
 * 图片
 * 脚本
 * 样式文件

使用限制：
1. 存储更新策略，过期控制
2. 子域名之间不能共享存储数据
3. 超出存储大小之后如何存储（LRU, FIFO）
4. server端如何取到

使用场景：
1. 利用本地数据，减少网络传输
2. 弱网络环境下，高延迟，低带宽，尽量把数据本地化

###H5离线缓存

适用场景：
1. 单地址页面
2. 对实时性要求不高
3. 离线webAPP
