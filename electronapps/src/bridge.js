 
const { ipcMain } = require('electron')  
const ServerSys = require('./serverSys')


var ssys = new ServerSys() 
 
ipcMain.on('getlistrss', async (event, arg) => { 
    var rsslitectn = await ssys.getlistrss()

    event.sender.send('getlistrss-reply', rsslitectn)
})