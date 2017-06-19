<?php
header('content-type:text/html;charset=utf-8');
echo '<pre>';
//通过array()创建多维数组
$arr=array(
  'a'
);
print_r($arr);
//二维索引+索引
$arr=array(
  array('a','b','c'),
  array('d','e','f')
);
print_r($arr);
/*
Array
(
    [0] => Array
        (
            [0] => a
            [1] => b
            [2] => c
        )

    [1] => Array
        (
            [0] => d
            [1] => e
            [2] => f
        )

)
*/
//二维索引+关联
$arr=array(
  array(
    'id'=>1,
    'username'=>'king'
  ),
  array(
    'id'=>2,
    'username'=>'queen'
  )
);
print_r($arr);
//二维关联+索引
$arr=array(
  'users'=>array('king','queen','张三'),
  'ages'=>array(12,34,56)
);
print_r($arr);
//二维关联+关联
$arr=array(
  'usersInfo'=>array(
    'id'=>1,
    'username'=>'king'
  ),
  'courseInfo'=>array(
    'cid'=>1,
    'courseName'=>'PHP'
  )
);
print_r($arr);
//二维中最重要的形式是二维索引+关联的形式(数据库中查询出的记录就是这种形式)
//二维的关联+关联

$arr=array(
  array(
    array('a')
  )
);
print_r($arr);

echo '<hr/>';

$arr=['a','b','c'];
print_r($arr);
$arr=[
  ['id'=>1,'username'=>'king1','age'=>12],
  ['id'=>2,'username'=>'king2','age'=>22],
  ['id'=>3,'username'=>'king3','age'=>32],
  ['id'=>4,'username'=>'king4','age'=>42]
];
print_r($arr);
echo '<hr/>';
$arr=[
  'courses'=>['courseName'=>'php','courseDesc'=>'PHP 是最好的语言'],
  'test'=>['a'=>'aa','b'=>'bb']
];
print_r($arr);



























echo '</pre>';
