import { test } from 'node:test'
import assert from 'node:assert/strict'
import { lowerBound, binarySearch } from '../c_algo_4-search/implementation.js'
import { randomInt, randomArray, shuffle } from '../c_algo_5-random/implementation.js'
import { twoSum, characterCounts, isPalindrome, longestWord, maxNumericEntry } from '../c_algo_6-arrays_strings/implementation.js'
import { factorial, fibonacci } from '../c_algo_7-sequences/implementation.js'

test('二分查找与线性参考在空数组、重复值、首尾和缺失项上一致', () => {
  const arrays = [[]]
  function enumerate(prefix, min, remaining) {
    if (!remaining) { arrays.push(prefix); return }
    for (let n = min; n <= 3; n++) enumerate([...prefix, n], n, remaining - 1)
  }
  for (let length = 1; length <= 5; length++) enumerate([], -2, length)
  for (const values of arrays) {
    for (let target = -3; target <= 4; target += 0.5) {
      const first = values.findIndex(value => value >= target)
      assert.equal(lowerBound(values, target), first < 0 ? values.length : first)
      assert.equal(binarySearch(values, target), values.indexOf(target))
    }
  }
})

test('随机范围上下端点、非法随机源和输入约束', () => {
  assert.equal(randomInt(-2, 3, () => 0), -2)
  assert.equal(randomInt(-2, 3, () => 1 - Number.EPSILON), 3)
  assert.deepEqual(randomArray(3, 2, 4, () => 0.5), [3, 3, 3])
  assert.deepEqual(randomArray(0, 1, 1), [])
  for (const bad of [-1, 1, NaN, Infinity]) assert.throws(() => randomInt(0, 2, () => bad), RangeError)
  for (const [min, max] of [[2, 1], [0.5, 2], [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]]) {
    assert.throws(() => randomInt(min, max), RangeError)
  }
  assert.throws(() => randomArray(-1, 0, 2), RangeError)
  assert.throws(() => randomArray(0, 2, 1), RangeError)
})

test('枚举三元素洗牌的全部选择路径，每个排列出现一次且不改输入', () => {
  const results = new Set()
  const original = [1, 2, 3]
  for (let first = 0; first < 3; first++) {
    for (let second = 0; second < 2; second++) {
      const sequence = [(first + 0.5) / 3, (second + 0.5) / 2]
      const result = shuffle(original, () => sequence.shift())
      results.add(result.join(','))
      assert.deepEqual([...result].sort(), original)
    }
  }
  assert.equal(results.size, 6)
  assert.deepEqual(original, [1, 2, 3])
  assert.deepEqual(shuffle([], () => { throw new Error('不应取样') }), [])
})

test('数组与 Unicode 文本规则覆盖重复值、下标0、换行和中文', () => {
  assert.deepEqual(twoSum([3, 3], 6), [0, 1])
  assert.deepEqual(twoSum([2, 7, 11], 9), [0, 1])
  assert.equal(twoSum([3], 6), null)
  assert.equal(twoSum([], 1), null)
  assert.deepEqual([...characterCounts('😀\n😀中')], [['😀', 2], ['\n', 1], ['中', 1]])
  assert.equal(isPalindrome('上海自来水来自海上'), true)
  assert.equal(isPalindrome('中文'), false)
  assert.equal(isPalindrome('A man, a plan, a canal: Panama!'), true)
  assert.equal(isPalindrome('é e\u0301'), true)
  assert.equal(longestWord('  cat\n dog  '), 'cat')
  assert.equal(longestWord(''), '')
  assert.deepEqual(maxNumericEntry({ a: -2, b: -1, c: -1, d: NaN }), ['b', -1])
  assert.equal(maxNumericEntry({ a: '1', b: Infinity }), null)
})

test('数列约定、大整数精度以及非法输入', () => {
  assert.equal(factorial(0), 1n)
  assert.equal(factorial(20), 2432902008176640000n)
  assert.equal(fibonacci(0), 0n)
  assert.equal(fibonacci(1), 1n)
  assert.equal(fibonacci(100), 354224848179261915075n)
  for (let n = 2; n < 40; n++) assert.equal(fibonacci(n), fibonacci(n - 1) + fibonacci(n - 2))
  for (const bad of [-1, 1.5, NaN, Infinity, '2']) {
    assert.throws(() => factorial(bad), RangeError)
    assert.throws(() => fibonacci(bad), RangeError)
  }
})

// 同一份源码同时用于文章展示和运行验证。
import { bubbleSort } from '../c_sort_1-bubbleSort/bubbleSort.js'
import { selectionSort } from '../c_sort_2-selectionSort/selectionSort.js'
import { insertionSort } from '../c_sort_3-insertionSort/insertion.js'
import { binaryInsertionSort } from '../c_sort_3-insertionSort/binaryInsertion.js'
import { shellSort } from '../c_sort_4-shellSort/shell.js'

test('基础排序与数值参考一致：枚举短数组、重复、负数和不同希尔步长', () => {
  const arrays = [[]]
  function enumerate(prefix, remaining) {
    if (!remaining) { arrays.push(prefix); return }
    for (const n of [-1, 0, 1]) enumerate([...prefix, n], remaining - 1)
  }
  for (let length = 1; length <= 5; length++) enumerate([], length)
  const sorts = [bubbleSort, selectionSort, insertionSort, binaryInsertionSort,
    values => shellSort(values, 2), values => shellSort(values, 3), shellSort]
  for (const values of arrays) {
    const expected = [...values].sort((a, b) => a - b)
    for (const sort of sorts) {
      const input = [...values]
      assert.equal(sort(input), input)
      assert.deepEqual(input, expected)
    }
  }
  for (const divide of [0, 1, -2, 2.5, NaN, Infinity]) {
    assert.throws(() => shellSort([2, 1], divide), RangeError)
  }
})
