<?php
header('content-type:text/html;charset=utf-8');

$str1 = 'abcdefg';

$str2 = 'c';

echo strstr($str1, $str2), '<br>';

$filename = 'a.bc.cd.png';

$num = strrpos($filename, '.');

echo $num, '<br>';
// echo strrchr($filename, '.');
echo substr($filename, $num + 1), '<br>';

$str2 = strrev($filename);

echo $str2;