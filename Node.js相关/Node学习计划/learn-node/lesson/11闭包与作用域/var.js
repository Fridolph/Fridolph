var parent = function() {
  var name = 'parent_name'
  var age = 13

  var child = function() {
    var name = 'child_name'
    var childAge = 3

    console.log(name, age, childAge)
  }

  child() // child_name, 13, 3

  console.log(name, age, childAge) // parent_name, 13, null

}

parent()