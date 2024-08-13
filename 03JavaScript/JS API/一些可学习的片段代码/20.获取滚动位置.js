// 如果已定义，请使用pageXOffset和pageYOffset，否则使用scrollLeft和scrollTop，可以省略el来使用window的默认值。

// 注：pageXOffset 属性已弃用，用于替代的是 window.scrollX
const getScrollPos = (el = window) => {
  return {
    x: el.scrollX !== undefined ? el.scrollX : el.scrollLeft,
    y: el.scrollY !== undefined ? el.scrollY : el.scrollTop,
  }
}
