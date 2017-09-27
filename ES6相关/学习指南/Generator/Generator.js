// 演变过程
function ptimeout(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay);
  })
}

// 生成器运行器
function grun(g) {
  const it = g();
  (function iterate(val) {
    const x = it.next(val);
    
    if (!x.done) {
      if (x.value instanceof Promise) {
        x.value
          .then(iterate)
          .catch(err => it.throw(err));
      } else {
        setTimeout(iterate, 0, x.value);
      }
    }
  })();
} 

// 生成器
function* theFutureIsNow1() {
  const dataA = yield nfcall(fs.readFile, 'a.txt');
  const dataB = yield nfcall(fs.readFile, 'b.txt');
  const dataC = yield nfcall(fs.readFile, 'c.txt');
  yield ptimeout(60*100);
  yield nfcall(fs.writeFile, 'd.txt', dataA + dataB + dataC);
}

// 使用Promise.all
function* theFutureIsNow2() {
  const data = yield Promise.all([
    nfcall(fs.readFile, 'a.txt'),
    nfcall(fs.readFile, 'b.txt'),
    nfcall(fs.readFile, 'c.txt')
  ]);
  yield ptimeout(60*300);
  yield nfcall(fs.writeFile, 'd.txt', data[0] + data[1] + data[2]);
}