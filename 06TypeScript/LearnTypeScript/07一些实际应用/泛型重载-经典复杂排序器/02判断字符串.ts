import { quickSort } from '../泛型-快排'
import { isChinese, sortChinese } from './01判断是否为中文'
const cityArr = ['武汉', '石家庄', '郑州', '太原', '济南', '沈阳', '大连']

function strSelfSort(str: string) {
  const strArr = str.split('')
  const strSortArr = quickSort(strArr)
  return strSortArr.join('')
}

function sort<T>(data: T): Array<any> | string | undefined {
  // 处理为数组的情况
  if (Array.isArray(data)) {
    if (isChinese(data)) {
      return sortChinese(data)
    } else {
      // todo 英文数组里字符串 - 字符串的自排序还需要处理
      return quickSort(data)
    }
  }
  // 这里处理单条字符串
  else if (typeof data === 'string') {
    return strSelfSort(data)
  }
}
