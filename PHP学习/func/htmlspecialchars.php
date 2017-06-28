<?php
header('content-type: text/html; charset=utf-8');

$str = "A>B,B<C,Tom&John, He said: \"I'm OK\"";

// echo $str, '<br>';
// echo htmlspecialchars($str, ENT_QUOTES);
echo htmlspecialchars($str, ENT_NOQUOTES);
