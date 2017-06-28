<?php
header('content-type:text/html;charset=utf-8');

echo time(), '<br>';

echo '当前的日期时间是：', date('Y-m-d H:i:s', time()), '<br>'; // 24*60*60
echo '昨天的日期时间是：', date('Y-m-d H:i:s', time() - 86400), '<br>';