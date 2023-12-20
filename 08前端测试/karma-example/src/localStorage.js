function getItem(key) {
  return localStorage.getItem(key)
}

function setItem(key, value) {
  localStorage.setItem(key, value)
}

module.exports = {
  setItem,
  getItem  
}