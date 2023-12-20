function binarySearch(list, item) {
  let low = 0,
    high = list.length - 1,
    mid,
    guess;
  
  while (low <= high) {
    mid = low + high
    guess = list[mid]

    if (guess === item) {
      return mid
    } else if (guess > item) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }

  return mid
}

console.log(binarySearch([1,3,4,5,6], 6));