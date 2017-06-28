<?php
header('content-type:text/html;charset=utf-8');

$str = '你|好|吗';

$arr = explode('|', $str);

print_r($arr);

$arr2 = array('Tom', 'John', 'Beil');

$arr2 = implode($arr2, '-');

echo '<br>';

print_r($arr2);

