<?php
echo '<pre>';
//动态创建数组
//动态创建下标连续的索引数组
$arr1[]=12;
$arr1[]=45678.9;
$arr1[]=true;
//array(12,45678.9,true)
print_r($arr1);
//手动指定下标的索引数组
$arr2[3]=45;
$arr2[-56]=-12;
$arr2[0]='hello world';
$arr2[]='this is king show time';
print_r($arr2);
//动态创建关联数组
$desc='this is a test';
$userInfo['username']='king';
$userInfo['age']=12;
$userInfo['desc']=$desc;
$userInfo[12]='aaaa';
$userInfo[]='bbb';
print_r($userInfo);
//二维的索引+关联
$arr3[]=['id'=>1,'username'=>'king1','age'=>12];
$arr3[]=['id'=>2,'username'=>'king2','age'=>12];
$arr3[]=['id'=>3,'username'=>'king3','age'=>12];
$arr3[]=['id'=>4,'username'=>'king4','age'=>12];
print_r($arr3);
//二维关联+关联
$arr4['course']=['courseName'=>'php','courseDesc'=>'PHP is the best language'];
print_r($arr4);
$arr5[][][][][]=1;
print_r($arr5);



echo '</pre>';
