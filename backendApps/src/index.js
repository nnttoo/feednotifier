/**
 * 24/Mei/2020 
    * now we use express, and with a separate process, because the main thread 
    * on the electron sometimes makes the UI feel laggy.
    * therefore we use express as a server and ajax instead of ipcMain.
 */


const express = require('express')
const expApp = express()
const path = require('path') 
const bodyParser = require('body-parser');
const port = 0

const BridgeAjax = require('./bridgeAjax') 
/** class for response ajax */
var bridgeAjax = new BridgeAjax();
 
expApp.use(bodyParser.urlencoded({ extended: true }));
expApp.use('/',express.static(path.join(__dirname,'views')))


/** 
 * @typedef {Object} AjaxData
 * @property {String} atype
 * @property {String} arg
 * @property {Object} data
 * 
 */

expApp.post('/ajax', async function(req,res){ 

    /** @type {AjaxData} */
    var aData = req.body; 
    try {
        bridgeAjax.ajaxData = aData;
        var result = await bridgeAjax[aData.atype]() 
        bridgeAjax.ajaxData = null;

        // send result string as response
        res.send(result)
        
    } catch (error) { 
        console.log(error)
     } 
})

var listener = expApp.listen(port, () => {
    var url = 'http://localhost:'+ listener.address().port;
    console.log(url)

    try {
        
    process.send(url) 
    } catch (error) {
        
    }
})

 