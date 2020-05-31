
import AjaxData from "../../../../backendApps/src/ajaxData";
import { callSocketwithReply } from "../../socketconnect";

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
        /** @type {AjaxData} */
        this.datas = {
            atype : "",
            arg : "",
            callid : ""
        } 
 
    }  
    /** @returns {Promise<string>} */
    callPromise(){ 
        return callSocketwithReply(this.datas)
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