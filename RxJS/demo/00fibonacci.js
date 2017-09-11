let Rx = require('rxjs');

// 定时输出斐波那契数列项
let fibonacci$ = Rx.Observable
  .interval(400)
  .take(10)
  .scan(x => [x[1], x[0] + x[1]], [0, 1])
  .pluck('0')

// [0, 1]
// [1, 1]
// [1, 2]
// [2, 3],
// [3, 5],
// [5, 8],
// [8, 13],
// ...

// var x = fibonacci$.subscribe({
fibonacci$.subscribe({
  next: function observer(x) {
    console.log(x)
  }
})

// x.unsubscribe()

setTimeout(() => fibonacci$.subscribe({
  next: function observer(x) {
    console.log(x)
  }
}), 4000)