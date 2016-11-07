var fs = require('fs'),
    stats = [],
    stdin =  process.stdin,
    stdout = process.stdout;

fs.readdir(process.cwd(), function(err, files) {
  console.log('');

  if (!files.length) {
    return console.log('    \033[31m no files to show\033[39m\n]]');
  }

  console.log('    Select which file or directory you want to see\n');

  // 异步控制流
  // called for each file walked in the directory
  function file(i) {  
    var filename = file[i];

    fs.stat(__dirname + '/' + filename, function(err, stat) {
      stats[i] = stat;

      if (stat.isDirectory()) {
        console.log('    ' + i + '    \033[36m' + filename + '/\033[39m');
      } else {
        console.log('    ' + '    \033[90m' + filename + '\033[39m');
      }

      if (++i == files.length) {
        read();
      } else {
        file(i);
      }
    })
  }

  // read user input when files are shown
  function read() {
    console.log(' ')
    
    stdout.write('    \033[33mEnter your choice: \033[39m')
    stdin.resume()
    stdin.setEncoding('utf8')
    
    // 读取用户输入后，根据用户输入做出相应处理
    stdin.on('data', option)
  }

  // called with the option supplied by the user
  function option(data) {
    var filename = files[Number(data)];

    if (!files[Number(data)]) {
      stdout.write('    \033[31mEnter your choice:  \33[39m')
    } else {
      stdin.pause()

      fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data) {
        stats[i] = stat;

        console.log(' ');
        console.log('\033[90m' + data.replace(/(.*)/g, '    $1') + '\033[39m');
      })
    }
  }

  file(0);
})


