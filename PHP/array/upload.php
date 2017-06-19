<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>多文件上传</title>
  </head>
  <body>
    <form class="" action="#" method="post" enctype="multipart/form-data">
      <input type="file" name="files[]" value=""> <br>
      <input type="file" name="files[]" value=""> <br>
      <input type="file" name="files[]" value=""> <br>
      <input type="submit" name="name" value="上传">
    </form>
    <?php
    print_r($_FILES);
    ?>
  </body>
</html>
