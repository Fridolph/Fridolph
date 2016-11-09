/**
 * 也算纯属偶然，发现了这个小方法，还是记下来，免得以后忘了
 */

/**
 * [parseDom description 字符串转换为DOM]
 * @param     {[type]}    str [要转换的dom，目前还是字符串]
 * @return    {[type]}    obj [返回包含该字符串dom的数组，如要选记得加角标]
 */
function parseDom(str) {
  var elems = document.createElement("div");
  elems.innerHTML = str;

  return elems.childNodes;
}