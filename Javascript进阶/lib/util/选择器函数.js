var query = function (selector) {
  var reg = /^(#)?(\.)?(\w+)$/img;
  var regResult = reg.exec(selector);
  var result = [];
  //如果是id选择器
  if (regResult[1]) {
    if (regResult[3]) {
      if (typeof document.querySelector === "function") {
        result.push(document.querySelector(regResult[3]));
      } else {
        result.push(document.getElementById(regResult[3]));
      }
    }
  }
  //如果是class选择器
  else if (regResult[2]) {
    if (regResult[3]) {
      if (typeof document.getElementsByClassName === 'function') {
        var doms = document.getElementsByClassName(regResult[3]);
        if (doms) {
          result = converToArray(doms);
        }
      }
      //如果不支持getElementsByClassName函数
      else {
        var allDoms = document.getElementsByTagName("*");
        for (var i = 0, len = allDoms.length; i < len; i++) {
          if (allDoms[i].className.search(new RegExp(regResult[2])) > -1) {
            result.push(allDoms[i]);
          }
        }
      }
    }
  }
  //如果是标签选择器
  else if (regResult[3]) {
    var doms = document.getElementsByTagName(regResult[3].toLowerCase());
    if (doms) {
      result = converToArray(doms);
    }
  }
  return result;
}

function converToArray(nodes) {
  var array = null;
  try {
    array = Array.prototype.slice.call(nodes, 0); //针对非IE浏览器         
  } catch (ex) {
    array = new Array();
    for (var i = 0, len = nodes.length; i < len; i++) {
      array.push(nodes[i])
    }
  }
  return array;
}