// 使用window.location.href 或window.location.replace重定向到url
// 传递第二个参数来模拟链接点击 true-default 或 http重定向 false
const redirect = (url, asLink = true) => (
  asLink 
    ? window.location.href = url
    : window.location.replace(url)
)