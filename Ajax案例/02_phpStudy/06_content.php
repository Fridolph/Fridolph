<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>Document</title>
	<style type="text/css">
		*{
			margin: 0;
			padding: 0;
		}
		.header{
			width: 980px;
			height: 100px;
			background-color: #ccc;
			margin: 0 auto;
		}

	</style>
</head>
<body>
	<?php
		//得到URL地址中的id参数
		$id = $_GET["id"];
		//创建链接
		$con = mysql_connect("localhost","root","123456");
		//选择一个数据库
		mysql_select_db("kaola", $con);
		//语言
		mysql_query("SET NAMES UTF8");
		//SQL语句
		$result = mysql_query("SELECT * FROM news WHERE id = ". $id);
		//循环输出结果
		$row = mysql_fetch_array($result);
	?>
		<div class="content">
			<?php
				echo $row["neirong"];
			?>
		</div>
	<?php		  
		 //断开链接
		mysql_close($con);
	?>
</body>
</html>