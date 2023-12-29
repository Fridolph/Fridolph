/* 使用setInterval和setTimeout */
function tick() {
  console.log('tick', Date.now());
}

function tock() {
  console.log('tock:', Date.now());
}

setInterval(tick, 1000);

setTimeout(function() {
  setInterval(tock, 1000);
}, 500);

