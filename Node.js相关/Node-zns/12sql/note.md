Server端：
数据存在

Client端：
管理工具、Node

~~~

数据基本概念：

两种单位

1. 库  类似文件夹  用来管理， 本身无法存数据

2. 表  文件——存储数据

表-Excel

行 ~~ 代表一条数据  
列 ~~ （字段、域） 一项数据

用户名
密码

主键： 唯一标识符   性能高

------------------------------

Node.js默认不支持MySql

npm 安装的是 客户端

---

1. 连接到服务器

2. 查询 （发送请求）

---------------------------------

SQL标准写法：

1. 关键字大写
2. 库、表、字段需要加上``


4大查询语句 —— 

增 —— INSERT

INSERT INTO 表 (字段列表) VALUES(值列表)

INSERT INTO `user_table` (`username`, `password`) VALUES (0, 'fri', 'ffffff')

-------------------------------

删 —— DELETE

DELETE FROM 表 WHERE 条件

-------------------------------

改 —— UPDATE

UPDATE 表 SET 字段=值 WHERE 条件
UPDATE article_table SET n_like=n_like+1 WHERE ID=xxx

-------------------------------

查 —— SELECT 


SELECT 什么 FROM 表

SELECT * FROM `user_table` WHERE 条件

--------------------------------

# 子句：
## WHERE 条件

WHERE name='xxx'
WHERE age > 18
WHERE age < 12 AND bodyHeigh < 150
WHERE cash > 100 OR score > 10000

## ORDER 排序

ORDER BY age ASC/DESC 
  ASC-升序
  DESC-降序

ORDER BY price ASC     

* 价格(price)升序排序，如果价格相同，再按销量(sales)排序
ORDER BY price ASC, sales DESC

---------------------------------

## GROUP 聚类 - 合并相同

> 多配合函数来用，效果极佳 COUNT、MIN、MAX、AVG


* 统计每个班的人数
使用COUNT
----

SELECT * FROM student_table;  
将得到原始数据：

id  class  name  score
1     1    一姐    44
2     1    一哥    55
3     1    一休    66
4     2    二家    77
5     2    二哥    88
6     2    二逼    99
7     3    三八    66
8     3    三治    77
9     3    三掌    88

SELECT * FROM student_table GROUP BY class;

id  class  name  score
1    1     一姐    44
4    2     二家    77
7    3     三八    66

SELECT class FROM student_table GROUP BY class;

class
1
2
3

SELECT class, COUNT(class) FROM student_table GROUP BY class;

class  COUNT(class)
1      3
2      3
3      3

* 求统计每个班的平均分
// SELECT * FROM student_table GROUP BY class;
SELECT class, AVG(score) FROM student_table GROUP BY class;

class  AVG(score)
  1        55
  2        88
  3        77

* 求每个班级的最高和最低分:

SELECT class, MAX(score), MIN(score) FROM student_table GROUP BY class;

class  MAX  MIN
 1     66    44
 2     99    77
 3     88    66


* 每个人消费的总额

SELECT name, SUM(price) FROM sales_table GROUP BY name;
默认无排序，按查到的先后顺序来

SELECT name, SUM(price) FROM sales_table GROUP BY name ORDER BY SUM(price) DESC
土豪榜，降序排列

SELECT name, SUM(price) FROM sales_table GROUP BY name ORDER BY SUM(price) ASC
屌丝榜，升序排列

## LIMIT 子句：

限制输出

1. 所有数据给前端
2. 后台只给部分数据

LIMIT 10;    拿前10条
LIMIT 5, 8;  从第5条开始，要8条数据

分页： -> 每页20条

第1页： 0, 20         0~19
第2页： 20, 20        20~39
第3页： 40, 20        40~59
第n页： (n-1)*20, 20   n~ n+20

-------

子句之间是有顺序的：

WHERE  GROUP  ORDER  LIMIT  必须按此顺序来
筛选   合并   排序   限制

* 按照降序排列及格人数

SELECT class, COUNT(class) FROM student_table 
  WHERE score>60 
  GROUP BY class 
  ORDER BY COUNT(class) DESC 
  LIMIT 2