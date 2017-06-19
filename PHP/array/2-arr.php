<?php
//通过array()
//空数组
$arr=array();
//检测是否是数组
var_dump($arr);
//gettype():得到变量的类型
echo gettype($arr);
//通过is_array():检测变量是否为数组
var_dump(is_array($arr));
echo '<hr/>';
//通过array()下标连续的索引数组
$arr=array(2,3.4,'king',true);
print_r($arr);
/*
Array
(
    [0] => 2
    [1] => 3.4
    [2] => king
    [3] => 1
)
*/
//手动指定下标
$arr=array(
  3=>'a',
  5=>'b',
  '6'=>'c'
);
print_r($arr);
/*
Array
(
    [3] => a
    [5] => b
    [6] => c
)
*/
//定义关联数组
$userInfo=array(
  'username'=>'king',
  'age'=>12,
  'email'=>'382771946@qq.com',
  'salary'=>600000
);
print_r($userInfo);
/*
Array
(
    [username] => king
    [age] => 12
    [email] => 382771946@qq.com
    [salary] => 600000
)
*/
//定义混合数组
$arr=array(
 'a','b','c',
 'username'=>'imooc',
 'desc'=>'最好的在线教育平台',
 5=>'d',
 -12=>'e'
);
print_r($arr);
/*
Array
(
    [0] => a
    [1] => b
    [2] => c
    [username] => imooc
    [desc] => 最好的在线教育平台
    [5] => d
    [-12] => e
)
*/
