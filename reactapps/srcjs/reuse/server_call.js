///<reference path="../../../output/views/jquery-3.3.1.min.js"/> 
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
 

export default class ServerCall{
    constructor(){
        this.url = "/ajax"
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
            $.post(thiss.url,thiss.datas,(result)=>{ 
                    resolve(result); 
            }).fail(function(err){
                reject(err)
            })
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
    n.url = "/ajax";
    return n;
}