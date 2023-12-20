function *makeIterator(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i]
  }
}

const gen = makeIterator(['eat', 'sleep', 'make'])