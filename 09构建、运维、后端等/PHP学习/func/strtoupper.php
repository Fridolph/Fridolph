<?php
header('content-type:text/html;charset=utf-8');

$str = 'user_ID_hello_World';

// 1. 转换小写
$str1 = strtolower($str);

echo $str1, '<br>';

// 2. 将下划线替换成空格
$str2 = str_replace('_', ' ', $str1);
echo $str2, '<br>';

// 3. 通过ucword进行首字母大写操作
$str3 = ucwords($str2);
echo $str3, '<br>';

// 4. 将空格转换为字符串
$str4 = str_replace(' ', '_', $str3);

echo $str4, '<br>';