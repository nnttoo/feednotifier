/** 
 * @callback OnResultCb
 * @param {String} result
 */

class ResponseObj{
    constructor(){
        this.Success = false;
        this.Msg = ""
    }
}
  

const { ipcRenderer } = require('electron')

export default class ServerCall{
    constructor(){
        /**
         * ipcMain.on('ajax')
         * ubahh dari ajax ke IPC, jadi url adalah channel
         */
        this.url = "ajax" // url = ipc channel 
        this.datas = {
            atype : "",
            arg : "" 
        }   
 
    } 

    /**
     * 
     * @param {OnResultCb} onresult 
     * @param {OnResultCb} onerror 
     */
    call(onresult,onerror){
        $.post(this.url,this.datas,(result)=>{
            if(onresult){
                onresult(result);
            }
        }).fail(function() {
             if(typeof onerror == 'undefined'){
                 return;
             }
             onerror()

          })
    }

    /** @returns {Promise<string>} */
    callPromise(){
        var thiss = this;
 

        return new Promise(function(resolve,reject){
            /** Listen type  */
            ipcRenderer.on(thiss.datas.atype, (event, arg) => {  
                resolve(arg);
            })
            ipcRenderer.send(thiss.url, JSON.stringify(thiss.datas)) 
        })
    }

    static parseResponse(str){
        var objresp = new ResponseObj();
        try {
            objresp = JSON.parse(str)
        } catch (error) { }
    
        return objresp;
    }
} 
ServerCall.getServerAjax = function(){
    var n = new ServerCall(); 
    return n;
}