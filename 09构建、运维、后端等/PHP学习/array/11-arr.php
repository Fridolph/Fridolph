<?php
//数组运算符相关
//+ 合并数组
$arr1=['a','b','c'];
$arr2=['d','e','f'];
$newArr=$arr1+$arr2;
print_r($newArr);
//如果数组键名相同，只会使用左边数组元素的值
$arr1=[
  'a','b','c'
];
$arr2=[
  10=>'c',
  11=>'d',
  12=>'e'
];
$arr3=[
  'username'=>'king',
  'age'=>12
];
$arr4=[
  'username'=>'queen',
  'age'=>23,
  'email'=>'382771946@qq.com'
];
$newArr=$arr1+$arr2+$arr3+$arr4;
print_r($newArr);
echo '<hr/>';
//== 比较数组的键名和键值是否相同，如果相同返回true，否则返回false
//=== 既要比较键名和键值是否相同，而且顺序也要相同
$a=[
  3=>'a',
  '5'=>true
];
$b=[
  5=>1,
  '3'=>'a'
];
$c=[
  '3'=>'a',
  '5'=>1
];
var_dump($a==$b,$a===$b,$a==$c,$a===$c);
$arr = array('a','b','c');
foreach ($arr as $key=> $value) {
   $arr[] = 'd';
   print_r($arr);
   var_dump($key,$value);
}
