/**
 *  Author:strive
 *  Date: 2016/1/13
 */
function json2url(json){
    var arr=[];
    for(var name in json){
        arr.push(name+'='+json[name]);
    }
    return arr.join('&');
}

function ajax(json){
    json=json || {};
    if(!json.url)return;
    json.data=json.data || {};
    json.type=json.type || 'get';

    var timer=null;

    if(window.XMLHttpRequest){
        var oAjax=new XMLHttpRequest();
    }else{
        var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
    }

    switch(json.type){
        case 'get':
            oAjax.open('GET',json.url+'?'+json2url(json.data),true);
            oAjax.send();
            break;
        case 'post':
            oAjax.open('POST',json.url,true);
            oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            oAjax.send(json2url(json.data));
            break;
    }

    oAjax.onreadystatechange=function(){
        if(oAjax.readyState==4){
            clearTimeout(timer);
            if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
                json.success && json.success(oAjax.responseText);
            }else{
                json.error && json.error(oAjax.status);
            }
        }
    };
}
