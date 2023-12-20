<?php

header('content-type: text/html;charset=utf-8');

// str_replace 字符串替换 区分大小写
$str = 'javascript';
echo str_replace('java', 'ecma', $str), '<br>';

echo str_ireplace('JAVA','ECMA', $str);