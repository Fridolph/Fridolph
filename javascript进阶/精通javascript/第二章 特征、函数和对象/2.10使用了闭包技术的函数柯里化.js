// 定义一个函数该函数生成一个新的加法函数
function addGenerator(num) {

  // 返回一个将两个数字想家的简单函数, 其中第一个参数从该函数生成器中获得
  return function (toAdd) {
    return num += toAdd
  }

  // addFive中包含一个函数，该函数接受一个参数，然后将该参数与5相
  var addFive = addGenerator(5);

  // 给addFive传入4， 得到的结果是9
  console.log( addFive(4) == 9);
}
