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
const wsServer = require('ws').Server

import SocketReader from './socketReader' 
 
expApp.use(bodyParser.urlencoded({ extended: true }));
expApp.use('/',express.static(path.join(__dirname,'views')))


/** 
 * @typedef {Object} AjaxData
 * @property {String} atype
 * @property {String} arg
 * @property {Object} data
 * 
 */

// expApp.post('/ajax', async function(req,res){ 

//     /** @type {AjaxData} */
//     var aData = req.body; 
//     try {
//         bridgeAjax.ajaxData = aData;
//         var result = await bridgeAjax[aData.atype]() 
//         bridgeAjax.ajaxData = null;

//         // send result string as response
//         res.send(result)
        
//     } catch (error) { 
//         console.log("errorrrrrrrrr ajax")
//         res.send("")
//     } 
// })

var server = expApp.listen(port);
     
var wss = new wsServer({server : server, path : "/myws"})
wss.on("connection",function(con){
     new SocketReader(con)
})
var url = 'http://127.0.0.1:'+ server.address().port;
console.log(url) 
try {        
    process.send(url) 
} catch (error) { } 
 

 



 