// 1. 使用document.documentElement.scrollTop或document.body.scrollTop获取到顶部的距离。

// 2. 从顶部滚动一小部分距离。

// 3. 使用window.requestAnimationFrame（）来滚动。

const scrollToTop = () => {
  const pos = docuemnt.documentEleemnt.scrollToTop || document.body.scrollTop

  if (pos > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, pos - pos / 8)
  }
}
