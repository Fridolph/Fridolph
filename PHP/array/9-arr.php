<?php
header('content-type:text/html;charset=utf-8');
echo '<pre>';
//数组使用--查找元素
$arr=['a','b','c','d'];
print_r($arr);
echo $arr[2];
echo '<br/>';
$res=$arr[0];
echo $res;
echo '<br/>';
$arr=[
  'username'=>'king',
  'age'=>12,
  'email'=>'382771946@qq.com'
];
echo '用户名为：',$arr['username'],'<br/>';
echo '年龄：',$arr['age'],'<br/>';
echo '邮箱：',$arr['email'],'<br/>';
//二维的索引+关联
echo '<hr/>';
$users[]=['id'=>1,'username'=>'king1','age'=>21];
$users[]=['id'=>2,'username'=>'king2','age'=>51];
$users[]=['id'=>3,'username'=>'king3','age'=>11];
print_r($users);
echo $users[1]['username'];
echo '<hr/>';
echo $users[2]['age'];
echo '<br/>';
echo $users{2}{'age'};
echo '<hr/>';
//向数组中添加元素
$arr=['a','b','c'];
$arr[]='d';
$arr['test']='this is a test';
$arr[56]='hello world';
$arr[0]='aaaa';
print_r($arr);
//更新操作
$arr[3]='dddd';
print_r($arr);
//删除指定元素
unset($arr['test']);
print_r($arr);
unset($arr[56]);
print_r($arr);
echo '<hr/>';
//针对于二维数组的操作：增删改查操作
$courses[]=['id'=>1,'courseName'=>'php','courseDesc'=>'PHP是最好的语言'];
$courses[]=['id'=>2,'courseName'=>'javascript','courseDesc'=>'javascript是最好的语言'];
$courses[]=['id'=>3,'courseName'=>'go','courseDesc'=>'go是最好的语言'];
print_r($courses);
echo $courses[0]['courseName'],'--',$courses[0]['courseDesc'],'<br/>';
$courses[1]['courseName']='js';
echo $courses[1]['courseName'],'<br/>';
unset($courses[2]['courseName']);
print_r($courses);
unset($courses[1]);
print_r($courses);
echo '<hr/>';
function test(){
  return ['a','b','c'];
}
$res=test();
echo $res[1];
echo '<br/>';
echo test()[1];































echo '</pre>';
