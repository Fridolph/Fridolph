var promise = new Promise(resolve => {
  setTimeout(() => {
    console.log('a');
    resolve();
  }, 2000)
});

promise
  .then(() => {
    return new Promise(resolve => {
      setTimeout(res => {
        resolve(console.log('b'));
      }, 2000);
    })
  })
  .then(() => {
    return new Promise(resolve => {
      setTimeout(res => {
        resolve(console.log('c'));
      },1000)
    });
  })
  .then(() => {
    console.log('d');
  })