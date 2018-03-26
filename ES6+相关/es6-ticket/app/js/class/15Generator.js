// {
//   // Generator 基本定义
//   let tell = function* () {
//     yield 'a';
//     yield 'b';
//     yield 'c';

//     return 'd';
//   }

//   let run = tell();

//   console.log(run.next());
//   console.log(run.next());
//   console.log(run.next());
//   console.log(run.next());
// }

// {
//   let obj = {};

//   obj[Symbol.iterator] = function* () {
//     yield 1;
//     yield 2;
//     yield 3;
//   }

//   for (let value of obj) {
//     console.log('value: ', value);
//   }
// }

// 状态机
// {
//   let state = function* () {
//     while (1) {
//       yield 'A';      
//       yield 'B';      
//       yield 'C';
//     }
//   }

//   let status = state();

//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
// }

{
  // 长轮询
  let ajax = function* () {
    yield new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ code: 0 })
      }, 200);
    })
  }

  let pull = function() {
    let generator = ajax();
    let step = generator.next();

    step.value.then(data => {
      if (data.code !== 0) {
        setTimeout(() => {
          console.info('wait');
          pull();
        }, 1000)
      } else {
        console.info(data);
      }
    })
  }

  pull();
}
