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

*价格(price)升序排序，如果价格相同，再按销量(sales)排序
ORDER BY price ASC, sales DESC

---------------------------------

## GROUP 聚类 - 合并相同

> 多配合函数来用，效果极佳 COUNT、MIN、MAX、AVG

*统计每个班的人数
COUNT

----

SELECT * FROM student_table;  
将得到原始数据：

id  class  name
1     1    一姐
2     1    一哥
3     1    一休
4     2    二家
5     2    二哥
6     2    二逼
7     3    三八
8     3    三治
9     3    三掌

SELECT * FROM student_table GROUP BY class;

id  class  name
1    1     一姐
4    2     二家
7    3     三八

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