const ajax = function(options = {}) {
  options.type = (options.type || 'GET').toUpperCase()

  let data = []

  for (let i in options.data) {
    data.push(encodeURIComponent(i) + '=' + encodeURIComponent(options.data[i]))
  }
  data = data.join('&')

  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    i
    
    && options.error(status)
      }
    }
  }
  
  if (options.type === 'GET') {
    xhr.open('GET', options.url + '?' + data, true)
    xhr.send(null)
  } else if (options.type === 'POST') {
    xhr.open('POST', options.url, true)
    xhr.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencode'
    )
    xhr.send(data)
  }
}