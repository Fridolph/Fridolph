<?php

header('content-type: text/html;charset=utf-8');

$str1 = 'html';
$str2 = 'PHP';
$str3 = 'sharry, i am hugry. let me git it.';

// 转换为大写
echo strtoupper($str1), '<br>';
// 转换为小写
echo strtolower($str2), '<br>';

// 将句子首字母转换为大写
echo ucfirst($str3), '<br>';
// 将每个单词的首字母转换为大写字母
echo ucwords($str3), '<br>';