// 下面来看, php脚本是如何接受数据, 处理数据, 返回数据的

<?php

  $username=$_POST['username'];
  $password=$_POST['password'];
  //根据方法不同, php会把接收的数据储存在$_POST / $_GET 这样的全局变量中
  //前面的ajax我们用的是post方法, 所以这里用$_POST接收数据
  $usermsg=array(
    'fhw7328126' => '7327126',
    'fhwlmmz' => 'feng7328126',
    'dearmmz' => '123456',
    'rooter' => 'dd'
  );

  $gouwuche=array(
    'fhw7328126' => 2,
    'fhwlmmz' => 3,
    'dearmmz' => 8,
    'rooter' => 123
  );

  $name=array(
    'fhw7328126' => '鱼鱼风',
    'fhwlmmz' => '黄翔',
    'dearmmz' => '明珠',
    'rooter' => '管理员'
  );

  // 这里我定义了3个数组，分别储存有用户的帐号密码购物车信息和昵称，事实上，一般这样的数据都是储存在数据库中，PHP可以与数据库交互，获得这些数据表。由于我还没有掌握如何使用数据库，这里就直接用偷懒的方法定义好数据表；
  

  // 定义一个变量，用来代表php处理数据的不同结果, 默认为0
  $type=0;
  //定义一个变量，用来装用户购物车数量信息，默认0
  $gouwuchenum=0;
  //定义一个变量，用来装用户的昵称，默认0
  $name2=0;

  foreach($usermsg as $key => $value){  
    //如果帐号存在，且密码匹配
    if ($username==$key and $password==$value) {
       
      $type=1;  //状态字赋值为1； 
      $gouwuchenum=$gouwuche[$key];  //获取当前用户的购物车信息； 
      $name2=$name[$key];  //获取当前用户的昵称 

      break;  //跳出遍历 
    } 
    else if ($username==$key and $password!=$value) {  //如果帐号存在但密码不匹配 
      $type=2;  //状态字赋值为2； 

      break; 
    } 
  }
  
  $response=array(//定义php要返回的数据，这里先定义成数组类型 
    'type' => $type,  //返回状态字 
    'gouwuchenum' =>$gouwuchenum,  //返回购物车信息 
    'name' => $name2,  //返回昵称 
  );

  //将要返回的数组转化成json数据，打印出来。注意，PHP打印出什么，那么前端接收的数据就是什么。通篇浏览这个php文件，只有最后一行打印了一个json数据，所以前端得到的数据就是这个json
  
  echo json_encode($response);
?>