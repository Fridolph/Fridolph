// 泛型函数重载 - 实现目的：
// 1. 中文排序
// 2. 字符串排序
// 3. 中文 + 英文、数字数组排序
// 4. 中文 + 英文、数字数组 + 数组内部字符串自排序
// 5. 字符串自排序 + 中文 + 英文 、 数字数组 + 数组内部字符串自排序
import { quickSort } from '../泛型-快排'

const cityArr = ['武汉', '石家庄', '郑州', '太原', '济南', '沈阳', '大连']
// let wuhan = '武汉' // w
// let zhengzhou = '郑州' // z
// console.log(wuhan.localeCompare(zhengzhou, 'zh-CN')) // -1

export function sortChinese(arr:Array<string>): Array<string> {
  // sort() 方法就地对数组的元素进行排序，并返回对相同数组的引用。默认排序是将元素转换为字符串，然后按照它们的 UTF-16 码元值升序排序。
  return arr.sort((preStr, curStr) => {
    // localeCompare() 方法返回一个数字，表示参考字符串在排序顺序中是在给定字符串之前、之后还是与之相同
    return preStr.localeCompare(curStr, 'zh-CN')
  })
}

// 1. 判断是否是中文
export function isChinese(arr: Array<string>): boolean {
  // 这里认为只要包含中文字符即判断为中文
  let pattern = /[\u4e00-\u9fa5]+/g
  return arr.some(item => {
    return pattern.test(item)
  })
}
