// 请用代码写出今天是星期X X表示当天是星期几
function getWeekday() {
  const week = [
    '日',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六'
  ];
  let date = new Date()

  return '今天是星期' + week[date.getDay()]
}

console.log(getWeekday());