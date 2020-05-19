 
const { ipcMain } = require('electron')  
const ServerSys = require('./serverSys')


 
/**
 * Convert ajax to ipcMain
 * 
 * @typedef {Object} AjaxData
 * @property {String} atype
 * @property {String} arg
 * @property {Object} data
 * 
 */


var ajaxListener = new ServerSys() 
 
ipcMain.on('ajax', async (event, arg) => { 

    /** @type {AjaxData} */
    var aData = null;
    try {         
        aData = JSON.parse(arg);
    } catch (error) {}
    
    if(aData == null) return;
 
    if(typeof ajaxListener[aData.atype] !== 'function') {
        console.log(aData.atype + " not found")
        return
    }

    try {
        var result = await ajaxListener[aData.atype](aData.arg, aData.data)
        event.sender.send(aData.atype, result)
        
    } catch (error) { 
        console.log(error)
     } 
})