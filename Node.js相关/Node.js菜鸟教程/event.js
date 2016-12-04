// try a try
const a = {
  init() {
    this.bar = () => this.dam
  },
  dam: 'hei',
  foo() {
    return this.dam
  }
}

const b = {
  dam: 'ha'
}

a.init()

console.log(a.foo())   // hello
console.log(a.foo.bind(b).call(a))  // hello
console.log(a.bar.call(b))  // world
