function createElement(vnode) {
  var tag = vnode.tag
  var attrs = tag.attrs || {}
  var children = tag.children || [] 

  if (!tag) return null

  var elem = document.createElement(tag)
  var attrName
  for (attrName in attrs) {
    attrs.hasOwnProperty(attrName) {
      elem.setAttribute(attrName, attrs[attrName])
    }
  }
  // for (let attrName of Object.keys(attrs)) {
  //   elem.setAttribute(attrName, attrs[attrName])
  // }

  
  children.forEach(childVnode => {
    elem.appendChild(createElement(childVnode))
  })

  return elem
}