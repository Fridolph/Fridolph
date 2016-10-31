function assert(value, desc) {
  var doc = document,
      ul = document.createElement("ul"),
      li = document.createElement("li");

  if( !doc.getElementById("results") ) {
    doc.getElementsByTagName("body")[0].appendChild(ul);
    ul.id = "results";
  }

  li.className = value ? "pass" : "fail";
  li.appendChild(doc.createTextNode(desc));
  

  var pass = doc.getElementById("results").getElementsByClassName("pass");
  var fail = doc.getElementById("results").getElementsByClassName("fail");
  doc.getElementById("results").appendChild(li);

  for( var i=0; i<pass.length; i++ ) {
    pass[i].style.cssText = 'color: green;padding: 5px; border:1px solid #ccc;';
  }
  for( var i=0; i<fail.length; i++ ) {
    fail[i].style.cssText = 'color: red; text-decoration: line-through;padding: 5px; border:1px solid #ccc;';
  }
}