<?php
header('content-type:text/html;charset=utf-8');

$num = 5;

$str = 'shanghai';

$txt = sprintf('there are %u million cars in %s', $num, $str);

echo $txt;

// 格式化字符串

// $$ 返回一个百分号
// $b 二进制数
// $d 包含正负号的十进制数
// $e 使用小写的科学计数法
// $s 字符串
// $f 浮点数

echo '<br><br>';

$number = 123;

$txt = sprintf("带有两位小数的结果是: %1\$.2f<br>不带小数的是: %1\$d", $number);

echo $txt;