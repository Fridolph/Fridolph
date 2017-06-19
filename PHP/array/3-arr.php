<?php
header('content-type:text/html;charset=utf-8');
echo '<pre>';
//测试数组键名的
$arr=array(
  3=>'a',
  'username'=>'king',
  5.6=>'b',
  true=>'c',
  false=>'d',
  null=>'e'
);
var_dump($arr);
echo '<hr/>';
//如果下标重复，后面的覆盖前面的值
$arr=array(
  'a',
  0=>'b'
);
var_dump($arr);
echo '<hr/>';
//如果新添加元素没有指定下标，它的下标为已有下标最大值加1（已有下标不全为负数）
$arr=array(
'a','b','c',
  5=>'d',
  19=>'e',
  'f'
);
var_dump($arr);
echo '<hr/>';
//如果已有下标都为负数，那么新添加元素的下标从0开始
$arr=array(
  -12=>'a',
  -43=>'b',
  'c'
);
var_dump($arr);
//PHP5.4之后

$arr=['a','b','c'];
print_r($arr);
$arr=[
3=>'a',
5=>'b',
'username'=>'king'
];
print_r($arr);







echo '</pre>';
