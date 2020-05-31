import SocketReaderMsg from "./ajaxData";
import BridgeAjax from "./bridgeAjax";
import AjaxData from "./ajaxData";

var collectionScoketReader = {}
var idGenerator = 0;
function generateID(){
    idGenerator++;
    return "id" + idGenerator;
}

var bridgeAjax = new BridgeAjax();

class SocketReader {
    /**
     * 
     * @param {import("ws")} con 
     */
    constructor(con){
        this.con = con;
        this.register()
    }

    /**
     * store socket reader initialize to collectionSocketReader
     */
    register(){        
        this.conid = generateID()
        collectionScoketReader[this.conid] = this;   

        this.con.on("message",async (msg)=>{   
            /** @type {AjaxData} */
            var objms = null;
            try {
                objms = JSON.parse(msg) 
            } catch (error) { 
                objms = null;
            }

            if(objms == null) return;


            bridgeAjax.ajaxData = objms;
            var replyObj = new AjaxData();
            replyObj.replyFun = objms.replyFun;
            replyObj.calltype = AjaxData.callTypeReply;

            try {                
                replyObj.arg = await bridgeAjax[objms.atype]()                
            } catch (error) { 
                replyObj.arg = "err"
            }

            this.send(replyObj)
        })
    }

    unregister(){
        delete collectionScoketReader[this.conid]
    }

    /**
     * @param {SocketReaderMsg} obj 
     */
    send(obj){
        var tostring = JSON.stringify(obj);
        this.con.send(tostring)
    }

}


export default SocketReader