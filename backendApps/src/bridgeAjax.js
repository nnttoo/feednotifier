import AjaxData from './ajaxData';

const os = require('os')
const path = require('path')
var fs = require('fs');
const FeedParser = require('./feedparser') 

class BridgeAjax{
    constructor(){
        this.appdirpath = ''
        this.getAppDir();
        /** @type {AjaxData} */
        this.ajaxData = null;
    }


    getAppDir(){
        var homedir = os.homedir()
        var appdir = path.join(homedir,'upworknotifier')
        if(!fs.existsSync(appdir)){
            fs.mkdirSync(appdir)
        }
        this.appdirpath = appdir;
    }


    simpleReadExistFile(filename){ 
        var filepath = path.join(this.appdirpath,filename);
        return new Promise(function(resolve,reject){
            fs.exists(filepath,(ex)=>{
                if(ex){
                    fs.readFile(filepath,function(err,data){
                        resolve(data.toString())
                    })
                } else {
                    resolve("")
                }
            })            
        }) 
    }

    simpleWriteFile(filename, datastring){
        var filepath = path.join(this.appdirpath,filename);
        return new Promise(function(resolve,reject){
            fs.writeFile(filepath,datastring, function(er){
                if(er) {
                    reject(er)
                } else {
                    resolve("")
                }
            })
        })
    }

    /** Expose to ipcMain 1 
     * Change to ajax... using express 24/Mei/2020 
     *  
    */
    async checkurl(){
        if(this.ajaxData == null || this.ajaxData.arg == null){
            return;
        }


        var feedparse = new FeedParser();
        await feedparse.loadUrl(this.ajaxData.arg);     
        return feedparse.getTitle();
    }

    /** Expose to ipcMain 2 */
    savelistrss(){
        if(this.ajaxData == null || this.ajaxData.arg == null){
            return;
        }
        return this.simpleWriteFile('listfeed.json',this.ajaxData.arg)
    }

    /** Expose to ipcMain 3 */
    getlistrss(){ 
        return this.simpleReadExistFile('listfeed.json') 
    }

    /** Expose to ipcMain 4*/
    savedurl(){
        var fname = 'savedurl.json'
        if(this.ajaxData.data == null || this.ajaxData.data == ''){             
            return this.simpleReadExistFile(fname) 
        } else {
            return this.simpleWriteFile(fname,this.ajaxData.data)
        }  
    }

    /** Expose to ipcMain  5*/
    config(){ 
        var fileconfigname = 'config.json'

        if(this.ajaxData.data == null || this.ajaxData.data == ''){             
            return this.simpleReadExistFile(fileconfigname) 
        } else {
            return this.simpleWriteFile(fileconfigname,this.ajaxData.data)
        } 
    }

    /** Expose to ipcMain 6*/
    async feedctn(){
        if(this.ajaxData.arg == null){
            return ''
        }

        var max = 10;
        if(this.ajaxData.max != null){
            max = Number(this.ajaxData.max);
        }

        var feedparse = new FeedParser();
        await feedparse.loadUrl(this.ajaxData.arg);        
        return feedparse.getContents(max) 
    }

    testslowdon(){
        for (var i = 0; i < 100000; i++) {
            console.log('ssssssssss')
            const x = {
              y:
                Math.ceil(i) +
                'sdsfjdlfjlkMNFONnsdno'.slice(4, (Math.random() * 20) | 0)
            };
        }
    } 

} 
  

export default BridgeAjax

// ipcMain.on('ajax', async (event, arg) => { 
//     /** @type {AjaxData} */
//     var aData = null;
//     try {         
//         aData = JSON.parse(arg);
//     } catch (error) {}
    
//     if(aData == null) return;
 
//     if(typeof bridgeAjax[aData.atype] !== 'function') {
//         console.log(aData.atype + " not found")
//         return
//     }

//     try {

//         bridgeAjax.ajaxData = aData;
//         var result = await bridgeAjax[aData.atype]()
//         event.sender.send(aData.atype, result)
//         bridgeAjax.ajaxData = null;
        
//     } catch (error) { 
//         console.log(error)
//      } 
// })