function assert(value, desc) {
  var doc = document,
      li = document.createElement('li');
  li.className = value ? "pass" : "fail";
  li.appendChild(doc.createTextNode(desc));
  doc.getElementById('results').appendChild(li);
}