<?php
echo '<pre>';
//快速创建数组
//快速创建下标连续的索引数组
$arr=range(1,10);
print_r($arr);
$arr=range(-10,5);
print_r($arr);
//手动指定步长的数组
$arr=range(1,10,2);
print_r($arr);
echo '<hr/>';
$arr=range('a','z');//97~122
print_r($arr);
echo '<hr/>';
for($i=97;$i<=122;$i++){
  $arr1[]=chr($i);
}
print_r($arr1);
echo '<hr/>';
//快速创建关联数组
$username='king';
$age=12;
$email='382771946@qq.com';
$userInfo1=array(
  'username'=>$username,
  'age'=>$age,
  'email'=>$email
);
print_r($userInfo1);

$userInfo2['username']=$username;
$userInfo2['age']=$age;
$userInfo2['email']=$email;
print_r($userInfo2);
//注意，通过compact创建数组的时候，只能写已经存在的变量的名称，不需要加$
$a=12;
$b=false;
$c=null;
$userInfo3=compact('username','age','email','a','b','c');
print_r($userInfo3);
