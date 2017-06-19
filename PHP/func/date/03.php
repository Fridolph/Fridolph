<?php
header('content-type:text/html;charset=utf-8');

echo '三个星期之前的时间戳是', strtotime('-3 weeks'), '<br>';

echo (time() - strtotime('-3 weeks')) / 86400, '<br><br>';

// 获取上个月的日期
echo '上个月的今天', date('Y-m-d H:i:s', strtotime('-1 month')), '<br>';
echo '上个月的最后一天', date('Y-m-d H:i:s', strtotime('last day of -1 month')), '<br>';
echo '今天午夜', date('Y-m-d H:i:s', strtotime('today')), '<br>';
echo '今天午夜', date('Y-m-d H:i:s', strtotime('midnight')), '<br>';
echo '今天中午', date('Y-m-d H:i:s', strtotime('noon')), '<br>';
echo '明天午夜', date('Y-m-d H:i:s', strtotime('tomorrow')), '<br>';