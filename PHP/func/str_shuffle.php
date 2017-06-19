<?php
header('content-type:text/html;charset=utf-8');

$str = 'abcdefg';

$str = str_shuffle($str);

echo $str, '<br>';

echo substr($str, 0, 4);