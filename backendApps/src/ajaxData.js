export default class AjaxData{
    constructor(){
        this.atype = ""
        this.arg = ""
        this.replyFun = ""
        this.calltype = AjaxData.callTypeCall
    }
}
AjaxData.callTypeCall = "call"
AjaxData.callTypeReply = "reply"