十大经典排序算法的JavaScript描述
转自[http://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651551303&idx=1&sn=874d11abf8eef9ae9365e55804bfe56f&chksm=8025a186b75228907634cd48e85c962f28662731bbd7a5c30df334f6128a707aac0369cdc477&scene=0#wechat_redirect]

虽然作者在github上已提交了代码~ 我这里只是想试着理解和练习一下，所以又跟着来了一遍~

* 这世界上总存在着那么一些看似相似但有完全不同的东西，比如雷锋和雷峰塔，小平和小平头，玛丽和马里奥，Java和javascript….当年javascript为了抱Java大腿恬不知耻的让自己变成了Java的干儿子，哦，不是应该是跪舔，毕竟都跟了Java的姓了。可如今，javascript来了个咸鱼翻身，几乎要统治web领域，Nodejs，React Native的出现使得javascript在后端和移动端都开始占有了一席之地。可以这么说,在Web的江湖，
JavaScript可谓风头无两，已经坐上了头把交椅。
* 在传统的计算机算法和数据结构领域，大多数专业教材和书籍的默认语言都是Java或者C/C+ +，O’REILLY家倒是出了一本叫做《数据结构与算法javascript描述》的书，但不得不说，不知道是作者吃了shit还是译者根本就没校对，满书的小错误，这就像那种无穷无尽的小bug一样,简直就是让人有种嘴里塞满了shit的感觉，吐也不是咽下去也不是。对于一个前端来说，尤其是笔试面试的时候，算法方面考的其实不难（
十大排序算法或是和十大排序算法同等难度的
），但就是之前没用javascript实现过或是没仔细看过相关算法的原理，导致写起来浪费很多时间。所以撸一撸袖子决定自己查资料自己总结一篇博客等用到了直接看自己的博客就OK了，正所谓靠天靠地靠大牛不如靠自己(ˉ(∞)ˉ)。
* 算法的由来：9世纪波斯数学家提出的：“al-Khowarizmi”就是下图这货（感觉重要数学元素提出者貌似都戴了顶白帽子），开个玩笑，阿拉伯人对于数学史的贡献还是值得人敬佩的。

正文

排序算法说明

（1）排序的定义：对一序列对象根据某个关键字进行排序；

输入：n个数：a1,a2,a3,…,an
输出：n个数的排列:a1’,a2’,a3’,…,an’，使得a1’

再讲的形象点就是排排坐，调座位，高的站在后面，矮的站在前面咯。

（3）对于评述算法优劣术语的说明

稳定：如果a原本在b前面，而a=b，排序之后a仍然在b的前面；
不稳定：如果a原本在b的前面，而a=b，排序之后a可能会出现在b的后面；

内排序：所有排序操作都在内存中完成；
外排序：由于数据太大，因此把数据放在磁盘中，而排序通过磁盘和内存的数据传输才能进行；

时间复杂度: 一个算法执行所耗费的时间。
空间复杂度: 运行完一个程序所需内存的大小。

关于时间空间复杂度的更多了解请戳这里（http://blog.csdn.net/booirror/article/details/7707551/），或是看书程杰大大编写的《大话数据结构》还是很赞的，通俗易懂。

（4）排序算法图片总结(图片来源于网络):

排序对比：

!(排序对比)[http://mmbiz.qpic.cn/mmbiz_png/zPh0erYjkib23hOz9GIeCrlWUE7VtjmiaibMeCl9zTc3EktpskH1akdmAVpamQcZAiaCJZoWwxl0bWqyJYC5yeXQRw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1]


图片名词解释：
n: 数据规模
k:“桶”的个数
In-place: 占用常数内存，不占用额外内存
Out-place: 占用额外内存

排序分类：

!(排序分类)[http://mmbiz.qpic.cn/mmbiz_jpg/zPh0erYjkib23hOz9GIeCrlWUE7Vtjmiaibiag6GPN7oBTzevsMtgryzkXgXut4DECeRwHjtxxcSTfKg2sFGib0SlCA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1]