(function(){
    var myAjax = {};  //空对象
    //向外暴露这么一个全局变量
    //就是这个函数的命名空间
    window.myAjax = myAjax;

    //=======================属性=======================
    myAjax.version = "0.1.0";
    myAjax.author = "传智播客JS高薪班";

    //=======================方法=======================
    myAjax.get = function(){
        //参数个数
        var argLength = arguments.length;
        var URL,json,callback;
        if(argLength == 2 && typeof arguments[0] == "string" && typeof arguments[1] == "function"){
            //两个参数
            URL = arguments[0];
            callback = arguments[1];
            //传给我们的核心函数来发出Ajax请求
            myAjax._doAjax("get",URL,null,callback);
        }else if(argLength == 3 && typeof arguments[0] == "string" && typeof arguments[1] == "object" && typeof arguments[2] == "function"){
            //3个参数
            URL = arguments[0];
            json = arguments[1];
            callback = arguments[2];
            //传给我们的核心函数来发出Ajax请求
            myAjax._doAjax("get",URL,json,callback);
        }else{
            throw new Error("get方法参数错误！");
        }
    }

    myAjax.post = function(){
        //参数个数
        var argLength = arguments.length;
        if(argLength == 3 && typeof arguments[0] == "string" && typeof arguments[1] == "object" && typeof arguments[2] == "function"){
            //3个参数
            var URL = arguments[0];
            var json = arguments[1];
            var callback = arguments[2];
            //传给我们的核心函数来发出Ajax请求
            myAjax._doAjax("post",URL,json,callback);
        }else{
            throw new Error("post方法参数错误！");
        }
    }

    //=======================内部方法=====================
    //将JSON转换为URL查询参数写法
    //传入{"id":12,"name":"考拉"}
    //返回id=12&name=%45%45%ED
    myAjax._JSONtoURLparams = function(json){
        var arrParts = [];  //每个小部分的数组
        for(k in json){
            arrParts.push(k + "=" + encodeURIComponent(json[k]));
        }
        return arrParts.join("&");
    }

    //最核心的发出Ajax请求的方法
    myAjax._doAjax = function(method,URL,json,callback){
        //Ajax的几个公式
        if(XMLHttpRequest){
            var xhr = new XMLHttpRequest();
        }else{
            var xhr = ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                    callback(null,xhr.responseText);
                }else{
                    callback("文件没有找到" + xhr.status,null);
                }
            }
        }

        //现在要根据请求类型进行判断
        if(method == "get"){
            //请求类型是get
            //如果用户传输了json,此时要连字
            if(json) {
                var combineChar = URL.indexOf("?") == -1 ? "?" : "&";
                URL += combineChar + myAjax._JSONtoURLparams(json);
            }
            xhr.open("get",URL,true);
            xhr.send(null);
        }else if(method == "post"){
            xhr.open("post",URL,true);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.send(myAjax._JSONtoURLparams(json));
        }
    }
})();