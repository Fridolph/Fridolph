<?php
//其它类型转换成数组
//临时转换
$var=123;
$var=12.3;
$var=false;
$var='king';
$var=null;//null转化成空数组
$res=(array)$var;
var_dump($res);
echo '<hr/>';
//永久转换，settype($var,$type)
$var=123;
settype($var,'array');
var_dump($var);
