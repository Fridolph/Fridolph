// {
//   let ajax = callback => {
//     console.log('running...')
    
//     setTimeout(() => {
//       callback && callback.call()
//     }, 1000);
//   }
  
//   ajax(() => {
//     console.log('timeout1');
//   })
// }

// {
//   let ajax = () => {
//     console.log('running...');
//     return new Promise(function(resolve, reject) {
//       setTimeout(function() {
//         resolve()
//       },  1000)
//     })
//   }

//   ajax()
//     .then(() => {
//       console.log('promise', 'timeout2')

//       return new Promise(function(resolve, reject) {
//         setTimeout(() => {
//           resolve()
//         }, 2000);
//       })
//     })
//     .then(() => {
//       console.log('promise', 'timeout3');
//     })
// }

{
  let ajax = num => {
    console.log('执行4');
    return new Promise(function(resolve, reject) {
      if (num > 5) {
        resolve()
      } else {
        throw new Errow('出错了')
      }
    })
  }

  ajax(3)
    .then(() => {
      console.log('log', 3);
    })
    .catch(err => {
      console.log('catch', err);
    })
    
}