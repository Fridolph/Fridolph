const fs = require('fs')

function getContentType(extname) {

  fs.readFile('./mime.json', 'utf8', (err, data) => {
    if (err) {
      throw err
    } else {
      var json = JSON.stringify(data);
      var str = json.replace(/\s+/g, '').replace(/(\\n\\)+/g, '').replace(/\\/g, '').replace(/n\}/g, '}').replace(/\"\{/, '').replace(/\}\"/, '');
      var arr = str.split(",")
      // console.log(arr);

      var keyArr = [], 
          valArr = [];

      for (let i=0; i<arr.length; i++) {
        keyArr.push(arr[i].split(":")[0]);
        valArr.push(arr[i].split(":")[1]);                
      }
      // console.log(key, value);

      if (keyArr.toString().indexOf(extname) >= 0) {
        // console.log(keyArr);
        // console.log('有这个格式');
        // console.log(keyArr[0]);
        // console.log(extname.toString());
        
        for (let j=0; j<keyArr.length; j++) {
          if (keyArr[j].substr(1, keyArr[0].length-2) == extname) {
            // console.log(j);
            console.log(valArr[j]);
            return valArr[j];
          }
        }
        // console.log(keyArr[0].substr(1, keyArr[0].length-2));       
        // console.log(extname);       
        
      } else {
        console.log('没有这个格式, 请检查格式是否正确');
        return
      }
    }
  })
}

getContentType(".mp3")
