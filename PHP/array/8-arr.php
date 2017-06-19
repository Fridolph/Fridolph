<?php
//定义常量数组
//const在5.6之后可以定义常量
const ARR1=array('a','b','c');
print_r(ARR1);
const ARR2=[
  'a'=>'aa',
  'b'=>'bb'
];
print_r(ARR2);
echo '<hr/>';
//通过define()定义常量数组
define('TEST1',array('a','b','c'));
print_r(TEST1);
define('TEST2',['d','e','f']);
print_r(TEST2);

define('CUSTOM_UPLOAD_ERRORS',[
  'ext_error'=>'上传文件扩展名不符合规范',
  'maxsize_error'=>'上传文件大小不符合规范'
]);
print_r(CUSTOM_UPLOAD_ERRORS);
echo '<hr/>';
echo CUSTOM_UPLOAD_ERRORS['ext_error'];
