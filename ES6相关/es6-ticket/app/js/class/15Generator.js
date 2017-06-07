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
{
  let state = function* () {
    while (1) {
      yield 'A';      
      yield 'B';      
      yield 'C';
    }
  }

  let status = state();

  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
}