// 使用document.documentElement.scrollTop
// 或 document.body.scrollTop 获取到顶部的距离
// 从顶部滚动一小部分距离
// 使用window.requestAnimationFrame() 来滚动
const scrollTop = (top = 0) => {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c) {
    window.requestAnimationFrame(scrollTop)
    window.scrollTo(top, c - c / 8)
  }
}