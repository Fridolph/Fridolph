// 快排思想
// 1. 先从数列中取出一个数作为基准数
// 2. 分区过程，将比这个数大的数全部放到它的右边，小于它的数全放到它的左边
// 3. 再对左右区间重复第二步，直到各区间只有一个数

// function quickSort(arr: Array<any>): Array<any> {
// 	if (arr.length < 2) return arr

// 	let left: Array<any> = []
// 	let right: Array<any> = []
// 	let mid = arr.splice(Math.floor(arr.length / 2), 1)[0]

// 	for (let i = 0; i < arr.length; i++) {
// 		if (arr[i] < mid) {
// 			left.push(arr[i])
// 		} else {
// 			right.push(arr[i])
// 		}
// 	}
// 	return quickSort(left).concat(mid, quickSort(right))
// }

// let array = [3, 123, 243, 12, 23, 45, 23, 5, 29, 5645, 4]

// const result = quickSort(array)
// result.forEach(item => {
//   // 这里的item是any类型
// })

function quickSort<E>(arr: Array<E>): Array<E> {
	if (arr.length < 2) return arr

	let left: Array<any> = []
	let right: Array<any> = []
	let mid = arr.splice(Math.floor(arr.length / 2), 1)[0]

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] < mid) {
			left.push(arr[i])
		} else {
			right.push(arr[i])
		}
	}
	return quickSort(left).concat(mid, quickSort(right))
}

let array = [3, 123, 243, 12, 23, 45, 23, 5, 29, 5645, 4]

const result = quickSort(array)
result.forEach(item => {
  // 这里的item 拿到了传入的 类型 number
})

let array2 = ['abc', 'efd', 'gds', 'kds', 'zkd']
const result2 = quickSort(array2)
result2.forEach(item => {
  // 这里的item 拿到了传入的 类型 string
})
