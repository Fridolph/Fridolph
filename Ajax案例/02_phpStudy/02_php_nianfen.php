<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>Document</title>
</head>
<body>
	请选择你的出生年份：
	<select name="" id="">
		<?php 
			for($i = 1950 ; $i <= 2015 ; $i++){
		?>
			<option value=""><?php echo $i; ?></option>
		<?php
			}
		?>
	</select>
</body>
</html>