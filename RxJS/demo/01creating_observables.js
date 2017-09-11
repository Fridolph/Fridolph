const Rx = require('rxjs')

var source$ = Rx.Observable.create(function subscribe(observer) {
  var intervalId = setInterval(() => {
    observer.next('hi')
  }, 1000)

  return function unsubscribe() {
    clearInterval(intervalId)
  }
})

let subscription = source$.subscribe({
  next: x => console.log(x)
})

setTimeout(() => subscription.unsubscribe(), 5000)
