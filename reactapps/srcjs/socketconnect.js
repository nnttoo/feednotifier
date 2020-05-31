import AjaxData from "../../backendApps/src/ajaxData";

var wsurl =  "ws://" + window.location.host +  "/myws";
var websocket = new WebSocket(wsurl);
var socketconnected = false;
var SocketReplyListener =  {}
websocket.onopen = ()=>{ 
    socketconnected = true;
}

function waitConnect(){


    return new Promise((r,x)=>{
        var checkConn = function(){
            if(socketconnected){
                return r();
            } else {
                setTimeout(()=>{
                    checkConn()
                },200)
            }
        } 
        checkConn();
    })
}

websocket.onmessage = function(msg){ 
    /** @type {AjaxData} */
    var soketMsg = null;
    try {
        soketMsg = JSON.parse(msg.data);
    } catch (error) {
        soketMsg = null;
     }

    if(soketMsg == null || soketMsg.atype == null){
        return;
    } 
    if(soketMsg.calltype == AjaxData.callTypeReply){ 

        if(typeof SocketReplyListener[soketMsg.replyFun] != "undefined"){
 
            try {
                SocketReplyListener[soketMsg.replyFun](soketMsg.arg)
            } catch (error) {  
            }
        }
    } 
}

var callreg = 0;
function createId(){
    callreg++; 
    return callreg;
}

/** 
 * @param {AjaxData} ajaxdata 
 */
function callSocketwithReply(ajaxdata){ 
    return new Promise(async function(r,x){
        await waitConnect();
        
        ajaxdata.replyFun = ajaxdata.atype +  createId();
        SocketReplyListener[ajaxdata.replyFun] = function(mststr){
            r(mststr)
            delete SocketReplyListener[ajaxdata.replyFun]
        }
        websocket.send(JSON.stringify(ajaxdata));
    })

}



export { 
    callSocketwithReply
}