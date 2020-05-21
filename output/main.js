 global.electron = require('electron')
 const path = require('path') 
 const { fork } = require('child_process');
 const sub = fork(path.join(__dirname,'express.js')); 
 sub.on('message', function (data) {
     console.log("ini dari data" + data.toString())
 })
 
 console.log(process.pid)