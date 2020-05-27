import RssInfo from "./rssinfo";
import ServerCall from "./server_call";
import { Mask } from "./toast";
import RssContent from "./rsscontent";  

/**
 * @typedef {import('../settingBut').default SettingBut}
 * @typedef {import('../feedCompFrame').default FeedCompFrame}
 */

export default class FeedCtnSystem{
    constructor(){
        /** @type {RssInfo[]} */
        this.listfeed = []
        this.config = {
            maxfeed : 5,
            refreshtime : 60
        } 
 

        this.configloaded = false;
        this.interval = null;

        this.cbRsschanged = null;

        /**
         *  save old url 
         * @type {string[]}
        */
        this.listOldurl = [];
        this.listNotifiedUrl = []

        this.classInit = {
            /** @type {SettingBut} */
            settingBut : null, 
            /** @type {FeedCompFrame} */
            FeedCompFrame : null
        } 

        

    }

    async loadOrSaveOldUrl(saveMode){
        
        var scall = ServerCall.getServerAjax()
        scall.datas.atype = "savedurl" 
        if(saveMode){
            var savelinklimit = this.listOldurl.slice(this.listOldurl.length-1000,1000);
            scall.datas.data = JSON.stringify(savelinklimit)
        } else {
            scall.datas.data = ""
        }

        var str  = await scall.callPromise();
        if(!saveMode){
             var obj = null;
             try {
                 obj = JSON.parse(str)
             } catch (error) { }
             if(obj != null && Array.isArray(obj)){
                 this.listOldurl = obj;
             }
        }

    }
    
    /**
     * 
     * @param {RssContent} rssctn 
     * @param {RssInfo} rssinfo 
     */
    notifiSound(rssctn,rssinfo,rssinfoID){
        if(rssctn == null || this.listNotifiedUrl.includes(rssctn.Link)){
            return;
        }
        this.listNotifiedUrl.push(rssctn.Link);
        let myNotification = new Notification(rssinfo.title, {
            body: rssctn.Title
        })
        
        myNotification.onclick = () => {
            window.focusWindow()
            this.openNewCtn(rssinfoID,rssinfo)
        }
        window.playSound();
    }

    /**
     * 
     * @param {string} rssinfoid 
     * @param {RssInfo} rssinfo 
     */
    openNewCtn(rssinfoid,rssinfo){
        if(this.classInit.FeedCompFrame != null){
            this.classInit.FeedCompFrame.scrollTo(rssinfoid);
        } 
    }

    /**
     * 
     * @param {RssContent} rssctn 
     */
    saveAsOldContent(rssctn){
        rssctn.NewContent = false;
        this.listOldurl.push(rssctn.Link);
        this.loadOrSaveOldUrl(true)
    }

    checkIsNewContent(){
        /**
         * parse pubdate
         * @param {RssContent} rssCtn 
         */
        var parsePubDate = (rssCtn)=>{
            rssCtn.PubdateParsed = 0;
            try {
                rssCtn.PubdateParsed = Date.parse(rssCtn.PubDate)
            } catch (error) {
                console.log(error)
            }
        }

 

        /** @param {RssInfo} rssinfo */
        var everyRssInfo= (rssinfo, ID)=>{  
            for(var i=0;i<rssinfo.rssContents.length;i++){
                var curcontent = rssinfo.rssContents[i];
                parsePubDate(curcontent)

                if(!this.listOldurl.includes(curcontent.Link)){   
                    curcontent.NewContent = true;  
                    this.notifiSound(curcontent,rssinfo,ID);
                } else {
                    curcontent.NewContent = false;
                }
            }  
            
        }

        this.listfeed.forEach((v,i)=>{
            everyRssInfo(v,i)
        })
 
 
    }

    async loadconfig(){
        this.setInterval()
        if(this.configloaded){
            return
        }

        await this.loadOrSaveOldUrl(false);

        var scall = ServerCall.getServerAjax()
        scall.datas.atype = "config" 
        scall.datas.data = "" 
        var jsstr = await scall.callPromise();
        var obj = null;
        try {
            obj = JSON.parse(jsstr)
        } catch (error) {
            
        }
        if(obj != null){
            this.config = obj;
            this.configloaded = true;
        }
    }

    async saveConfig(){
        this.removeInterVal();
        this.setInterval()
        var mask = Mask.StartLoding()
        var scall = ServerCall.getServerAjax()
        scall.datas.atype = "config" 
        scall.datas.data = JSON.stringify(this.config)
        await scall.callPromise()


        await this.getAllRss()
        mask.remove()
    }

    setInterval(){
        if(this.interval != null){
            return;
        }
        console.log("set interval")
        this.interval = window.setInterval(()=>{
            console.log("get all RSS")
            this.getAllRss()
        },this.config.refreshtime * 1000)
    }

    removeInterVal(){
        if(this.interval == null){
            return
        }

        console.log("clear interval")
        window.clearInterval(this.interval)
        this.interval = null;
    }

    async saveListRss(){
        var stringJson = JSON.stringify(this.listfeed);
        var scall = ServerCall.getServerAjax()
        scall.datas.atype = "savelistrss"
        scall.datas.arg = stringJson;
        await scall.callPromise()

    } 
    async getListRss(){
        var mask = Mask.StartLoding()
        await this.loadconfig()

        var scall = ServerCall.getServerAjax()
        scall.datas.atype = "getlistrss" 
        var jsonstring = await scall.callPromise();
        
        var obj = null;
        try {
            obj = JSON.parse(jsonstring)
        } catch (error) {}
        if(obj != null && Array.isArray(obj)){
            this.listfeed = RssInfo.convertToClass(obj);
        }

        mask.remove()
    }

    async getAllRss(){

        var listrss = this.listfeed;
        var scall = ServerCall.getServerAjax()
        scall.datas.atype = "feedctn" 

        for(var i=0;i<listrss.length;i++){
            var rssinfo = listrss[i];
            scall.datas.arg = rssinfo.url;
            scall.datas.max = this.config.maxfeed

            var str = await scall.callPromise();

            var obj = null
            try {
                obj = JSON.parse(str)
            } catch (error) {
                
            }
            if(obj != null && Array.isArray(obj)){
                rssinfo.rssContents = obj;
            } 
        }

        this.checkIsNewContent()

        if(this.cbRsschanged != null){
            this.cbRsschanged()
        }

 
    }
} 