function getJSON(url) {
  var promise = new Promise((resolve, reject) => {
    var client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = handler;
    client.responseText = 'json';
    client.setRequestHeader('Accept', 'application/json');
    client.send();
  });

  function handler() {
    if (this.readyState !== 4) {
      return;
    }
    if (this.status === 200) {
      resolve(this.response);
    } else {
      reject(new Error(this.statusText));
    }
  }

  return promise;
}
getJSON('/data.json').then((data) => {
  console.log('成功链接，读取数据中...');
  console.log(`Contents: ${data}`);
}, (err) => {
  console.error(`出错了 ${err}`);
})

/*var getJSON = function(url) {
  var promise =  new Promise((resolve, reject) => {
    var client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = handler;
    client.responseText = 'json';
    client.setRequestHeader('Accept', 'application/json');
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    }
  });
  return promise;
}

getJSON('/data.json').then((json) => {
  console.log('开始读取数据');
  setTimeout(() => {
    console.log('Contents: ' + json);
  },2000)
}, (err) => {
  setTimeout(() => {
    console.error(`出错了 ${err}`);
  }, 1000)
});*/

