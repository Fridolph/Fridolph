http/fs/get/post

用户注册、登录

定义接口：
/user?act=reg&user=aaa&pass=123456
        {"ok": true} 注册成功
        {"ok": false, "msg": "原因"}  注册失败

/user?act=login&user=aaa&pass=123456
        {"ok": true} 登录成功
        {"ok": false, "msg": "原因"}  登录失败


------------------------

对文件的访问：
http://localhost:8080/1.html            请求文件
http://localhost:8080/ajax.js           请求文件

对接口的访问：
http://localhost:8080/user?act=xx...    访问接口