// 如果已定义，请使用pageXOffset 和 pageYOffset
// 否则使用scrollLeft 和 scrollTop 
const getScrollPos = (el = window) => (
  {
    x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft,
    y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop
  }
)